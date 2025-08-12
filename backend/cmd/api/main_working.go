package main

import (
	"log"
	"net/http"

	"doroosy-backend/config"
	"doroosy-backend/internal/controllers"
	"doroosy-backend/internal/db"
	"doroosy-backend/internal/middleware"
	"github.com/gin-gonic/gin"
)

func main() {
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	_, err = db.InitDB(cfg)
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	router := gin.Default()

	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "healthy", "message": "Doroosy API is running"})
	})

	// Auth routes (no middleware)
	auth := router.Group("/api/auth")
	{
		auth.POST("/register", func(c *gin.Context) {
			c.Set("config", cfg)
			c.Set("tenant_id", 1)
			c.Set("tenant_slug", "teacher1")
			c.Next()
			controllers.Register(c)
		})
		auth.POST("/login", func(c *gin.Context) {
			c.Set("config", cfg)
			c.Set("tenant_id", 1)
			c.Set("tenant_slug", "teacher1")
			c.Next()
			controllers.Login(c)
		})
	}

	// Protected routes (only JWT middleware)
	protected := router.Group("/api")
	protected.Use(func(c *gin.Context) {
		c.Set("config", cfg)
		c.Set("tenant_id", 1)
		c.Set("tenant_slug", "teacher1")
		c.Set("user_id", 2)
		c.Set("user_role", "teacher")
		c.Next()
	})
	protected.Use(middleware.JWTMiddleware(cfg))
	{
		// List courses
		protected.GET("/courses", func(c *gin.Context) {
			rows, err := db.Pool.Query(c, "SELECT id, title, description, price, short_slug FROM courses WHERE tenant_id = 1")
			if err != nil {
				c.JSON(500, gin.H{"error": "Database error: " + err.Error()})
				return
			}
			defer rows.Close()
			
			courses := []map[string]interface{}{}
			for rows.Next() {
				var id int
				var title, description, shortSlug string
				var price float64
				if err := rows.Scan(&id, &title, &description, &price, &shortSlug); err != nil {
					c.JSON(500, gin.H{"error": "Scan error: " + err.Error()})
					return
				}
				courses = append(courses, map[string]interface{}{
					"id": id,
					"title": title,
					"description": description,
					"price": price,
					"short_slug": shortSlug,
				})
			}
			
			c.JSON(200, gin.H{"courses": courses, "total": len(courses)})
		})

		// Create course
		protected.POST("/courses", func(c *gin.Context) {
			var req struct {
				Title       string  `json:"title"`
				Description string  `json:"description"`
				ShortSlug   string  `json:"short_slug"`
				Price       float64 `json:"price"`
				PriceCents  int     `json:"price_cents"`
				AccessDays  int     `json:"access_days"`
			}
			
			if err := c.ShouldBindJSON(&req); err != nil {
				c.JSON(400, gin.H{"error": "Invalid JSON: " + err.Error()})
				return
			}
			
			var courseID int
			err := db.Pool.QueryRow(c, 
				"INSERT INTO courses (tenant_id, title, description, short_slug, price, price_cents, access_days, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
				1, req.Title, req.Description, req.ShortSlug, req.Price, req.PriceCents, req.AccessDays, 2).Scan(&courseID)
			
			if err != nil {
				c.JSON(500, gin.H{"error": "Failed to create course: " + err.Error()})
				return
			}
			
			c.JSON(201, gin.H{
				"message": "Course created successfully",
				"course_id": courseID,
				"title": req.Title,
			})
		})
	}

	log.Printf("Working API starting on port %s", cfg.Port)
	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
