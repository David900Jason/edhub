@echo off
echo Starting Doroosy Multi-Tenant Educational Platform API...
echo.

REM Check if Go is installed
go version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Go is not installed or not in PATH
    echo Please install Go 1.23+ from https://golang.org/dl/
    pause
    exit /b 1
)

REM Install dependencies
echo Installing dependencies...
go mod tidy

REM Check if .env file exists
if not exist .env (
    echo Error: .env file not found
    echo Please create .env file with your configuration
    pause
    exit /b 1
)

REM Start the API server
echo.
echo Starting API server on port 8080...
echo Access the API at: http://localhost:8080
echo Health check: http://localhost:8080/health
echo.
echo For multi-tenant testing, add these to your hosts file:
echo 127.0.0.1 teacher1.localhost
echo 127.0.0.1 teacher2.localhost
echo.
echo Press Ctrl+C to stop the server
echo.

go run cmd/api/main.go
