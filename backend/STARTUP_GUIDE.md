# Doroosy Multi-Tenant Educational Platform - Startup Guide

## Prerequisites

1. **PostgreSQL** installed and running
2. **Go 1.23+** installed
3. **Git** for version control

## Quick Start

### 1. Database Setup

First, create the PostgreSQL database:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE doroosy;

# Exit psql
\q
```

### 2. Install Dependencies

```bash
go mod tidy
```

### 3. Run Database Migrations

```bash
# Install golang-migrate (if not already installed)
go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest

# Run migrations
migrate -path migrations -database "postgres://postgres:password@localhost:5432/doroosy?sslmode=disable" up
```

### 4. Update Environment Variables

Edit your `.env` file with your actual database credentials:

```env
DATABASE_URL=postgres://postgres:YOUR_PASSWORD@localhost:5432/doroosy?sslmode=disable
DB_PASSWORD=YOUR_PASSWORD
JWT_SECRET=your-super-secure-random-string-at-least-32-characters-long
```

### 5. Start the API Server

```bash
go run cmd/api/main.go
```

The server will start on `http://localhost:8080`

## Testing the API

### Health Check
```bash
curl http://localhost:8080/health
```

### Create a Test Tenant (Teacher)

1. **Register a Teacher:**
```bash
curl -X POST http://teacher1.localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teacher@example.com",
    "password": "password123",
    "display_name": "John Teacher",
    "role": "teacher"
  }'
```

2. **Login as Teacher:**
```bash
curl -X POST http://teacher1.localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teacher@example.com",
    "password": "password123"
  }'
```

Save the JWT token from the response for subsequent requests.

### Create a Course

```bash
curl -X POST http://teacher1.localhost:8080/api/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Introduction to Programming",
    "short_slug": "intro-programming",
    "description": "Learn the basics of programming",
    "price_cents": 5000,
    "access_days": 90,
    "published": true
  }'
```

### Register a Student

```bash
curl -X POST http://teacher1.localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "password123",
    "display_name": "Jane Student",
    "role": "student"
  }'
```

### Student Login and Course Purchase

1. **Login as Student:**
```bash
curl -X POST http://teacher1.localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "password123"
  }'
```

2. **Check Wallet:**
```bash
curl -X GET http://teacher1.localhost:8080/api/wallet \
  -H "Authorization: Bearer STUDENT_JWT_TOKEN"
```

3. **Top Up Wallet:**
```bash
curl -X POST http://teacher1.localhost:8080/api/wallet/topup \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer STUDENT_JWT_TOKEN" \
  -d '{
    "amount_cents": 10000,
    "reference": "test-topup"
  }'
```

4. **Purchase Course:**
```bash
curl -X POST http://teacher1.localhost:8080/api/wallet/purchase \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer STUDENT_JWT_TOKEN" \
  -d '{
    "course_id": 1
  }'
```

## Multi-Tenant Testing

To test multi-tenancy, you need to simulate different subdomains. You can:

### Option 1: Use hosts file (Recommended for local testing)

Add to your `C:\Windows\System32\drivers\etc\hosts` file:
```
127.0.0.1 teacher1.localhost
127.0.0.1 teacher2.localhost
127.0.0.1 student1.localhost
```

Then access:
- `http://teacher1.localhost:8080`
- `http://teacher2.localhost:8080`

### Option 2: Use curl with Host header

```bash
curl -H "Host: teacher1.doroosy.com" http://localhost:8080/api/courses
```

## Background Workers

The exam auto-submit worker runs automatically and checks for expired exams every 30 seconds. You can see logs in the console when it processes expired exams.

## File Storage (Wasabi)

Your Wasabi configuration is already set up in the `.env` file. The system will use Wasabi for storing course materials like videos and PDFs.

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check your database credentials in `.env`
- Verify the database exists

### Migration Issues
```bash
# Check migration status
migrate -path migrations -database "postgres://postgres:password@localhost:5432/doroosy?sslmode=disable" version

# Force migration version (if needed)
migrate -path migrations -database "postgres://postgres:password@localhost:5432/doroosy?sslmode=disable" force 1
```

### Tenant Not Found Errors
- Ensure you're using the correct subdomain format
- Check that the tenant exists in the database
- Verify your hosts file or Host header

## Production Deployment

For production deployment:

1. **Update Environment Variables:**
   - Set strong JWT secret
   - Use production database credentials
   - Set `ENVIRONMENT=production`

2. **Database Security:**
   - Enable SSL mode
   - Use connection pooling
   - Set up database backups

3. **HTTPS Setup:**
   - Get wildcard SSL certificate for `*.doroosy.com`
   - Configure reverse proxy (nginx/cloudflare)

4. **Monitoring:**
   - Set up health checks
   - Monitor database performance
   - Log aggregation

## API Documentation

The API follows RESTful conventions with these main endpoints:

- **Auth:** `/api/auth/login`, `/api/auth/register`
- **Courses:** `/api/courses` (CRUD operations)
- **Wallet:** `/api/wallet` (balance, topup, purchase)
- **Exams:** `/api/exams/start`, `/api/exams/submit`
- **Tracking:** `/api/tracking/video/start`, `/api/tracking/pdf/start`

All protected endpoints require `Authorization: Bearer <JWT_TOKEN>` header.
