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
	router.Use(func(c *gin.Context) {
		c.Set("config", cfg)
		c.Set("tenant_id", 1)
		c.Set("tenant_slug", "teacher1")
		c.Set("user_id", 2)  // Add this
		c.Set("user_role", "teacher")  // Add this
		c.Next()
	})

	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "healthy", "message": "Doroosy API is running"})
	})

	// Auth routes
	auth := router.Group("/api/auth")
	{
		auth.POST("/register", controllers.Register)
		auth.POST("/login", controllers.Login)
	}

	// Protected routes
	protected := router.Group("/api")
	protected.Use(middleware.JWTMiddleware(cfg))
	{
		courses := protected.Group("/courses")
		{
			courses.GET("", controllers.ListCourses)
			courses.GET("/:id", controllers.GetCourse)
			courses.POST("", controllers.CreateCourse)
		}
	}

	log.Printf("Simple API starting on port %s", cfg.Port)
	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
