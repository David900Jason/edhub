package controllers

import (
	"net/http"
	"strconv"

	"doroosy-backend/internal/db"
	"github.com/gin-gonic/gin"
)

// CreateVideoComment - Students can comment on videos
func CreateVideoComment(c *gin.Context) {
	var req struct {
		ModuleItemID    int    `json:"module_item_id" binding:"required"`
		Content         string `json:"content" binding:"required"`
		VideoTimestamp  *int   `json:"video_timestamp"` // Optional
		ParentCommentID *int   `json:"parent_comment_id"` // For replies
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID := c.GetInt("user_id")
	userRole := c.GetString("user_role")

	// Check if the module item exists and is a video
	var itemType string
	checkQuery := "SELECT type FROM module_items WHERE id = $1"
	err := db.Pool.QueryRow(c.Request.Context(), checkQuery, req.ModuleItemID).Scan(&itemType)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Video not found"})
		return
	}

	if itemType != "video" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Comments are only allowed on videos"})
		return
	}

	// Students can only comment, not reply as teachers
	if userRole != "student" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only students can create comments"})
		return
	}

	// Insert the comment
	var commentID int
	insertQuery := `
		INSERT INTO video_comments (
			module_item_id, student_id, content, video_timestamp, 
			parent_comment_id, is_teacher_reply, created_at
		) VALUES ($1, $2, $3, $4, $5, false, NOW())
		RETURNING id
	`
	err = db.Pool.QueryRow(c.Request.Context(), insertQuery,
		req.ModuleItemID, userID, req.Content, req.VideoTimestamp, req.ParentCommentID,
	).Scan(&commentID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create comment"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Comment created successfully",
		"comment_id": commentID,
	})
}

// CreateTeacherReply - Only video owner (teacher) can reply to comments
func CreateTeacherReply(c *gin.Context) {
	commentID := c.Param("comment_id")
	
	var req struct {
		Content string `json:"content" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID := c.GetInt("user_id")
	userRole := c.GetString("user_role")

	if userRole != "teacher" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only teachers can reply to comments"})
		return
	}

	// Get the original comment's module item
	var moduleItemID int
	var courseID int
	checkQuery := `
		SELECT vc.module_item_id, mi.course_id
		FROM video_comments vc
		JOIN module_items mi ON vc.module_item_id = mi.id
		WHERE vc.id = $1
	`
	err := db.Pool.QueryRow(c.Request.Context(), checkQuery, commentID).Scan(&moduleItemID, &courseID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Comment not found"})
		return
	}

	// Check if the teacher owns the course
	var ownerID int
	ownerQuery := `
		SELECT t.owner_user_id
		FROM courses c
		JOIN tenants t ON c.tenant_id = t.id
		WHERE c.id = $1
	`
	err = db.Pool.QueryRow(c.Request.Context(), ownerQuery, courseID).Scan(&ownerID)
	if err != nil || ownerID != userID {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only the video owner can reply"})
		return
	}

	// Insert the teacher reply
	parentID, _ := strconv.Atoi(commentID)
	var replyID int
	insertQuery := `
		INSERT INTO video_comments (
			module_item_id, teacher_id, content, 
			parent_comment_id, is_teacher_reply, created_at
		) VALUES ($1, $2, $3, $4, true, NOW())
		RETURNING id
	`
	err = db.Pool.QueryRow(c.Request.Context(), insertQuery,
		moduleItemID, userID, req.Content, parentID,
	).Scan(&replyID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create reply"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Reply created successfully",
		"reply_id": replyID,
	})
}

// GetVideoComments - Get all comments for a video
func GetVideoComments(c *gin.Context) {
	moduleItemID := c.Param("item_id")

	// Get comments with user info
	query := `
		SELECT 
			vc.id,
			vc.content,
			vc.video_timestamp,
			vc.is_teacher_reply,
			vc.parent_comment_id,
			vc.created_at,
			COALESCE(s.display_name, t.display_name) as author_name,
			CASE 
				WHEN vc.is_teacher_reply THEN 'teacher'
				ELSE 'student'
			END as author_role,
			COALESCE(vc.student_id, vc.teacher_id) as author_id
		FROM video_comments vc
		LEFT JOIN users s ON vc.student_id = s.id
		LEFT JOIN users t ON vc.teacher_id = t.id
		WHERE vc.module_item_id = $1
		ORDER BY vc.created_at ASC
	`

	rows, err := db.Pool.Query(c.Request.Context(), query, moduleItemID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch comments"})
		return
	}
	defer rows.Close()

	var comments []gin.H
	for rows.Next() {
		var comment struct {
			ID              int     `json:"id"`
			Content         string  `json:"content"`
			VideoTimestamp  *int    `json:"video_timestamp"`
			IsTeacherReply  bool    `json:"is_teacher_reply"`
			ParentCommentID *int    `json:"parent_comment_id"`
			CreatedAt       string  `json:"created_at"`
			AuthorName      string  `json:"author_name"`
			AuthorRole      string  `json:"author_role"`
			AuthorID        int     `json:"author_id"`
		}

		err := rows.Scan(
			&comment.ID,
			&comment.Content,
			&comment.VideoTimestamp,
			&comment.IsTeacherReply,
			&comment.ParentCommentID,
			&comment.CreatedAt,
			&comment.AuthorName,
			&comment.AuthorRole,
			&comment.AuthorID,
		)
		if err != nil {
			continue
		}

		comments = append(comments, gin.H{
			"id":                comment.ID,
			"content":           comment.Content,
			"video_timestamp":   comment.VideoTimestamp,
			"is_teacher_reply":  comment.IsTeacherReply,
			"parent_comment_id": comment.ParentCommentID,
			"created_at":        comment.CreatedAt,
			"author_name":       comment.AuthorName,
			"author_role":       comment.AuthorRole,
			"author_id":         comment.AuthorID,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"comments": comments,
		"total":    len(comments),
	})
}

// DeleteVideoComment - Users can delete their own comments
func DeleteVideoComment(c *gin.Context) {
	commentID := c.Param("comment_id")
	userID := c.GetInt("user_id")

	// Check ownership
	var ownerID int
	var isTeacherReply bool
	checkQuery := `
		SELECT 
			COALESCE(student_id, teacher_id),
			is_teacher_reply
		FROM video_comments 
		WHERE id = $1
	`
	err := db.Pool.QueryRow(c.Request.Context(), checkQuery, commentID).Scan(&ownerID, &isTeacherReply)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Comment not found"})
		return
	}

	if ownerID != userID {
		c.JSON(http.StatusForbidden, gin.H{"error": "You can only delete your own comments"})
		return
	}

	// Delete the comment (cascades to replies)
	deleteQuery := "DELETE FROM video_comments WHERE id = $1"
	_, err = db.Pool.Exec(c.Request.Context(), deleteQuery, commentID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete comment"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Comment deleted successfully",
	})
}
