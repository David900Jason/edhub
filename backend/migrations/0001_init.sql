-- 0001_init.sql
-- Assumes Postgres >= 12

-- Enable extensions we will use
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ===================================================================
-- 1) CORE: tenants & users
-- ===================================================================
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  uuid UUID NOT NULL DEFAULT uuid_generate_v4() UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student','teacher','admin')),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_login_at TIMESTAMPTZ
);

CREATE TABLE tenants (
  id BIGSERIAL PRIMARY KEY,
  uuid UUID NOT NULL DEFAULT uuid_generate_v4() UNIQUE,
  slug TEXT NOT NULL UNIQUE,             -- teacher1 -> subdomain part
  name TEXT NOT NULL,
  owner_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan TEXT DEFAULT 'free',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for frequent lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_tenants_slug ON tenants(slug);

-- ===================================================================
-- 2) COURSES / MODULES / ITEMS (flexible content model)
-- ===================================================================
CREATE TABLE courses (
  id BIGSERIAL PRIMARY KEY,
  tenant_id BIGINT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  short_slug TEXT NOT NULL, -- friendly url per tenant (unique per tenant)
  description TEXT,
  price_cents BIGINT NOT NULL DEFAULT 0 CHECK (price_cents >= 0),
  access_days INTEGER NOT NULL DEFAULT 365 CHECK (access_days >= 0),
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, short_slug)
);
CREATE INDEX idx_courses_tenant ON courses(tenant_id);

CREATE TABLE course_modules (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_modules_course_position ON course_modules(course_id, position);

CREATE TABLE module_items (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  module_id BIGINT REFERENCES course_modules(id) ON DELETE SET NULL,
  tenant_id BIGINT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('video','pdf','exam','assignment','html','external')),
  title TEXT NOT NULL,
  description TEXT,
  uri TEXT,                    -- file or object store key or external URL
  duration_seconds INTEGER,    -- for video / exam default expected length
  attempt_limit INTEGER,       -- for exams/assignments (NULL = unlimited)
  config JSONB DEFAULT '{}'::jsonb,  -- flexible per-item settings
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (type IN ('video','pdf','exam','assignment','html','external'))
);
CREATE INDEX idx_items_course_pos ON module_items(course_id, position);
CREATE INDEX idx_items_tenant ON module_items(tenant_id);

-- ===================================================================
-- 3) ENROLLMENTS, ACCESS, WALLET
-- ===================================================================
CREATE TABLE enrollments (
  id BIGSERIAL PRIMARY KEY,
  student_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  tenant_id BIGINT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  purchase_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  source TEXT,  -- 'direct','coupon','admin','refund'
  price_paid_cents BIGINT NOT NULL DEFAULT 0,
  UNIQUE (student_id, course_id)
);
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);

-- Wallet per (student, tenant)
CREATE TABLE wallets (
  id BIGSERIAL PRIMARY KEY,
  student_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tenant_id BIGINT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  balance_cents BIGINT NOT NULL DEFAULT 0,
  last_updated TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (student_id, tenant_id)
);
CREATE INDEX idx_wallets_student_tenant ON wallets(student_id, tenant_id);

CREATE TABLE wallet_transactions (
  id BIGSERIAL PRIMARY KEY,
  wallet_id BIGINT NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
  amount_cents BIGINT NOT NULL,
  balance_after_cents BIGINT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('purchase','refund','topup','manual','adjustment')),
  reference TEXT, -- payment reference / external id
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_wallet_tx_wallet ON wallet_transactions(wallet_id);

-- Convenience trigger to update wallets.last_updated on tx insertion
CREATE OR REPLACE FUNCTION fn_wallet_tx_update_wallet() RETURNS TRIGGER AS $$
BEGIN
  UPDATE wallets SET balance_cents = NEW.balance_after_cents, last_updated = now()
    WHERE id = NEW.wallet_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_wallet_tx_update AFTER INSERT ON wallet_transactions
  FOR EACH ROW EXECUTE FUNCTION fn_wallet_tx_update_wallet();

