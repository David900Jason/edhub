# 🎓 Doroosy - Multi-Tenant Educational Platform Backend

A sophisticated, enterprise-grade multi-tenant educational platform backend built with Go, PostgreSQL, and modern architecture patterns. Designed to scale from startup to enterprise with thousands of teachers and millions of students.

## 🚀 Key Features

### 🏢 **Multi-Tenancy**
- **Subdomain-based tenant isolation** (`teacher1.doroosy.com`, `teacher2.doroosy.com`)
- **Row Level Security (RLS)** at database level for bulletproof data isolation
- **Per-tenant branding** and customization support
- **Scalable architecture** that grows with your business

### 👥 **User Management**
- **Global user accounts** that work across all tenants
- **Role-based access control** (Student, Teacher, Admin)
- **JWT authentication** with secure token management
- **Automatic tenant creation** for new teachers

### 📚 **Course Management**
- **Flexible course structure** with modules and items
- **Multiple content types**: Videos, PDFs, Exams, Assignments, HTML, External links
- **Publishing workflow** with draft/published states
- **Course enrollment** with expiration dates
- **ORM**: GORM
- **Authentication**: JWT
- **Password Hashing**: bcrypt

## Getting Started

### Prerequisites

- Go 1.21 or higher
- PostgreSQL 13 or higher
- Git
- Make (optional, but recommended for development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/doroosy-api.git
   cd doroosy-api
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit the `.env` file with your database credentials and other settings.

3. Install dependencies:
   ```bash
   go mod download
   ```

4. Set up the database (Windows PowerShell):
   ```powershell
   .\scripts\init_db.ps1
   ```
   Or using Make (if you have Make installed):
   ```bash
   make db-init
   ```

5. Start the server:
   ```bash
   go run cmd/main.go
   ```
   Or using Make:
   ```bash
   make run
   ```

### Development

#### Database Migrations

- Run new migrations:
  ```bash
  make migrate
  ```

- Rollback the last migration:
  ```bash
  make rollback
  ```

- Reset the database (DANGER: drops the database):
  ```bash
  make db-reset
  ```

#### Linting and Testing

- Run linter:
  ```bash
  make lint
  ```

- Run tests:
  ```bash
  make test
  ```

#### Code Generation

- Install development tools:
  ```bash
  make dev-deps
  ```

- Generate mocks:
  ```bash
  make gen-mocks
  ```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Server
PORT=8080
GIN_MODE=debug

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=doroosy

# JWT
JWT_SECRET=your-secret-key
```

## API Documentation

### Authentication

#### Register a new user
```http
POST /api/v1/auth/register
```

**Request Body**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "phone": "+1234567890",
  "role": "student"
}
```

#### Login
```http
POST /api/v1/auth/login
```

**Request Body**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

## Project Structure

```
doroosy-api/
├── cmd/                  # Application entry points
├── config/              # Configuration management
├── internal/            # Core application code
│   ├── models/          # Database models
│   ├── controller/      # HTTP controllers
│   ├── middlewares/     # HTTP middlewares
│   ├── services/        # Business logic
│   ├── db/             # Database connection and migrations
│   └── utils/          # Helper functions
├── routes/             # Route definitions
├── .env.example       # Example environment variables
├── go.mod            # Go module definition
└── README.md         # This file
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
