# Doroosy Backend Environment Setup Script
# Run this script to set up environment variables for development

Write-Host "Setting up Doroosy Backend environment variables..." -ForegroundColor Green

# Server Configuration
$env:PORT = "8080"
$env:GIN_MODE = "debug"

# Database Configuration
$env:DB_HOST = "localhost"
$env:DB_PORT = "5432"
$env:DB_USER = "postgres"
$env:DB_PASSWORD = "postgres"
$env:DB_NAME = "doroosy"

# JWT Configuration - IMPORTANT: Change this in production!
$env:JWT_SECRET = "doroosy-super-secret-jwt-key-2025-change-in-production"
$env:JWT_EXPIRATION = "24h"

# File Upload Configuration
$env:UPLOAD_DIR = "./uploads"
$env:MAX_UPLOAD_SIZE = "10485760"  # 10MB in bytes

Write-Host "Environment variables set successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Current environment:" -ForegroundColor Yellow
Write-Host "PORT: $env:PORT"
Write-Host "GIN_MODE: $env:GIN_MODE"
Write-Host "DB_HOST: $env:DB_HOST"
Write-Host "DB_PORT: $env:DB_PORT"
Write-Host "DB_USER: $env:DB_USER"
Write-Host "DB_NAME: $env:DB_NAME"
Write-Host "JWT_SECRET: [SET]"
Write-Host "UPLOAD_DIR: $env:UPLOAD_DIR"
Write-Host ""
Write-Host "You can now run: go run ./cmd/main.go" -ForegroundColor Cyan
