package middleware

import (
	"context"
	"net/http"
	"strings"
	"sync"

	"doroosy-backend/config"
	"doroosy-backend/internal/db"
	"github.com/gin-gonic/gin"
)

var (
	tenantCache = make(map[string]*db.Tenant)
	cacheMutex  sync.RWMutex
)

func TenantMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get config from context
		cfg, exists := c.Get("config")
		if !exists {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Configuration not found"})
			c.Abort()
			return
		}
		config := cfg.(*config.Config)

		// Set API mode in context
		c.Set("api_mode", config.APIMode)

		var tenantSlug string
		var tenantID int
		host := c.Request.Host

		// Skip tenant resolution for API subdomain health checks
		if strings.HasPrefix(host, "api.") {
			// For API subdomain, use simple mode logic or skip tenant entirely for health endpoints
			if c.Request.URL.Path == "/health" {
				c.Next()
				return
			}
			
			// For API subdomain, get tenant from headers/query in both modes
			tenantSlug = c.GetHeader("X-Teacher-Slug")
			if tenantSlug == "" {
				tenantSlug = c.Query("teacher")
			}
			if tenantSlug == "" && config.APIMode == "simple" {
				tenantSlug = "platform" // Default tenant for simple mode
			}
			
			if tenantSlug != "" {
				tenant, err := getTenantWithCache(c.Request.Context(), tenantSlug)
				if err != nil {
					tenantID = 1 // Default tenant ID
				} else {
					tenantID = int(tenant.ID)
				}
			} else if config.APIMode == "complete" {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Teacher slug required in complete mode"})
				c.Abort()
				return
			}
		} else if config.APIMode == "complete" {
			// In complete mode with teacher subdomains, extract subdomain from Host header
			tenantSlug = extractSubdomain(host)
			
			if tenantSlug == "" {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid subdomain"})
				c.Abort()
				return
			}

			// Get tenant from cache or database
			tenant, err := getTenantWithCache(c.Request.Context(), tenantSlug)
			if err != nil {
				c.JSON(http.StatusNotFound, gin.H{"error": "Tenant not found"})
				c.Abort()
				return
			}
			tenantID = int(tenant.ID)
		} else {
			// Simple mode: use default tenant or from headers/query
			tenantSlug = c.GetHeader("X-Teacher-Slug")
			if tenantSlug == "" {
				tenantSlug = c.Query("teacher")
			}
			if tenantSlug == "" {
				tenantSlug = "platform" // Default tenant
			}

			// Try to get tenant, create default if needed
			tenant, err := getTenantWithCache(c.Request.Context(), tenantSlug)
			if err != nil {
				// In simple mode, use a default tenant ID
				tenantID = 1
			} else {
				tenantID = int(tenant.ID)
			}
		}

		// Acquire a dedicated connection for this request
		conn, err := db.Pool.Acquire(c.Request.Context())
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection failed"})
			c.Abort()
			return
		}

		// Set tenant context for RLS
		if tenantID > 0 {
			if err := db.SetTenantContext(c.Request.Context(), conn, tenantID); err != nil {
				conn.Release()
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to set tenant context"})
				c.Abort()
				return
			}
		}

		// Store common info in context
		c.Set("tenant_slug", tenantSlug)
		c.Set("tenant_id", tenantID)
		c.Set("db_conn", conn)
		c.Set("api_mode", config.APIMode)

		// Ensure connection is released after request
		defer conn.Release()

		c.Next()
	}
}

func extractSubdomain(host string) string {
	// Remove port if present
	if colonIndex := strings.Index(host, ":"); colonIndex != -1 {
		host = host[:colonIndex]
	}

	// Split by dots
	parts := strings.Split(host, ".")
	
	// For localhost testing (teacher1.localhost)
	if len(parts) >= 2 && parts[len(parts)-1] == "localhost" {
		return parts[0]
	}
	
	// For production (teacher1.doroosy.com)
	if len(parts) >= 3 {
		return parts[0]
	}

	return ""
}

func getTenantWithCache(ctx context.Context, slug string) (*db.Tenant, error) {
	// Check cache first
	cacheMutex.RLock()
	if tenant, exists := tenantCache[slug]; exists {
		cacheMutex.RUnlock()
		return tenant, nil
	}
	cacheMutex.RUnlock()

	// Get from database
	tenant, err := db.GetTenantFromSlug(ctx, slug)
	if err != nil {
		return nil, err
	}

	// Cache the result
	cacheMutex.Lock()
	tenantCache[slug] = tenant
	cacheMutex.Unlock()

	return tenant, nil
}

func RequireOwnership() gin.HandlerFunc {
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

		// Teachers can manage their own tenant
		if role == "teacher" {
			c.Next()
			return
		}

		c.JSON(http.StatusForbidden, gin.H{"error": "Only tenant owners can perform this action"})
		c.Abort()
	}
}
