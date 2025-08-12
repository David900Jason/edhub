package controllers

import (
	"net/http"
	"time"

	"doroosy-backend/internal/db"
	"github.com/gin-gonic/gin"
)

func GetWallet(c *gin.Context) {
	userID := c.GetInt("user_id")
	tenantID := c.GetInt("tenant_id")

	query := `
		SELECT balance_cents, created_at, updated_at
		FROM wallets 
		WHERE student_id = $1 AND tenant_id = $2
	`

	var balanceCents int
	var createdAt, updatedAt time.Time

	err := db.Pool.QueryRow(c.Request.Context(), query, userID, tenantID).Scan(&balanceCents, &createdAt, &updatedAt)
	if err != nil {
		// Create wallet if doesn't exist
		insertQuery := `
			INSERT INTO wallets (student_id, tenant_id, balance_cents, created_at, updated_at)
			VALUES ($1, $2, 0, NOW(), NOW())
			RETURNING balance_cents, created_at, updated_at
		`
		err = db.Pool.QueryRow(c.Request.Context(), insertQuery, userID, tenantID).Scan(&balanceCents, &createdAt, &updatedAt)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get wallet"})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"wallet": gin.H{
			"student_id": userID,
			"tenant_id": tenantID,
			"balance_cents": balanceCents,
			"created_at": createdAt,
			"updated_at": updatedAt,
		},
	})
}

func TopUpWallet(c *gin.Context) {
	var req struct {
		AmountCents int    `json:"amount_cents" binding:"required,min=1"`
		Reference   string `json:"reference" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID := c.GetInt("user_id")
	tenantID := c.GetInt("tenant_id")

	// Update wallet balance
	query := `
		UPDATE wallets 
		SET balance_cents = balance_cents + $3, updated_at = NOW()
		WHERE student_id = $1 AND tenant_id = $2
		RETURNING balance_cents
	`

	var newBalance int
	err := db.Pool.QueryRow(c.Request.Context(), query, userID, tenantID, req.AmountCents).Scan(&newBalance)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to top up wallet"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Wallet topped up successfully",
		"new_balance": newBalance,
		"amount_added": req.AmountCents,
	})
}

func PurchaseCourse(c *gin.Context) {
	var req struct {
		CourseID int `json:"course_id" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID := c.GetInt("user_id")
	tenantID := c.GetInt("tenant_id")

	// Get course price
	var priceCents, accessDays int
	var courseTitle string
	courseQuery := `
		SELECT title, price_cents, access_days
		FROM courses 
		WHERE id = $1 AND tenant_id = $2 AND published = true
	`

	err := db.Pool.QueryRow(c.Request.Context(), courseQuery, req.CourseID, tenantID).Scan(&courseTitle, &priceCents, &accessDays)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Course not found"})
		return
	}

	// Check wallet balance
	var currentBalance int
	balanceQuery := "SELECT balance_cents FROM wallets WHERE student_id = $1 AND tenant_id = $2"
	err = db.Pool.QueryRow(c.Request.Context(), balanceQuery, userID, tenantID).Scan(&currentBalance)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Wallet not found"})
		return
	}

	if currentBalance < priceCents {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Insufficient balance"})
		return
	}

	// Begin transaction (simplified)
	// Deduct from wallet
	updateWalletQuery := `
		UPDATE wallets 
		SET balance_cents = balance_cents - $3, updated_at = NOW()
		WHERE student_id = $1 AND tenant_id = $2
		RETURNING balance_cents
	`

	var newBalance int
	err = db.Pool.QueryRow(c.Request.Context(), updateWalletQuery, userID, tenantID, priceCents).Scan(&newBalance)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to process payment"})
		return
	}

	// Create enrollment
	expiresAt := time.Now().AddDate(0, 0, accessDays)
	enrollmentQuery := `
		INSERT INTO enrollments (student_id, course_id, tenant_id, enrolled_at, expires_at, price_paid_cents)
		VALUES ($1, $2, $3, NOW(), $4, $5)
		RETURNING id, enrolled_at
	`

	var enrollmentID int
	var enrolledAt time.Time
	err = db.Pool.QueryRow(c.Request.Context(), enrollmentQuery, userID, req.CourseID, tenantID, expiresAt, priceCents).Scan(&enrollmentID, &enrolledAt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create enrollment"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Course purchased successfully",
		"enrollment": gin.H{
			"id": enrollmentID,
			"course_id": req.CourseID,
			"course_title": courseTitle,
			"enrolled_at": enrolledAt,
			"expires_at": expiresAt,
			"price_paid_cents": priceCents,
		},
		"new_wallet_balance": newBalance,
	})
}