-- ===================================================================
-- 4) ACTIVITY TRACKING: videos, pdfs, logins
-- ===================================================================
CREATE TABLE video_views (
  id BIGSERIAL PRIMARY KEY,
  student_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_item_id BIGINT NOT NULL REFERENCES module_items(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at TIMESTAMPTZ,
  watched_seconds INTEGER NOT NULL DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  device TEXT,
  user_agent TEXT,
  ip inet
);
CREATE INDEX idx_video_views_item ON video_views(module_item_id);
CREATE INDEX idx_video_views_student ON video_views(student_id);

CREATE TABLE pdf_reads (
  id BIGSERIAL PRIMARY KEY,
  student_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_item_id BIGINT NOT NULL REFERENCES module_items(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at TIMESTAMPTZ,
  read_seconds INTEGER NOT NULL DEFAULT 0,
  pages_viewed INTEGER DEFAULT 0,
  device TEXT,
  user_agent TEXT,
  ip inet
);
CREATE INDEX idx_pdf_reads_item ON pdf_reads(module_item_id);
CREATE INDEX idx_pdf_reads_student ON pdf_reads(student_id);

CREATE TABLE tenant_logins (
  id BIGSERIAL PRIMARY KEY,
  student_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tenant_id BIGINT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  ip inet,
  user_agent TEXT,
  logged_in_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_tenant_logins_tenant ON tenant_logins(tenant_id);
CREATE INDEX idx_tenant_logins_student ON tenant_logins(student_id);

-- ===================================================================
-- 5) EXAMS & ASSIGNMENTS (attempts, questions, auto-grade)
-- ===================================================================
CREATE TABLE exam_questions (
  id BIGSERIAL PRIMARY KEY,
  module_item_id BIGINT NOT NULL REFERENCES module_items(id) ON DELETE CASCADE,
  qtype TEXT NOT NULL CHECK (qtype IN ('mcq','multi','input','code','numeric')),
  question_text TEXT NOT NULL,
  options JSONB,        -- for MCQ/multi; array/object
  correct JSONB,        -- structure depends on qtype
  points NUMERIC NOT NULL DEFAULT 1,
  metadata JSONB DEFAULT '{}'::jsonb
);
CREATE INDEX idx_exam_questions_item ON exam_questions(module_item_id);

CREATE TABLE exam_attempts (
  id BIGSERIAL PRIMARY KEY,
  student_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_item_id BIGINT NOT NULL REFERENCES module_items(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ends_at TIMESTAMPTZ,            -- computed by server when started
  submitted_at TIMESTAMPTZ,
  answers JSONB,                  -- store answers submitted by student
  raw_score NUMERIC,              -- computed score (before manual adjustments)
  final_score NUMERIC,            -- after manual/auto grade + adjustments
  graded BOOLEAN DEFAULT FALSE,
  auto_submitted BOOLEAN DEFAULT FALSE,
  attempt_number INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_exam_attempts_item ON exam_attempts(module_item_id);
CREATE INDEX idx_exam_attempts_student ON exam_attempts(student_id);

CREATE TABLE assignment_attempts (
  id BIGSERIAL PRIMARY KEY,
  student_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_item_id BIGINT NOT NULL REFERENCES module_items(id) ON DELETE CASCADE,
  attempt_number INTEGER NOT NULL DEFAULT 1,
  submitted_at TIMESTAMPTZ,
  files JSONB,        -- uploaded file references / object storage keys
  text_answer TEXT,
  graded BOOLEAN DEFAULT FALSE,
  score NUMERIC,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_assignment_attempts_item ON assignment_attempts(module_item_id);
CREATE INDEX idx_assignment_attempts_student ON assignment_attempts(student_id);

-- ===================================================================
-- 6) HELPERS: audit and versioning
-- ===================================================================
CREATE TABLE audit_logs (
  id BIGSERIAL PRIMARY KEY,
  actor_user_id BIGINT REFERENCES users(id),
  tenant_id BIGINT,
  action TEXT NOT NULL,
  object_type TEXT,
  object_id BIGINT,
  payload JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ===================================================================
-- 7) RLS: Row Level Security policies (recommended)
-- ===================================================================
-- We'll use an app-level session parameter: app.current_tenant_id
-- Middleware in Go sets: SELECT set_config('app.current_tenant_id', '<id>', true);

-- Per-table RLS enabling for tenant-scoped tables
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE pdf_reads ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_logins ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_attempts ENABLE ROW LEVEL SECURITY;

-- Create schema for app functions
CREATE SCHEMA IF NOT EXISTS app;

-- Utility function to safely get the current tenant id (returns BIGINT or NULL)
CREATE OR REPLACE FUNCTION app.current_tenant() RETURNS BIGINT LANGUAGE SQL AS $$
  SELECT CASE WHEN current_setting('app.current_tenant_id', true) IS NULL THEN NULL
              ELSE (current_setting('app.current_tenant_id'))::bigint END;
$$;

-- Generic policy for tenant ownership (using tenant_id column)
DO $$
BEGIN
  -- courses
  CREATE POLICY tenant_isolation_courses ON courses
    USING (tenant_id = app.current_tenant());
  CREATE POLICY tenant_isolation_modules ON course_modules
    USING (course_id IN (SELECT id FROM courses WHERE tenant_id = app.current_tenant()));
  CREATE POLICY tenant_isolation_items ON module_items
    USING (tenant_id = app.current_tenant());
  CREATE POLICY tenant_isolation_enrollments ON enrollments
    USING (tenant_id = app.current_tenant());
  CREATE POLICY tenant_isolation_wallets ON wallets
    USING (tenant_id = app.current_tenant());
  CREATE POLICY tenant_isolation_wallet_tx ON wallet_transactions
    USING (wallet_id IN (SELECT id FROM wallets WHERE tenant_id = app.current_tenant()));
  CREATE POLICY tenant_isolation_video_views ON video_views
    USING (module_item_id IN (SELECT id FROM module_items WHERE tenant_id = app.current_tenant()));
  CREATE POLICY tenant_isolation_pdf_reads ON pdf_reads
    USING (module_item_id IN (SELECT id FROM module_items WHERE tenant_id = app.current_tenant()));
  CREATE POLICY tenant_isolation_logins ON tenant_logins
    USING (tenant_id = app.current_tenant());
  CREATE POLICY tenant_isolation_exam_questions ON exam_questions
    USING (module_item_id IN (SELECT id FROM module_items WHERE tenant_id = app.current_tenant()));
  CREATE POLICY tenant_isolation_exam_attempts ON exam_attempts
    USING (module_item_id IN (SELECT id FROM module_items WHERE tenant_id = app.current_tenant()));
  CREATE POLICY tenant_isolation_assignment_attempts ON assignment_attempts
    USING (module_item_id IN (SELECT id FROM module_items WHERE tenant_id = app.current_tenant()));
EXCEPTION WHEN duplicate_object THEN
  -- ignore if policies already exist
  NULL;
END $$;

-- ===================================================================
-- 8) TRIGGERS: exam starts -> compute ends_at; safety constraints
-- ===================================================================
CREATE OR REPLACE FUNCTION fn_set_exam_ends_at() RETURNS TRIGGER AS $$
DECLARE
  dur INT;
BEGIN
  IF NEW.ends_at IS NULL THEN
    -- prefer explicit ends_at or compute: use module_items.duration_seconds or config.duration_seconds
    SELECT COALESCE(mi.duration_seconds, (mi.config->>'default_duration_seconds')::int, 0)
      INTO dur
    FROM module_items mi WHERE mi.id = NEW.module_item_id;

    IF dur IS NOT NULL AND dur > 0 THEN
      NEW.ends_at := NEW.started_at + (dur || ' seconds')::interval;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_exam_attempts_set_ends
  BEFORE INSERT ON exam_attempts
  FOR EACH ROW EXECUTE FUNCTION fn_set_exam_ends_at();

-- Constrain: expires_at must be after purchase_date
ALTER TABLE enrollments ADD CONSTRAINT chk_enrollment_expiry 
  CHECK (expires_at >= purchase_date);

-- ===================================================================
-- 9) SAMPLE VIEWS (teacher dashboard)
-- ===================================================================
CREATE VIEW vw_course_progress AS
SELECT
  c.id AS course_id,
  c.title,
  mi.id AS item_id,
  mi.type,
  COALESCE(SUM(vv.watched_seconds), 0) AS total_video_seconds,
  COUNT(DISTINCT vv.student_id) AS students_who_viewed
FROM courses c
LEFT JOIN module_items mi ON mi.course_id = c.id
LEFT JOIN video_views vv ON vv.module_item_id = mi.id
GROUP BY c.id, c.title, mi.id, mi.type;

-- ===================================================================
-- 10) Helpful indexes for performance
-- ===================================================================
-- Full text for course search
ALTER TABLE courses ADD COLUMN search_tsv tsvector;
CREATE INDEX idx_courses_search_tsv ON courses USING GIN(search_tsv);
CREATE FUNCTION courses_tsv_trigger() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.search_tsv := to_tsvector('english', coalesce(NEW.title,'') || ' ' || coalesce(NEW.description,''));
  RETURN NEW;
END;
$$;
CREATE TRIGGER trg_courses_tsv BEFORE INSERT OR UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION courses_tsv_trigger();

-- ===================================================================
-- Done - 0001_init.sql
-- ===================================================================
