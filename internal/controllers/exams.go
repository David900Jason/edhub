package controllers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
	"time"

	"doroosy-backend/internal/db"
	"github.com/gin-gonic/gin"
)

func StartExam(c *gin.Context) {
	examID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid exam ID"})
		return
	}

	userID := c.GetInt("user_id")
	tenantID := c.GetInt("tenant_id")

	// Check if exam exists and get details
	var id, durationMinutes, maxAttempts int
	var title, description string
	var published bool

	examQuery := `
		SELECT id, title, description, duration_minutes, max_attempts, published
		FROM exams 
		WHERE id = $1 AND tenant_id = $2 AND published = true
	`

	err = db.Pool.QueryRow(c.Request.Context(), examQuery, examID, tenantID).Scan(
		&id, &title, &description, &durationMinutes, &maxAttempts, &published)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Exam not found"})
		return
	}

	// Check attempt count
	var attemptCount int
	countQuery := "SELECT COUNT(*) FROM exam_attempts WHERE exam_id = $1 AND student_id = $2 AND tenant_id = $3"
	db.Pool.QueryRow(c.Request.Context(), countQuery, examID, userID, tenantID).Scan(&attemptCount)

	if attemptCount >= maxAttempts {
		c.JSON(http.StatusForbidden, gin.H{"error": "Maximum attempts exceeded"})
		return
	}

	// Create new attempt
	var attemptID int
	var startedAt time.Time
	insertQuery := `
		INSERT INTO exam_attempts (exam_id, student_id, tenant_id, started_at, answers)
		VALUES ($1, $2, $3, NOW(), '{}')
		RETURNING id, started_at
	`

	err = db.Pool.QueryRow(c.Request.Context(), insertQuery, examID, userID, tenantID).Scan(&attemptID, &startedAt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start exam"})
		return
	}

	// Get questions
	questionsQuery := `
		SELECT id, question_text, question_type, options, question_order
		FROM exam_questions 
		WHERE exam_id = $1 
		ORDER BY question_order
	`

	rows, err := db.Pool.Query(c.Request.Context(), questionsQuery, examID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get questions"})
		return
	}
	defer rows.Close()

	var questions []gin.H
	for rows.Next() {
		var qID, order int
		var text, qType string
		var options []byte

		err := rows.Scan(&qID, &text, &qType, &options, &order)
		if err != nil {
			continue
		}

		question := gin.H{
			"id": qID,
			"question": text,
			"type": qType,
			"order": order,
		}

		if len(options) > 0 {
			var opts []string
			json.Unmarshal(options, &opts)
			question["options"] = opts
		}

		questions = append(questions, question)
	}

	c.JSON(http.StatusOK, gin.H{
		"attempt_id": attemptID,
		"exam": gin.H{
			"id": id,
			"title": title,
			"description": description,
			"duration_minutes": durationMinutes,
		},
		"questions": questions,
		"started_at": startedAt,
		"expires_at": startedAt.Add(time.Duration(durationMinutes) * time.Minute),
	})
}

func SubmitExam(c *gin.Context) {
	var req struct {
		AttemptID int                    `json:"attempt_id" binding:"required"`
		Answers   map[string]interface{} `json:"answers" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID := c.GetInt("user_id")
	tenantID := c.GetInt("tenant_id")

	// Verify attempt belongs to user and is not submitted
	var examID int
	var startedAt time.Time
	var durationMinutes int

	checkQuery := `
		SELECT ea.exam_id, ea.started_at, e.duration_minutes
		FROM exam_attempts ea
		JOIN exams e ON e.id = ea.exam_id
		WHERE ea.id = $1 AND ea.student_id = $2 AND ea.tenant_id = $3 AND ea.submitted_at IS NULL
	`

	err := db.Pool.QueryRow(c.Request.Context(), checkQuery, req.AttemptID, userID, tenantID).Scan(&examID, &startedAt, &durationMinutes)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Exam attempt not found or already submitted"})
		return
	}

	// Check if time expired
	expiresAt := startedAt.Add(time.Duration(durationMinutes) * time.Minute)
	if time.Now().After(expiresAt) {
		c.JSON(http.StatusForbidden, gin.H{"error": "Exam time has expired"})
		return
	}

	// Grade the exam (simplified)
	var totalScore, maxScore float64 = 0, 0

	// Get questions and grade
	questionsQuery := `
		SELECT id, question_type, correct_answer, points
		FROM exam_questions 
		WHERE exam_id = $1
	`

	rows, err := db.Pool.Query(c.Request.Context(), questionsQuery, examID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to grade exam"})
		return
	}
	defer rows.Close()

	for rows.Next() {
		var qID int
		var qType, correctAnswer string
		var points int

		err := rows.Scan(&qID, &qType, &correctAnswer, &points)
		if err != nil {
			continue
		}

		maxScore += float64(points)

		// Get student answer
		if studentAnswer, exists := req.Answers[strconv.Itoa(qID)]; exists {
			if answerStr, ok := studentAnswer.(string); ok {
				if strings.TrimSpace(strings.ToLower(answerStr)) == strings.TrimSpace(strings.ToLower(correctAnswer)) {
					totalScore += float64(points)
				}
			}
		}
	}

	// Calculate percentage
	percentage := float64(0)
	if maxScore > 0 {
		percentage = (totalScore / maxScore) * 100
	}

	// Update attempt
	answersJSON, _ := json.Marshal(req.Answers)
	updateQuery := `
		UPDATE exam_attempts 
		SET submitted_at = NOW(), 
		    answers = $2, 
		    score = $3, 
		    max_score = $4, 
		    percentage = $5
		WHERE id = $1
	`

	_, err = db.Pool.Exec(c.Request.Context(), updateQuery, req.AttemptID, answersJSON, totalScore, maxScore, percentage)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to submit exam"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Exam submitted successfully",
		"score": totalScore,
		"max_score": maxScore,
		"percentage": percentage,
	})
}

func GetExamAttempt(c *gin.Context) {
	attemptID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid attempt ID"})
		return
	}

	userID := c.GetInt("user_id")

	query := `
		SELECT ea.id, ea.exam_id, ea.score, ea.max_score, ea.percentage, 
		       ea.started_at, ea.submitted_at, e.title
		FROM exam_attempts ea
		JOIN exams e ON e.id = ea.exam_id
		WHERE ea.id = $1 AND ea.student_id = $2
	`

	var attempt gin.H = make(gin.H)
	var id, examID int
	var score, maxScore, percentage float64
	var startedAt, submittedAt *time.Time
	var examTitle string

	err = db.Pool.QueryRow(c.Request.Context(), query, attemptID, userID).Scan(
		&id, &examID, &score, &maxScore, &percentage, &startedAt, &submittedAt, &examTitle)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Attempt not found"})
		return
	}

	attempt["id"] = id
	attempt["exam_id"] = examID
	attempt["exam_title"] = examTitle
	attempt["score"] = score
	attempt["max_score"] = maxScore
	attempt["percentage"] = percentage
	attempt["started_at"] = startedAt
	attempt["submitted_at"] = submittedAt

	c.JSON(http.StatusOK, gin.H{"attempt": attempt})
}
