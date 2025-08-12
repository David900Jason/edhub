package middleware

import (
	"fmt"
	"net/http"
	"strings"
	"time"

	"doroosy-backend/config"
	"doroosy-backend/internal/db"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

type JWTClaims struct {
	UserID      int    `json:"user_id"`
	Email       string `json:"email"`
	Role        string `json:"role"`
	DisplayName string `json:"display_name"`
	IsActive    bool   `json:"is_active"`
	jwt.RegisteredClaims
}

func JWTMiddleware(cfg *config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
			c.Abort()
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		if tokenString == authHeader {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Bearer token required"})
			c.Abort()
			return
		}

		token, err := jwt.ParseWithClaims(tokenString, &JWTClaims{}, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(cfg.JWTSecret), nil
		})

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		if claims, ok := token.Claims.(*JWTClaims); ok && token.Valid {
			if !claims.IsActive {
				c.JSON(http.StatusUnauthorized, gin.H{"error": "Account is inactive"})
				c.Abort()
				return
			}

			c.Set("user_id", claims.UserID)
			c.Set("user_email", claims.Email)
			c.Set("user_role", claims.Role)
			c.Set("user_display_name", claims.DisplayName)
			c.Set("is_active", claims.IsActive)
			c.Next()
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
			c.Abort()
			return
		}
	}
}

func GenerateJWT(userID int, email, role, displayName string, isActive bool, cfg *config.Config) (string, error) {
	claims := JWTClaims{
		UserID:      userID,
		Email:       email,
		Role:        role,
		DisplayName: displayName,
		IsActive:    isActive,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(cfg.JWTSecret))
}

func RequireRole(roles ...string) gin.HandlerFunc {
	return func(c *gin.Context) {
		userRole, exists := c.Get("user_role")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User role not found"})
			c.Abort()
			return
		}

		role, ok := userRole.(string)
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user role"})
			c.Abort()
			return
		}

		for _, allowedRole := range roles {
			if role == allowedRole {
				c.Next()
				return
			}
		}

		c.JSON(http.StatusForbidden, gin.H{"error": "Insufficient permissions"})
		c.Abort()
	}
}

func RecordTenantLogin(c *gin.Context) {
	// Get user and tenant info
	userID, exists := c.Get("user_id")
	if !exists {
		return
	}

	tenantID, exists := c.Get("tenant_id")
	if !exists {
		return
	}

	// Get type assertions with proper checks
	uid, ok := userID.(int)
	if !ok {
		return
	}

	tid, ok := tenantID.(int)
	if !ok {
		return
	}

	// Record login in background
	go func() {
		query := `
			INSERT INTO tenant_logins (user_id, tenant_id, ip_address, user_agent, login_at)
			VALUES ($1, $2, $3, $4, NOW())
		`
		db.Pool.Exec(c.Request.Context(), query, uid, tid, c.ClientIP(), c.GetHeader("User-Agent"))
	}()
}
