package middleware

import (
	"context"
	"net/http"
	"strings"
	"sync"

	"doroosy-backend/internal/db"
	"github.com/gin-gonic/gin"
)

var (
	tenantCache = make(map[string]*db.Tenant)
	cacheMutex  sync.RWMutex
)

func TenantMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Extract subdomain from Host header
		tenantSlug := extractSubdomain(c.Request.Host)
		
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

		// Acquire a dedicated connection for this request
		conn, err := db.Pool.Acquire(c.Request.Context())
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection failed"})
			c.Abort()
			return
		}

		// Set tenant context for RLS (convert int64 to int)
		if err := db.SetTenantContext(c.Request.Context(), conn, int(tenant.ID)); err != nil {
			conn.Release()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to set tenant context"})
			c.Abort()
			return
		}

		// Store tenant info and connection in context
		c.Set("tenant", tenant)
		c.Set("tenant_id", int(tenant.ID))
		c.Set("tenant_slug", tenant.Slug)
		c.Set("db_conn", conn)

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
