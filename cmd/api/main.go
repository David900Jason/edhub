package main

import (
	"log"
	"net/http"

	"doroosy-backend/config"
	"doroosy-backend/internal/controllers"
	"doroosy-backend/internal/db"
	"doroosy-backend/internal/middleware"
	"doroosy-backend/internal/workers"
	"github.com/gin-gonic/gin"
)

func main() {
	// Load configuration
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	// Initialize database
	_, err = db.InitDB(cfg)
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	// Start background workers
	go workers.StartExamWorker()

	// Setup Gin
	if cfg.Environment == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.Default()

	// Add config to context
	router.Use(func(c *gin.Context) {
		c.Set("config", cfg)
		c.Next()
	})

	// Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "healthy",
			"message": "Doroosy API is running",
		})
	})

	// Apply tenant middleware to all API routes
	api := router.Group("/api")
	api.Use(middleware.TenantMiddleware())

	// Auth routes (no JWT required)
	auth := api.Group("/auth")
	{
		auth.POST("/register", controllers.Register)
		auth.POST("/login", controllers.Login)
	}

	// Protected routes (JWT required)
	protected := api.Group("/")
	protected.Use(middleware.JWTMiddleware(cfg))
	{
		// Profile
		protected.GET("/profile", controllers.GetProfile)

		// Courses
		courses := protected.Group("/courses")
		{
			courses.GET("", controllers.ListCourses)
			courses.GET("/:id", controllers.GetCourse)
			courses.POST("", middleware.RequireRole("teacher"), controllers.CreateCourse)
			courses.PUT("/:id", middleware.RequireRole("teacher"), controllers.UpdateCourse)
			courses.DELETE("/:id", middleware.RequireRole("teacher"), controllers.DeleteCourse)
		}

		// Wallet (students only)
		wallet := protected.Group("/wallet")
		wallet.Use(middleware.RequireRole("student"))
		{
			wallet.GET("", controllers.GetWallet)
			wallet.POST("/topup", controllers.TopUpWallet)
			wallet.POST("/purchase", controllers.PurchaseCourse)
		}

		// Exams
		exams := protected.Group("/exams")
		{
			exams.POST("/:id/start", middleware.RequireRole("student"), controllers.StartExam)
			exams.POST("/submit", middleware.RequireRole("student"), controllers.SubmitExam)
			exams.GET("/attempts/:id", controllers.GetExamAttempt)
		}

		// Activity tracking
		tracking := protected.Group("/tracking")
		tracking.Use(middleware.RequireRole("student"))
		{
			tracking.POST("/video/start", controllers.StartVideoTracking)
			tracking.PUT("/video/update", controllers.UpdateVideoProgress)
			tracking.POST("/pdf/start", controllers.StartPDFTracking)
			tracking.PUT("/pdf/update", controllers.UpdatePDFProgress)
			tracking.GET("/activity", controllers.GetStudentActivity)
		}

		// Teacher routes
		teacher := protected.Group("/teacher")
		teacher.Use(middleware.RequireRole("teacher"))
		{
			teacher.GET("/activity/:student_id", controllers.GetStudentActivity)
		}
	}

	// Start server
	port := cfg.Port
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	log.Printf("Environment: %s", cfg.Environment)
	log.Printf("Database connected successfully")
	log.Printf("Background exam worker started")

	if err := router.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
