package controllers

import (
	"net/http"
	"strconv"

	"doroosy-backend/internal/db"
	"github.com/gin-gonic/gin"
)

// CreateStudentNote - Students can create personal notes
func CreateStudentNote(c *gin.Context) {
	var req struct {
		Title    string `json:"title" binding:"required"`
		Category string `json:"category" binding:"required"`
		Color    string `json:"color" binding:"required"`
		Content  string `json:"content" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID := c.GetInt("user_id")
	userRole := c.GetString("user_role")

	// Only students can create notes
	if userRole != "student" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only students can create notes"})
		return
	}

	// Get API mode and subdomain info
	apiMode := c.GetString("api_mode")
	var subdomain *string
	var tenantID *int

	if apiMode == "complete" {
		// In complete mode, store the subdomain
		tenantSlug := c.GetString("tenant_slug")
		subdomain = &tenantSlug
		
		// Also store tenant ID for RLS
		if tid, exists := c.Get("tenant_id"); exists {
			if id, ok := tid.(int); ok {
				tenantID = &id
			}
		}
	}

	// Insert the note
	var noteID int
	insertQuery := `
		INSERT INTO student_notes (
			student_id, title, category, color, content, 
			subdomain, tenant_id, created_at
		) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
		RETURNING id
	`
	err := db.Pool.QueryRow(c.Request.Context(), insertQuery,
		userID, req.Title, req.Category, req.Color, req.Content,
		subdomain, tenantID,
	).Scan(&noteID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create note"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Note created successfully",
		"note_id": noteID,
	})
}

// GetStudentNotes - Get all notes for the current student
func GetStudentNotes(c *gin.Context) {
	userID := c.GetInt("user_id")
	userRole := c.GetString("user_role")

	// Only students can access notes
	if userRole != "student" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only students can access notes"})
		return
	}

	// Optional filters
	category := c.Query("category")
	subdomain := c.Query("subdomain")

	// Build query
	query := `
		SELECT 
			id, title, category, color, content, 
			subdomain, created_at, updated_at
		FROM student_notes
		WHERE student_id = $1
	`
	args := []interface{}{userID}
	argCount := 1

	if category != "" {
		argCount++
		query += " AND category = $" + strconv.Itoa(argCount)
		args = append(args, category)
	}

	if subdomain != "" {
		argCount++
		query += " AND subdomain = $" + strconv.Itoa(argCount)
		args = append(args, subdomain)
	}

	query += " ORDER BY created_at DESC"

	rows, err := db.Pool.Query(c.Request.Context(), query, args...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch notes"})
		return
	}
	defer rows.Close()

	var notes []gin.H
	for rows.Next() {
		var note struct {
			ID        int     `json:"id"`
			Title     string  `json:"title"`
			Category  string  `json:"category"`
			Color     string  `json:"color"`
			Content   string  `json:"content"`
			Subdomain *string `json:"subdomain"`
			CreatedAt string  `json:"created_at"`
			UpdatedAt string  `json:"updated_at"`
		}

		err := rows.Scan(
			&note.ID,
			&note.Title,
			&note.Category,
			&note.Color,
			&note.Content,
			&note.Subdomain,
			&note.CreatedAt,
			&note.UpdatedAt,
		)
		if err != nil {
			continue
		}

		notes = append(notes, gin.H{
			"id":        note.ID,
			"title":     note.Title,
			"category":  note.Category,
			"color":     note.Color,
			"content":   note.Content,
			"subdomain": note.Subdomain,
			"created_at": note.CreatedAt,
			"updated_at": note.UpdatedAt,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"notes": notes,
		"total": len(notes),
	})
}

// GetStudentNote - Get a specific note by ID
func GetStudentNote(c *gin.Context) {
	noteID := c.Param("note_id")
	userID := c.GetInt("user_id")
	userRole := c.GetString("user_role")

	// Only students can access notes
	if userRole != "student" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only students can access notes"})
		return
	}

	var note struct {
		ID        int     `json:"id"`
		Title     string  `json:"title"`
		Category  string  `json:"category"`
		Color     string  `json:"color"`
		Content   string  `json:"content"`
		Subdomain *string `json:"subdomain"`
		CreatedAt string  `json:"created_at"`
		UpdatedAt string  `json:"updated_at"`
	}

	query := `
		SELECT 
			id, title, category, color, content, 
			subdomain, created_at, updated_at
		FROM student_notes
		WHERE id = $1 AND student_id = $2
	`
	err := db.Pool.QueryRow(c.Request.Context(), query, noteID, userID).Scan(
		&note.ID,
		&note.Title,
		&note.Category,
		&note.Color,
		&note.Content,
		&note.Subdomain,
		&note.CreatedAt,
		&note.UpdatedAt,
	)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Note not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"note": note,
	})
}

// UpdateStudentNote - Update an existing note
func UpdateStudentNote(c *gin.Context) {
	noteID := c.Param("note_id")
	userID := c.GetInt("user_id")
	userRole := c.GetString("user_role")

	// Only students can update notes
	if userRole != "student" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only students can update notes"})
		return
	}

	var req struct {
		Title    string `json:"title" binding:"required"`
		Category string `json:"category" binding:"required"`
		Color    string `json:"color" binding:"required"`
		Content  string `json:"content" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check ownership and update
	updateQuery := `
		UPDATE student_notes
		SET title = $1, category = $2, color = $3, content = $4, updated_at = NOW()
		WHERE id = $5 AND student_id = $6
	`
	result, err := db.Pool.Exec(c.Request.Context(), updateQuery,
		req.Title, req.Category, req.Color, req.Content, noteID, userID,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update note"})
		return
	}

	if result.RowsAffected() == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Note not found or you don't have permission"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Note updated successfully",
	})
}

// DeleteStudentNote - Delete a note
func DeleteStudentNote(c *gin.Context) {
	noteID := c.Param("note_id")
	userID := c.GetInt("user_id")
	userRole := c.GetString("user_role")

	// Only students can delete notes
	if userRole != "student" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only students can delete notes"})
		return
	}

	// Delete the note (only if owned by the student)
	deleteQuery := "DELETE FROM student_notes WHERE id = $1 AND student_id = $2"
	result, err := db.Pool.Exec(c.Request.Context(), deleteQuery, noteID, userID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete note"})
		return
	}

	if result.RowsAffected() == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Note not found or you don't have permission"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Note deleted successfully",
	})
}

// GetNoteCategories - Get all unique categories for the student's notes
func GetNoteCategories(c *gin.Context) {
	userID := c.GetInt("user_id")
	userRole := c.GetString("user_role")

	// Only students can access this
	if userRole != "student" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only students can access note categories"})
		return
	}

	query := `
		SELECT DISTINCT category, COUNT(*) as count
		FROM student_notes
		WHERE student_id = $1
		GROUP BY category
		ORDER BY count DESC
	`

	rows, err := db.Pool.Query(c.Request.Context(), query, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch categories"})
		return
	}
	defer rows.Close()

	var categories []gin.H
	for rows.Next() {
		var category string
		var count int

		err := rows.Scan(&category, &count)
		if err != nil {
			continue
		}

		categories = append(categories, gin.H{
			"category": category,
			"count":    count,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"categories": categories,
	})
}
