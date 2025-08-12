# Doroosy Backend API Documentation

## Overview
The Doroosy educational platform API provides comprehensive user management, authentication, and course management functionality for students, teachers, and parents.

**Base URL**: `api.doroosy.com` (not `doroosy.com/api`)

## User Model Structure

### User Table Fields
| Column Name | Type | Description | Constraints |
|-------------|------|-------------|-------------|
| id | UUID/Integer | Unique ID for the user | PRIMARY KEY, AUTO_INCREMENT |
| first_name | VARCHAR(50) | User's first name | NOT NULL |
| middle_name | VARCHAR(50) | User's middle name | NULLABLE |
| last_name | VARCHAR(50) | User's last name | NOT NULL |
| full_name | VARCHAR(150) | Computed full name | NOT NULL |
| email | VARCHAR(100) | Email address for login | UNIQUE, NOT NULL |
| password_hash | TEXT | Hashed login password | NOT NULL |
| role | ENUM | User role: student/teacher | DEFAULT 'student', NOT NULL |
| phone_number | VARCHAR(15) | User's mobile phone | NOT NULL |
| parent_number | VARCHAR(15) | Parent contact (students only) | NULLABLE |
| dad_phone | VARCHAR(15) | Father's phone number | NULLABLE |
| mom_phone | VARCHAR(15) | Mother's phone number | NULLABLE |
| school_year | INTEGER | Student school year [1, 2, 3] | NOT NULL, DEFAULT 3 |
| section | ENUM | Student section: science/math/literature | NULLABLE |
| governorate | VARCHAR(100) | Student's governorate | NULLABLE |
| city | VARCHAR(100) | Student's city | NULLABLE |
| gender | ENUM | Gender: male/female | NULLABLE |
| school | VARCHAR(200) | Student's school name | NULLABLE |
| birth_date | DATE | Date of birth | NULLABLE |
| birthday_year | INTEGER | Birth year component | NULLABLE |
| birthday_month | INTEGER | Birth month component [1-12] | NULLABLE |
| birthday_day | INTEGER | Birth day component [1-31] | NULLABLE |
| id_document_path | TEXT | Path to uploaded ID/birth certificate | NULLABLE |
| is_active | BOOLEAN | Account active status | DEFAULT TRUE |
| is_verified | BOOLEAN | Account verification status | DEFAULT FALSE |
| last_login | DATETIME | Last successful login timestamp | NULLABLE |
| created_at | DATETIME | Account creation timestamp | DEFAULT CURRENT_TIMESTAMP |
| updated_at | DATETIME | Last update timestamp | ON UPDATE CURRENT_TIMESTAMP |

### Important Notes
- **Password Security**: `password_hash` is never returned from any endpoint
- **Auto-Update**: `last_login` updates automatically on successful login
- **Soft Deletion**: `is_active` controls login eligibility and soft deletion
- **Teacher Verification**: `is_verified` must be true for teachers to access teacher-only endpoints
- **Role Enforcement**: Always enforce `role === "teacher"` for teacher-only views

## Authentication Endpoints

### Student Signup
**POST** `/api/auth/signup`

**Description**: Register a new student account with comprehensive information.

**Request Body**:
```json
{
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
}
```

**Response**:
```json
{
  "message": "Student account created successfully",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
}
```

### Teacher Signup
**POST** `/api/auth/signup`

**Description**: Register a new teacher account.

**Request Body**:
```json
{
  "first_name": "Kamal",
  "middle_name": "Mohamed",
  "last_name": "Ahmed",
  "email": "kamal@teachermail.com",
  "password": "12345678",
  "role": "teacher",
  "mobile_phone": "01112345678",
  "school_year": 3,
  "section": "math",
  "governorate": "Giza",
  "city": "6th of October",
  "gender": "male",
  "school": "Modern Education Institute",
  "birthday-year": 1985,
  "birthday-month": 3,
  "birthday-day": 15
}
```

**Response**:
```json
{
  "message": "Teacher account created successfully",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
}
```

### Login
**POST** `/api/auth/login`

**Description**: Authenticate user and return JWT tokens.

**Request Body**:
```json
{
  "email": "salma@studentmail.com",
  "password": "12345678"
}
```

**Response** (Student):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI...",
  "user": {
    "id": 17,
    "full_name": "Salma Ahmed Mahmoud",
    "email": "salma@studentmail.com",
    "role": "student"
  }
}
```

**Response** (Teacher):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI...",
  "user": {
    "id": 18,
    "full_name": "Kamal Mohamed Ahmed",
    "email": "kamal@teachermail.com",
    "role": "teacher",
    "is_verified": false
  }
}
```

## User Profile Endpoints

### Get Current User Profile
**GET** `/api/user/me`

**Headers**: `Authorization: Bearer <access_token>`

**Response** (Student):
```json
{
  "id": 17,
  "first_name": "Salma",
  "middle_name": "Ahmed",
  "last_name": "Mahmoud",
  "full_name": "Salma Ahmed Mahmoud",
  "email": "salma@studentmail.com",
  "role": "student",
  "phone_number": "01112345678",
  "parent_number": "01098765432",
  "dad_phone": "01098765432",
  "mom_phone": "01087654321",
  "school_year": 2,
  "section": "science",
  "governorate": "Cairo",
  "city": "Nasr City",
  "gender": "female",
  "school": "Al-Noor International School",
  "birth_date": "2008-11-05T00:00:00Z",
  "birthday_year": 2008,
  "birthday_month": 11,
  "birthday_day": 5,
  "is_active": true,
  "is_verified": false,
  "created_at": "2025-08-10T14:50:00Z"
}
```

### Update User Profile
**PUT** `/api/user/me`

**Headers**: `Authorization: Bearer <access_token>`

