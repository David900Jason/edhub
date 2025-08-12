package controllers

import (
	"net/http"
	"strconv"

	"doroosy-backend/internal/db"
	"github.com/gin-gonic/gin"
)

func ListCourses(c *gin.Context) {
	tenantID := c.GetInt("tenant_id")
	
	query := `
		SELECT c.id, c.title, c.short_slug, c.description, c.price_cents, 
		       c.access_days, c.published, c.created_at,
		       COALESCE(e.id IS NOT NULL, false) as is_enrolled
		FROM courses c
		LEFT JOIN enrollments e ON c.id = e.course_id AND e.student_id = $1
		WHERE c.tenant_id = $2 AND c.published = true
		ORDER BY c.created_at DESC
	`

	userID := c.GetInt("user_id")
	rows, err := db.Pool.Query(c.Request.Context(), query, userID, tenantID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch courses"})
		return
	}
	defer rows.Close()

	var courses []gin.H
	for rows.Next() {
		var course gin.H = make(gin.H)
		var id, priceCents, accessDays int
		var title, shortSlug, description, createdAt string
		var published, isEnrolled bool

		err := rows.Scan(&id, &title, &shortSlug, &description, &priceCents, 
			&accessDays, &published, &createdAt, &isEnrolled)
		if err != nil {
			continue
		}

		course["id"] = id
		course["title"] = title
		course["short_slug"] = shortSlug
		course["description"] = description
		course["price_cents"] = priceCents
		course["access_days"] = accessDays
		course["published"] = published
		course["created_at"] = createdAt
		course["is_enrolled"] = isEnrolled

		courses = append(courses, course)
	}

	c.JSON(http.StatusOK, gin.H{
		"courses": courses,
		"total": len(courses),
	})
}

func GetCourse(c *gin.Context) {
	courseID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid course ID"})
		return
	}

	tenantID := c.GetInt("tenant_id")
	
	query := `
		SELECT id, title, short_slug, description, price_cents, access_days, published, created_at
		FROM courses 
		WHERE id = $1 AND tenant_id = $2
	`

	var course gin.H = make(gin.H)
	var id, priceCents, accessDays int
	var title, shortSlug, description, createdAt string
	var published bool

	err = db.Pool.QueryRow(c.Request.Context(), query, courseID, tenantID).Scan(
		&id, &title, &shortSlug, &description, &priceCents, &accessDays, &published, &createdAt)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Course not found"})
		return
	}

	course["id"] = id
	course["title"] = title
	course["short_slug"] = shortSlug
	course["description"] = description
	course["price_cents"] = priceCents
	course["access_days"] = accessDays
	course["published"] = published
	course["created_at"] = createdAt

	c.JSON(http.StatusOK, gin.H{"course": course})
}

func CreateCourse(c *gin.Context) {
	var req struct {
		Title       string `json:"title" binding:"required"`
		ShortSlug   string `json:"short_slug" binding:"required"`
		Description string `json:"description"`
		PriceCents  int    `json:"price_cents" binding:"required"`
		AccessDays  int    `json:"access_days" binding:"required"`
		Published   bool   `json:"published"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tenantID := c.GetInt("tenant_id")
	userID := c.GetInt("user_id")

	query := `
		INSERT INTO courses (title, short_slug, description, price_cents, access_days, published, tenant_id, teacher_id, created_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
		RETURNING id, created_at
	`

	var courseID int
	var createdAt string
	err := db.Pool.QueryRow(c.Request.Context(), query, req.Title, req.ShortSlug, req.Description, 
		req.PriceCents, req.AccessDays, req.Published, tenantID, userID).Scan(&courseID, &createdAt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create course"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Course created successfully",
		"course": gin.H{
			"id": courseID,
			"title": req.Title,
			"short_slug": req.ShortSlug,
			"description": req.Description,
			"price_cents": req.PriceCents,
			"access_days": req.AccessDays,
			"published": req.Published,
			"created_at": createdAt,
		},
	})
}

func UpdateCourse(c *gin.Context) {
	courseID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid course ID"})
		return
	}

	var req struct {
		Title       string `json:"title"`
		ShortSlug   string `json:"short_slug"`
		Description string `json:"description"`
		PriceCents  *int   `json:"price_cents"`
		AccessDays  *int   `json:"access_days"`
		Published   *bool  `json:"published"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tenantID := c.GetInt("tenant_id")

	query := `
		UPDATE courses 
		SET title = COALESCE(NULLIF($2, ''), title),
		    short_slug = COALESCE(NULLIF($3, ''), short_slug),
		    description = COALESCE(NULLIF($4, ''), description),
		    price_cents = COALESCE($5, price_cents),
		    access_days = COALESCE($6, access_days),
		    published = COALESCE($7, published),
		    updated_at = NOW()
		WHERE id = $1 AND tenant_id = $8
		RETURNING id, title, short_slug, description, price_cents, access_days, published
	`

	var course gin.H = make(gin.H)
	var id, priceCents, accessDays int
	var title, shortSlug, description string
	var published bool

	err = db.Pool.QueryRow(c.Request.Context(), query, courseID, req.Title, req.ShortSlug, 
		req.Description, req.PriceCents, req.AccessDays, req.Published, tenantID).Scan(
		&id, &title, &shortSlug, &description, &priceCents, &accessDays, &published)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Course not found or update failed"})
		return
	}

	course["id"] = id
	course["title"] = title
	course["short_slug"] = shortSlug
	course["description"] = description
	course["price_cents"] = priceCents
	course["access_days"] = accessDays
	course["published"] = published

	c.JSON(http.StatusOK, gin.H{
		"message": "Course updated successfully",
		"course": course,
	})
}

func DeleteCourse(c *gin.Context) {
	courseID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid course ID"})
		return
	}

	tenantID := c.GetInt("tenant_id")

	query := "DELETE FROM courses WHERE id = $1 AND tenant_id = $2"
	result, err := db.Pool.Exec(c.Request.Context(), query, courseID, tenantID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete course"})
		return
	}

	if result.RowsAffected() == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Course not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Course deleted successfully"})
}
