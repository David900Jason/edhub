package db

import (
	"context"
	"fmt"
	"log"
	"time"

	"doroosy-backend/config"
	"github.com/jackc/pgx/v5/pgxpool"
)

var Pool *pgxpool.Pool

// Tenant struct for middleware compatibility
type Tenant struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Slug string `json:"slug"`
}

// User struct for controllers compatibility
type User struct {
	ID           int       `json:"id"`
	TenantID     int       `json:"tenant_id"`
	Email        string    `json:"email"`
	PasswordHash string    `json:"password_hash"`
	DisplayName  string    `json:"display_name"`
	Role         string    `json:"role"`
	IsActive     bool      `json:"is_active"`
	CreatedAt    time.Time `json:"created_at"`
}

func InitDB(cfg *config.Config) (*pgxpool.Pool, error) {
	// Build connection string
	connString := fmt.Sprintf("postgres://%s:%s@%s:5432/%s?sslmode=%s",
		cfg.DBUser, cfg.DBPassword, cfg.DBHost, cfg.DBName, cfg.DBSSLMode)

	// Create connection pool
	poolConfig, err := pgxpool.ParseConfig(connString)
	if err != nil {
		return nil, fmt.Errorf("failed to parse database config: %v", err)
	}

	Pool, err = pgxpool.NewWithConfig(context.Background(), poolConfig)
	if err != nil {
		return nil, fmt.Errorf("failed to create connection pool: %v", err)
	}

	// Test connection
	if err := Pool.Ping(context.Background()); err != nil {
		return nil, fmt.Errorf("failed to ping database: %v", err)
	}

	log.Println("Connected to PostgreSQL database successfully")

	// Create tables manually (skip migrations for now)
	if err := createTables(); err != nil {
		return nil, fmt.Errorf("failed to create tables: %v", err)
	}

	log.Println("Database tables created successfully")
	return Pool, nil
}

func createTables() error {
	queries := []string{
		`CREATE TABLE IF NOT EXISTS tenants (
			id SERIAL PRIMARY KEY,
			slug VARCHAR(255) UNIQUE NOT NULL,
			name VARCHAR(255) NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)`,
		`CREATE TABLE IF NOT EXISTS users (
			id SERIAL PRIMARY KEY,
			tenant_id INTEGER REFERENCES tenants(id),
			email VARCHAR(255) UNIQUE NOT NULL,
			password_hash VARCHAR(255) NOT NULL,
			display_name VARCHAR(255) NOT NULL,
			role VARCHAR(50) NOT NULL DEFAULT 'student',
			is_active BOOLEAN DEFAULT true,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)`,
		`CREATE TABLE IF NOT EXISTS courses (
			id SERIAL PRIMARY KEY,
			tenant_id INTEGER REFERENCES tenants(id),
			title VARCHAR(255) NOT NULL,
			description TEXT,
			price DECIMAL(10,2) DEFAULT 0,
			created_by INTEGER REFERENCES users(id),
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)`,
		`CREATE TABLE IF NOT EXISTS wallets (
			id SERIAL PRIMARY KEY,
			user_id INTEGER REFERENCES users(id) UNIQUE,
			balance DECIMAL(10,2) DEFAULT 0,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)`,
	}

	for _, query := range queries {
		if _, err := Pool.Exec(context.Background(), query); err != nil {
			return fmt.Errorf("failed to execute query: %v", err)
		}
	}
	return nil
}

// SetTenantContext sets the tenant context for RLS
func SetTenantContext(ctx context.Context, conn *pgxpool.Conn, tenantID int) error {
	_, err := conn.Exec(ctx, "SELECT set_config('app.current_tenant_id', $1::text, false) = $1", tenantID)
	return err
}

// GetTenantFromSlug retrieves tenant information from slug
func GetTenantFromSlug(ctx context.Context, slug string) (*Tenant, error) {
	var tenant Tenant
	query := "SELECT id, name FROM tenants WHERE slug = $1"
	err := Pool.QueryRow(ctx, query, slug).Scan(&tenant.ID, &tenant.Name)
	if err != nil {
		return nil, err
	}
	tenant.Slug = slug
	return &tenant, nil
}

// GetConnection gets a connection from the pool
func GetConnection() (*pgxpool.Conn, error) {
	return Pool.Acquire(context.Background())
}

func Close() {
	if Pool != nil {
		Pool.Close()
	}
}
