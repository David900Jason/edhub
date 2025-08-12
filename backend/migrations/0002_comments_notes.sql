-- 0002_comments_notes.sql
-- Adds support for video comments and student notes

-- ===================================================================
-- 1) VIDEO COMMENTS
-- ===================================================================
CREATE TABLE video_comments (
  id BIGSERIAL PRIMARY KEY,
  module_item_id BIGINT NOT NULL REFERENCES module_items(id) ON DELETE CASCADE,
  student_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  teacher_id BIGINT REFERENCES users(id) ON DELETE CASCADE, -- NULL for student comments, set for teacher replies
  parent_comment_id BIGINT REFERENCES video_comments(id) ON DELETE CASCADE, -- For replies
  content TEXT NOT NULL,
  video_timestamp INTEGER, -- Optional: timestamp in seconds where comment was made
  is_teacher_reply BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for efficient querying
CREATE INDEX idx_video_comments_item ON video_comments(module_item_id);
CREATE INDEX idx_video_comments_student ON video_comments(student_id);
CREATE INDEX idx_video_comments_teacher ON video_comments(teacher_id);
CREATE INDEX idx_video_comments_parent ON video_comments(parent_comment_id);

-- ===================================================================
-- 2) STUDENT NOTES
-- ===================================================================
CREATE TABLE student_notes (
  id BIGSERIAL PRIMARY KEY,
  student_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  color TEXT NOT NULL,
  content TEXT NOT NULL,
  subdomain TEXT, -- Only populated in complete mode
  tenant_id BIGINT REFERENCES tenants(id) ON DELETE CASCADE, -- For tenant isolation
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for efficient querying
CREATE INDEX idx_student_notes_student ON student_notes(student_id);
CREATE INDEX idx_student_notes_tenant ON student_notes(tenant_id);
CREATE INDEX idx_student_notes_category ON student_notes(category);
CREATE INDEX idx_student_notes_subdomain ON student_notes(subdomain);

-- ===================================================================
-- 3) ROW LEVEL SECURITY for new tables
-- ===================================================================
ALTER TABLE video_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_notes ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
DO $$
BEGIN
  -- Video comments policy (tenant isolation through module_items)
  CREATE POLICY tenant_isolation_video_comments ON video_comments
    USING (module_item_id IN (SELECT id FROM module_items WHERE tenant_id = app.current_tenant()));
  
  -- Student notes policy (direct tenant isolation)
  CREATE POLICY tenant_isolation_student_notes ON student_notes
    USING (tenant_id = app.current_tenant() OR tenant_id IS NULL);
    
EXCEPTION WHEN duplicate_object THEN
  -- ignore if policies already exist
  NULL;
END $$;

-- ===================================================================
-- 4) Add constraint to ensure only teachers can reply to comments
-- ===================================================================
CREATE OR REPLACE FUNCTION check_teacher_reply() RETURNS TRIGGER AS $$
DECLARE
  video_owner_id BIGINT;
  commenter_role TEXT;
BEGIN
  -- If this is a teacher reply
  IF NEW.is_teacher_reply = TRUE THEN
    -- Get the role of the person making the reply
    SELECT role INTO commenter_role FROM users WHERE id = NEW.teacher_id;
    
    -- Ensure it's a teacher
    IF commenter_role != 'teacher' THEN
      RAISE EXCEPTION 'Only teachers can make teacher replies';
    END IF;
    
    -- Get the owner of the video (through course)
    SELECT c.tenant_id INTO video_owner_id
    FROM module_items mi
    JOIN courses c ON mi.course_id = c.id
    WHERE mi.id = NEW.module_item_id;
    
    -- Check if the teacher owns the course containing this video
    IF NOT EXISTS (
      SELECT 1 FROM tenants t 
      WHERE t.id = video_owner_id 
      AND t.owner_user_id = NEW.teacher_id
    ) THEN
      RAISE EXCEPTION 'Only the teacher who owns the video can reply';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_teacher_reply
  BEFORE INSERT OR UPDATE ON video_comments
  FOR EACH ROW EXECUTE FUNCTION check_teacher_reply();

-- ===================================================================
-- 5) Update timestamp trigger for new tables
-- ===================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_video_comments_updated_at BEFORE UPDATE
    ON video_comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_notes_updated_at BEFORE UPDATE
    ON student_notes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===================================================================
-- Done - 0002_comments_notes.sql
-- ===================================================================
