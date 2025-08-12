# Script to initialize the PostgreSQL database
# Usage: .\scripts\init_db.ps1 [database_name] [username] [password] [host] [port]

param(
    [string]$dbName = "doroosy",
    [string]$dbUser = "postgres",
    [string]$dbPassword = "postgres",
    [string]$dbHost = "localhost",
    [string]$dbPort = "5432"
)

# Check if psql is available
$psqlPath = (Get-Command -Name psql -ErrorAction SilentlyContinue).Source
if (-not $psqlPath) {
    Write-Error "PostgreSQL client (psql) not found. Please ensure PostgreSQL is installed and in your PATH."
    exit 1
}

# Set environment variables for psql
$env:PGPASSWORD = $dbPassword

Write-Host "Checking if database '$dbName' exists..." -ForegroundColor Cyan

# Check if database exists
$dbExists = & psql -h $dbHost -p $dbPort -U $dbUser -tAc "SELECT 1 FROM pg_database WHERE datname = '$dbName'"

if ($dbExists -ne "1") {
    Write-Host "Creating database '$dbName'..." -ForegroundColor Yellow
    & psql -h $dbHost -p $dbPort -U $dbUser -c "CREATE DATABASE $dbName"
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to create database '$dbName'"
        exit 1
    }
    Write-Host "Database '$dbName' created successfully" -ForegroundColor Green
} else {
    Write-Host "Database '$dbName' already exists" -ForegroundColor Green
}

# Run migrations
Write-Host "Running database migrations..." -ForegroundColor Cyan
Set-Location $PSScriptRoot\..
& go run ./cmd/migrate/main.go migrate

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to run migrations"
    exit 1
}

Write-Host "Database initialization completed successfully!" -ForegroundColor Green
