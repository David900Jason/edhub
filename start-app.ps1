# Quick Start Script for Doroosy Backend
# This script sets environment variables and starts the application

Write-Host "🚀 Starting Doroosy Backend..." -ForegroundColor Green

# Set environment variables for this session
$env:JWT_SECRET = "doroosy-super-secret-jwt-key-2025-change-in-production"
$env:DB_HOST = "localhost"
$env:DB_PORT = "5432"
$env:DB_USER = "postgres"
$env:DB_PASSWORD = "postgres"
$env:DB_NAME = "doroosy"
$env:PORT = "8080"
$env:GIN_MODE = "debug"

Write-Host "✅ Environment variables set" -ForegroundColor Green
Write-Host "📊 Database: PostgreSQL at $env:DB_HOST:$env:DB_PORT" -ForegroundColor Yellow
Write-Host "🔑 JWT Secret: [CONFIGURED]" -ForegroundColor Yellow
Write-Host "🌐 Server Port: $env:PORT" -ForegroundColor Yellow
Write-Host ""

Write-Host "⚠️  IMPORTANT: Make sure PostgreSQL is running on port 5432" -ForegroundColor Red
Write-Host "   If PostgreSQL is not installed, you can:" -ForegroundColor Yellow
Write-Host "   1. Install PostgreSQL from https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
Write-Host "   2. Or use Docker: docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres" -ForegroundColor Yellow
Write-Host ""

Write-Host "🏃 Starting application..." -ForegroundColor Green
.\main.exe
