package config

import (
	"fmt"
	"os"
	"strconv"
)

type Config struct {
	// Database
	DatabaseURL    string
	DBHost         string
	DBPort         int
	DBUser         string
	DBPassword     string
	DBName         string
	DBSSLMode      string
	
	// JWT
	JWTSecret      string
	
	// Server
	Port           string
	Environment    string
	
	// File Storage
	S3Bucket       string
	S3Region       string
	S3AccessKey    string
	S3SecretKey    string
	S3Endpoint     string // for MinIO compatibility
	
	// Redis (for caching)
	RedisURL       string
}

func LoadConfig() (*Config, error) {
	// Load configuration from environment variables
	dbPort, _ := strconv.Atoi(getEnv("DB_PORT", "5432"))
	
	config := &Config{
		// Database
		DatabaseURL:    getEnv("DATABASE_URL", ""),
		DBHost:         getEnv("DB_HOST", "localhost"),
		DBPort:         dbPort,
		DBUser:         getEnv("DB_USER", "postgres"),
		DBPassword:     getEnv("DB_PASSWORD", ""),
		DBName:         getEnv("DB_NAME", "doroosy"),
		DBSSLMode:      getEnv("DB_SSL_MODE", "disable"),
		
		// JWT
		JWTSecret:      getEnv("JWT_SECRET", "your-secret-key"),
		
		// Server
		Port:           getEnv("PORT", "8080"),
		Environment:    getEnv("ENVIRONMENT", "development"),
		
		// File Storage
		S3Bucket:       getEnv("S3_BUCKET", ""),
		S3Region:       getEnv("S3_REGION", "us-east-1"),
		S3AccessKey:    getEnv("S3_ACCESS_KEY", ""),
		S3SecretKey:    getEnv("S3_SECRET_KEY", ""),
		S3Endpoint:     getEnv("S3_ENDPOINT", ""), // for MinIO
		
		// Redis
		RedisURL:       getEnv("REDIS_URL", "redis://localhost:6379"),
	}

	// Validate required configurations
	if config.JWTSecret == "your-secret-key" {
		return nil, fmt.Errorf("JWT_SECRET must be set in environment variables")
	}
	
	if config.DatabaseURL == "" && config.DBPassword == "" {
		return nil, fmt.Errorf("either DATABASE_URL or DB_PASSWORD must be set")
	}

	return config, nil
}

func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}
