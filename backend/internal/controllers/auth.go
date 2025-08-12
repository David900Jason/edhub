package controllers

import (
	"net/http"

	"doroosy-backend/config"
	"doroosy-backend/internal/db"
	"doroosy-backend/internal/middleware"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *gin.Context) {
	var req struct {
		Email       string `json:"email" binding:"required,email"`
		Password    string `json:"password" binding:"required,min=6"`
		DisplayName string `json:"display_name" binding:"required"`
		Role        string `json:"role" binding:"required,oneof=student teacher"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	// Check if user exists
	var existingID int
	checkQuery := "SELECT id FROM users WHERE email = $1"
	err = db.Pool.QueryRow(c.Request.Context(), checkQuery, req.Email).Scan(&existingID)
	if err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "User already exists"})
		return
	}

	// Create user
	var userID int
	insertQuery := `
		INSERT INTO users (email, password_hash, display_name, role, is_active, created_at)
		VALUES ($1, $2, $3, $4, true, NOW())
		RETURNING id
	`
	err = db.Pool.QueryRow(c.Request.Context(), insertQuery, req.Email, string(hashedPassword), req.DisplayName, req.Role).Scan(&userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	// If teacher, create tenant
	if req.Role == "teacher" {
		tenantSlug, _ := c.Get("tenant_slug"); tenantSlugStr := tenantSlug.(string)
		tenantQuery := `
			INSERT INTO tenants (slug, name, owner_id, created_at)
			VALUES ($1, $2, $3, NOW())
			ON CONFLICT (slug) DO NOTHING
		`
		db.Pool.Exec(c.Request.Context(), tenantQuery, tenantSlugStr, req.DisplayName+"'s School", userID)
	}

	// Generate JWT
	cfg := c.MustGet("config").(*config.Config)
	token, err := middleware.GenerateJWT(userID, req.Email, req.Role, req.DisplayName, true, cfg)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "User registered successfully",
		"token":   token,
		"user": gin.H{
			"id":           userID,
			"email":        req.Email,
			"display_name": req.DisplayName,
			"role":         req.Role,
		},
	})
}

func Login(c *gin.Context) {
	var req struct {
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get user
	var user db.User
	query := "SELECT id, email, password_hash, display_name, role, is_active FROM users WHERE email = $1"
	err := db.Pool.QueryRow(c.Request.Context(), query, req.Email).Scan(
		&user.ID, &user.Email, &user.PasswordHash, &user.DisplayName, &user.Role, &user.IsActive,
	)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Check password
	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	if !user.IsActive {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Account is inactive"})
		return
	}

	// Generate JWT
	cfg := c.MustGet("config").(*config.Config)
	token, err := middleware.GenerateJWT(int(user.ID), user.Email, user.Role, user.DisplayName, user.IsActive, cfg)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	// Record login
	middleware.RecordTenantLogin(c)

	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful",
		"token":   token,
		"user": gin.H{
			"id":           user.ID,
			"email":        user.Email,
			"display_name": user.DisplayName,
			"role":         user.Role,
		},
	})
}

func GetProfile(c *gin.Context) {
	userID := c.GetInt("user_id")
	
	var user db.User
	query := "SELECT id, email, display_name, role, is_active, created_at FROM users WHERE id = $1"
	err := db.Pool.QueryRow(c.Request.Context(), query, userID).Scan(
		&user.ID, &user.Email, &user.DisplayName, &user.Role, &user.IsActive, &user.CreatedAt,
	)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"user": gin.H{
			"id":           user.ID,
			"email":        user.Email,
			"display_name": user.DisplayName,
			"role":         user.Role,
			"is_active":    user.IsActive,
			"created_at":   user.CreatedAt,
		},
	})
}