**Request Body**:
```json
{
  "first_name": "Salma",
  "last_name": "M. Mahmoud",
  "phone_number": "01100000000",
  "parent_phone": "01000000000"
}
```

**Response**:
```json
{
  "message": "Profile updated successfully"
}
```

### Deactivate Account (Teachers Only)
**DELETE** `/api/user/me`

**Headers**: `Authorization: Bearer <access_token>`

**Response**:
```json
{
  "message": "Profile deactivated successfully"
}
```

## User Management Endpoints (Teachers Only)

### List Users by Role
**GET** `/api/users?role=student`

**Headers**: `Authorization: Bearer <access_token>`

**Description**: Returns list of users filtered by role. Only accessible by verified teachers.

**Query Parameters**:
- `role` (optional): Filter by role (`student`, `teacher`)

**Response**:
```json
[
  {
    "id": 17,
    "full_name": "Salma Ahmed Mahmoud",
    "email": "salma@studentmail.com",
    "role": "student",
    "school_year": 2,
    "section": "science",
    "is_active": true,
    "created_at": "2025-08-10T14:50:00Z"
  }
]
```

### Get User by ID
**GET** `/api/users/:id`

**Headers**: `Authorization: Bearer <access_token>`

**Description**: Returns details of a single user by ID. Only accessible by verified teachers.

**Response**:
```json
{
  "id": 17,
  "first_name": "Salma",
  "full_name": "Salma Ahmed Mahmoud",
  "email": "salma@studentmail.com",
  "role": "student",
  "phone_number": "01112345678",
  "school_year": 2,
  "section": "science",
  "governorate": "Cairo",
  "city": "Nasr City",
  "is_active": true,
  "created_at": "2025-08-10T14:50:00Z"
}
```

## File Upload Endpoints

### Upload ID Document
**POST** `/api/upload/id-document`

**Headers**: `Authorization: Bearer <access_token>`

**Description**: Upload ID or birth certificate document for student verification.

**Request**: Multipart form data with `file` field

**Supported Formats**: PDF, JPG, JPEG, PNG (max 10MB)

**Response**:
```json
{
  "message": "ID document uploaded successfully",
  "file_path": "id_documents/user_17_id_1691234567.pdf"
}
```

### Get ID Document (Teachers Only)
**GET** `/api/upload/id-document/:user_id`

**Headers**: `Authorization: Bearer <access_token>`

**Description**: Retrieve uploaded ID document for a specific user. Only accessible by verified teachers.

**Response**: Binary file content

## Authentication & Authorization

### JWT Token Structure
- **Access Token**: Valid for 24 hours
- **Refresh Token**: Valid for 7 days
- **Claims Include**: user_id, email, role

### Role-Based Access Control
- **Public Endpoints**: Signup, Login
- **Authenticated Endpoints**: Profile management, file upload
- **Teacher-Only Endpoints**: User listing, user details, document access
- **Verification Requirement**: Teachers must have `is_verified: true` for teacher-only endpoints

### Security Features
- Password hashing using bcrypt
- JWT token-based authentication
- Role-based endpoint protection
- File upload validation and size limits
- Automatic last_login tracking

## Error Responses

### Common Error Formats
```json
{
  "error": "Error message description"
}
```

### HTTP Status Codes
- `200`: Success
- `201`: Created (signup success)
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (invalid/missing token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `413`: Request Entity Too Large (file upload)
- `500`: Internal Server Error

## Setup Instructions

### Environment Variables
Set the following environment variables before running the application:

```powershell
$env:JWT_SECRET = "your-super-secret-jwt-key"
$env:DB_HOST = "localhost"
$env:DB_PORT = "5432"
$env:DB_USER = "postgres"
$env:DB_PASSWORD = "your-db-password"
$env:DB_NAME = "doroosy"
$env:PORT = "8080"
$env:GIN_MODE = "debug"
```

### Database Setup
1. Install PostgreSQL
2. Create database: `CREATE DATABASE doroosy;`
3. Run migrations: `go run ./cmd/migrate/main.go`

### Running the Application
```bash
go run ./cmd/main.go
```

The server will start on `http://localhost:8080`

## File Storage Structure
```
uploads/
└── id_documents/
    ├── user_17_id_1691234567.pdf
    ├── user_18_id_1691234568.jpg
    └── ...
```

## Validation Rules

### Signup Validation
- **first_name, last_name**: Required
- **email**: Required, valid email format, unique
- **password**: Required, minimum 8 characters
- **mobile_phone**: Required
- **school_year**: Required, range 1-3
- **section**: Required, one of: science, math, literature
- **governorate, city, school**: Required
- **gender**: Required, one of: male, female
- **birthday components**: Required, valid date ranges

### Profile Update Validation
- All fields optional
- **birth_date**: Format YYYY-MM-DD if provided
- **email**: Cannot be updated (security)
- **role**: Cannot be updated (security)

### File Upload Validation
- **File types**: PDF, JPG, JPEG, PNG only
- **File size**: Maximum 10MB
- **Authentication**: Required
- **Unique naming**: Automatic timestamp-based naming

## Business Rules

### Student Registration
- All personal information fields are required
- Parent contact information (dad_phone, mom_phone) required
- ID document upload required for verification
- Account created with `is_verified: false`

### Teacher Registration  
- Personal information required
- Parent contact fields not applicable
- Account created with `is_verified: false`
- Must be manually verified by admin to access teacher features

### Access Control
- **Students**: Can access own profile, update profile, upload documents
- **Teachers**: All student features + user management + document access (if verified)
- **Verification**: Teachers must have `is_verified: true` for teacher-only endpoints

### Data Privacy
- Password hash never returned in any response
- Sensitive user data only accessible by authorized roles
- File uploads stored securely with unique naming
