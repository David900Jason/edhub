package controllers

import (
	"net/http"
	"strconv"
	"time"

	"doroosy-backend/internal/db"
	"github.com/gin-gonic/gin"
)

func StartVideoTracking(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	tenantID, exists := c.Get("tenant_id")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Tenant context required"})
		return
	}

	var req struct {
		ModuleItemID int `json:"module_item_id" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	query := `
		INSERT INTO video_views (student_id, tenant_id, module_item_id, started_at, last_position, total_watch_time)
		VALUES ($1, $2, $3, NOW(), 0, 0)
		ON CONFLICT (student_id, tenant_id, module_item_id) 
		DO UPDATE SET started_at = NOW(), last_position = 0
		RETURNING id, started_at
	`

	var viewID int
	var startedAt time.Time
	err := db.Pool.QueryRow(c.Request.Context(), query, userID, tenantID, req.ModuleItemID).Scan(&viewID, &startedAt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start video tracking"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"view_id": viewID,
		"started_at": startedAt,
		"message": "Video tracking started",
	})
}

func UpdateVideoProgress(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	var req struct {
		ViewID         int `json:"view_id" binding:"required"`
		CurrentTime    int `json:"current_time" binding:"required"`
		WatchDuration  int `json:"watch_duration" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	query := `
		UPDATE video_views 
		SET last_position = $2, 
		    total_watch_time = total_watch_time + $3,
		    updated_at = NOW()
		WHERE id = $1 AND student_id = $4
		RETURNING total_watch_time
	`

	var totalWatchTime int
	err := db.Pool.QueryRow(c.Request.Context(), query, req.ViewID, req.CurrentTime, req.WatchDuration, userID).Scan(&totalWatchTime)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update video progress"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"total_watch_time": totalWatchTime,
		"message": "Progress updated",
	})
}

func StartPDFTracking(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	tenantID, exists := c.Get("tenant_id")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Tenant context required"})
		return
	}

	var req struct {
		ModuleItemID int `json:"module_item_id" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	query := `
		INSERT INTO pdf_views (student_id, tenant_id, module_item_id, started_at, current_page, total_read_time)
		VALUES ($1, $2, $3, NOW(), 1, 0)
		ON CONFLICT (student_id, tenant_id, module_item_id) 
		DO UPDATE SET started_at = NOW(), current_page = 1
		RETURNING id, started_at
	`

	var viewID int
	var startedAt time.Time
	err := db.Pool.QueryRow(c.Request.Context(), query, userID, tenantID, req.ModuleItemID).Scan(&viewID, &startedAt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start PDF tracking"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"view_id": viewID,
		"started_at": startedAt,
		"message": "PDF tracking started",
	})
}

func UpdatePDFProgress(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	var req struct {
		ViewID       int `json:"view_id" binding:"required"`
		CurrentPage  int `json:"current_page" binding:"required"`
		ReadDuration int `json:"read_duration" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	query := `
		UPDATE pdf_views 
		SET current_page = $2, 
		    total_read_time = total_read_time + $3,
		    updated_at = NOW()
		WHERE id = $1 AND student_id = $4
		RETURNING total_read_time
	`

	var totalReadTime int
	err := db.Pool.QueryRow(c.Request.Context(), query, req.ViewID, req.CurrentPage, req.ReadDuration, userID).Scan(&totalReadTime)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update PDF progress"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"total_read_time": totalReadTime,
		"message": "Progress updated",
	})
}

func GetStudentActivity(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	userRole, _ := c.Get("user_role")
	tenantID, _ := c.Get("tenant_id")

	// If teacher, they can specify student_id, otherwise use their own
	studentID := userID
	if userRole == "teacher" {
		if id := c.Query("student_id"); id != "" {
			if parsed, err := strconv.Atoi(id); err == nil {
				studentID = parsed
			}
		}
	}

	// Get video activity
	videoQuery := `
		SELECT mi.title, mi.content_type, vv.total_watch_time, vv.last_position, vv.started_at, vv.updated_at
		FROM video_views vv
		JOIN module_items mi ON mi.id = vv.module_item_id
		WHERE vv.student_id = $1 AND vv.tenant_id = $2
		ORDER BY vv.updated_at DESC
	`

	videoRows, err := db.Pool.Query(c.Request.Context(), videoQuery, studentID, tenantID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get video activity"})
		return
	}
	defer videoRows.Close()

	var videoActivity []map[string]interface{}
	for videoRows.Next() {
		var title, contentType string
		var totalWatchTime, lastPosition int
		var startedAt, updatedAt time.Time

		err := videoRows.Scan(&title, &contentType, &totalWatchTime, &lastPosition, &startedAt, &updatedAt)
		if err != nil {
			continue
		}

		videoActivity = append(videoActivity, map[string]interface{}{
			"title": title,
			"content_type": contentType,
			"total_watch_time": totalWatchTime,
			"last_position": lastPosition,
			"started_at": startedAt,
			"updated_at": updatedAt,
		})
	}

	// Get PDF activity
	pdfQuery := `
		SELECT mi.title, mi.content_type, pv.total_read_time, pv.current_page, pv.started_at, pv.updated_at
		FROM pdf_views pv
		JOIN module_items mi ON mi.id = pv.module_item_id
		WHERE pv.student_id = $1 AND pv.tenant_id = $2
		ORDER BY pv.updated_at DESC
	`

	pdfRows, err := db.Pool.Query(c.Request.Context(), pdfQuery, studentID, tenantID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get PDF activity"})
		return
	}
	defer pdfRows.Close()

	var pdfActivity []map[string]interface{}
	for pdfRows.Next() {
		var title, contentType string
		var totalReadTime, currentPage int
		var startedAt, updatedAt time.Time

		err := pdfRows.Scan(&title, &contentType, &totalReadTime, &currentPage, &startedAt, &updatedAt)
		if err != nil {
			continue
		}

		pdfActivity = append(pdfActivity, map[string]interface{}{
			"title": title,
			"content_type": contentType,
			"total_read_time": totalReadTime,
			"current_page": currentPage,
			"started_at": startedAt,
			"updated_at": updatedAt,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"student_id": studentID,
		"video_activity": videoActivity,
		"pdf_activity": pdfActivity,
	})
}
