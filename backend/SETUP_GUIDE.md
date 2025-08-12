# Doroosy Backend Setup Guide

## 🚀 Quick Start

### Option 1: Using SQLite (Recommended for Development)
For quick development and testing, you can use SQLite instead of PostgreSQL:

1. **Set Environment Variables**:
```powershell
$env:JWT_SECRET="doroosy-super-secret-jwt-key-2025-change-in-production"
$env:DB_HOST="localhost"
$env:DB_PORT="5432"
$env:DB_USER="postgres"
$env:DB_PASSWORD="postgres"
$env:DB_NAME="doroosy.db"
$env:PORT="8080"
$env:GIN_MODE="debug"
```

2. **Run the Application**:
```powershell
go run ./cmd/main.go
```

### Option 2: Using PostgreSQL (Production Setup)

#### Prerequisites
1. **Install PostgreSQL**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
2. **Start PostgreSQL Service**: 
   ```powershell
   net start postgresql-x64-14  # Adjust version as needed
   ```

#### Database Setup
1. **Connect to PostgreSQL**:
   ```powershell
   psql -U postgres
   ```

2. **Create Database**:
   ```sql
   CREATE DATABASE doroosy;
   CREATE USER doroosy_user WITH PASSWORD 'doroosy_password';
   GRANT ALL PRIVILEGES ON DATABASE doroosy TO doroosy_user;
   \q
   ```

3. **Set Environment Variables**:
   ```powershell
   $env:JWT_SECRET="doroosy-super-secret-jwt-key-2025-change-in-production"
   $env:DB_HOST="localhost"
   $env:DB_PORT="5432"
   $env:DB_USER="doroosy_user"
   $env:DB_PASSWORD="doroosy_password"
   $env:DB_NAME="doroosy"
   $env:PORT="8080"
   $env:GIN_MODE="debug"
   ```

4. **Run Database Migrations**:
   ```powershell
   go run ./cmd/migrate/main.go
   ```

5. **Start the Application**:
   ```powershell
   go run ./cmd/main.go
   ```

## 🔧 Environment Variables Reference

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `JWT_SECRET` | Secret key for JWT token signing | - | ✅ Yes |
| `DB_HOST` | Database host | localhost | No |
| `DB_PORT` | Database port | 5432 | No |
| `DB_USER` | Database username | postgres | No |
| `DB_PASSWORD` | Database password | postgres | No |
| `DB_NAME` | Database name | doroosy | No |
| `PORT` | Server port | 8080 | No |
| `GIN_MODE` | Gin framework mode | debug | No |

## 🧪 Testing the API

### 1. Start the Server
After setting environment variables and ensuring database connectivity:
```powershell
go run ./cmd/main.go
```

You should see:
```
Server starting on port 8080...
```

### 2. Test Student Signup
```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Salma",
    "middle_name": "Ahmed", 
    "last_name": "Mahmoud",
    "email": "salma@studentmail.com",
    "password": "12345678",
    "role": "student",
    "mobile_phone": "01112345678",
    "dad_phone_number": "01098765432",
    "mom_phone_number": "01087654321",
    "school_year": 2,
    "section": "science",
    "governorate": "Cairo",
    "city": "Nasr City",
    "gender": "female",
    "school": "Al-Noor International School",
    "birthday-year": 2008,
    "birthday-month": 11,
    "birthday-day": 5
  }'
```

### 3. Test Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "salma@studentmail.com",
    "password": "12345678"
  }'
```

### 4. Test Profile Access
```bash
curl -X GET http://localhost:8080/api/user/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🗃️ Database Schema

The updated user table includes all the fields you specified:

- **Personal Info**: first_name, middle_name, last_name, full_name
- **Contact Info**: email, phone_number, parent_number, dad_phone, mom_phone  
- **Student Details**: school_year, section, governorate, city, gender, school
- **Birth Info**: birth_date, birthday_year, birthday_month, birthday_day
- **Documents**: id_document_path (for uploaded ID/birth certificates)
- **Status**: is_active, is_verified, last_login, created_at, updated_at
- **Security**: password_hash (never returned in API responses)

## 🔐 Security Features

- **Password Hashing**: Using bcrypt for secure password storage
- **JWT Tokens**: Access tokens (24h) and refresh tokens (7 days)
- **Role-Based Access**: Students, teachers, and role-specific endpoints
- **Teacher Verification**: Teachers must be verified to access teacher-only features
- **File Upload Security**: Type validation, size limits, secure file naming
- **Data Privacy**: Sensitive fields never returned in API responses

## 📁 File Upload Structure

```
uploads/
└── id_documents/
    ├── user_17_id_1691234567.pdf
    ├── user_18_id_1691234568.jpg
    └── ...
```

## 🚨 Troubleshooting

### Database Connection Issues
- **PostgreSQL not running**: Start the PostgreSQL service
- **Connection refused**: Check if PostgreSQL is installed and running on port 5432
- **Authentication failed**: Verify database credentials

### Environment Variable Issues
- **JWT_SECRET error**: Ensure the JWT_SECRET environment variable is set
- **Variables not persisting**: Set them in the same PowerShell session where you run the app

### Build Issues
- **Import errors**: Run `go mod tidy` to resolve dependencies
- **Type mismatches**: Ensure all struct types are properly exported and imported

The API is now fully implemented according to your specifications with comprehensive user registration fields, proper authentication flow, and file upload capabilities!
