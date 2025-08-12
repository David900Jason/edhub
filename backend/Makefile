.PHONY: build run test migrate rollback clean db-init db-reset

# Build the application
build:
	@echo "Building application..."
	@go build -o bin/doroosy-api ./cmd/main.go

# Run the application
run: build
	@echo "Starting application..."
	@./bin/doroosy-api

# Run tests
test:
	@echo "Running tests..."
	@go test -v ./...

# Run database migrations
migrate:
	@echo "Running database migrations..."
	@go run ./cmd/migrate/main.go migrate

# Rollback the last database migration
rollback:
	@echo "Rolling back the last migration..."
	@go run ./cmd/migrate/main.go rollback

# Initialize the database (create if not exists and run migrations)
db-init:
	@echo "Initializing database..."
	@powershell -ExecutionPolicy Bypass -File ./scripts/init_db.ps1

# Reset the database (drop, create, and migrate)
db-reset:
	@echo "Resetting database..."
	@echo "WARNING: This will drop and recreate the database!"
	@read -p "Are you sure you want to continue? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		psql -h localhost -U postgres -c "DROP DATABASE IF EXISTS doroosy;" && \
		powershell -ExecutionPolicy Bypass -File ./scripts/init_db.ps1; \
	fi

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	@rm -rf bin/
	@go clean

# Install development dependencies
dev-deps:
	@echo "Installing development dependencies..."
	@go install github.com/vektra/mockery/v2@latest
	@go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest

# Run linter
lint:
	@echo "Running linter..."
	@golangci-lint run ./...

# Generate mocks
gen-mocks:
	@echo "Generating mocks..."
	@mockery --all --output ./internal/mocks --case underscore

# Help target
help:
	@echo "Available targets:"
	@echo "  build      - Build the application"
	@echo "  run        - Run the application"
	@echo "  test       - Run tests"
	@echo "  migrate    - Run database migrations"
	@echo "  rollback   - Rollback the last migration"
	@echo "  db-init    - Initialize the database"
	@echo "  db-reset   - Reset the database (DANGER: drops database)"
	@echo "  clean      - Clean build artifacts"
	@echo "  dev-deps   - Install development dependencies"
	@echo "  lint       - Run linter"
	@echo "  gen-mocks  - Generate mock implementations"

.DEFAULT_GOAL := help
