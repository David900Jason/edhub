package workers

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"strconv"
	"strings"
	"time"

	"doroosy-backend/internal/db"
)

func StartExamWorker() {
	ticker := time.NewTicker(1 * time.Minute) // Check every minute
	defer ticker.Stop()

	log.Println("Exam auto-submit worker started")

	for {
		select {
		case <-ticker.C:
			if err := processExpiredExams(); err != nil {
				log.Printf("Error processing expired exams: %v", err)
			}
		}
	}
}

func processExpiredExams() error {
	ctx := context.Background()

	// Find expired exam attempts that haven't been submitted
	query := `
		SELECT id, tenant_id, student_id, exam_id, answers, started_at
		FROM exam_attempts 
		WHERE submitted_at IS NULL 
		AND started_at + INTERVAL '1 minute' * (
			SELECT duration_minutes FROM exams WHERE id = exam_attempts.exam_id
		) < NOW()
		FOR UPDATE SKIP LOCKED
		LIMIT 10
	`

	rows, err := db.Pool.Query(ctx, query)
	if err != nil {
		return fmt.Errorf("failed to query expired exams: %v", err)
	}
	defer rows.Close()

	for rows.Next() {
		var attemptID, tenantID, studentID, examID int
		var answersJSON []byte
		var startedAt time.Time

		err := rows.Scan(&attemptID, &tenantID, &studentID, &examID, &answersJSON, &startedAt)
		if err != nil {
			log.Printf("Error scanning expired exam row: %v", err)
			continue
		}

		// Process this expired exam
		if err := autoSubmitAndGradeExam(ctx, attemptID, tenantID, studentID, examID, answersJSON); err != nil {
			log.Printf("Error auto-submitting exam attempt %d: %v", attemptID, err)
		} else {
			log.Printf("Auto-submitted and graded exam attempt %d for student %d", attemptID, studentID)
		}
	}

	return rows.Err()
}

func autoSubmitAndGradeExam(ctx context.Context, attemptID, tenantID, studentID, examID int, answersJSON []byte) error {
	// Set tenant context
	_, err := db.Pool.Exec(ctx, "SELECT set_config('app.current_tenant_id', $1, true)", strconv.Itoa(tenantID))
	if err != nil {
		return fmt.Errorf("failed to set tenant context: %v", err)
	}

	// Parse answers
	var answers map[string]interface{}
	if len(answersJSON) > 0 {
		if err := json.Unmarshal(answersJSON, &answers); err != nil {
			return fmt.Errorf("failed to parse answers: %v", err)
		}
	} else {
		answers = make(map[string]interface{})
	}

	// Get exam questions
	questionsQuery := `
		SELECT id, question_type, correct_answer, points, tolerance
		FROM exam_questions 
		WHERE exam_id = $1 
		ORDER BY question_order
	`

	rows, err := db.Pool.Query(ctx, questionsQuery, examID)
	if err != nil {
		return fmt.Errorf("failed to get exam questions: %v", err)
	}
	defer rows.Close()

	var totalScore, maxScore float64
	var gradingResults []map[string]interface{}

	for rows.Next() {
		var questionID int
		var questionType, correctAnswer string
		var points int
		var tolerance *float64

		err := rows.Scan(&questionID, &questionType, &correctAnswer, &points, &tolerance)
		if err != nil {
			log.Printf("Error scanning question: %v", err)
			continue
		}

		maxScore += float64(points)

		// Get student's answer
		studentAnswer := ""
		if ans, exists := answers[strconv.Itoa(questionID)]; exists {
			if str, ok := ans.(string); ok {
				studentAnswer = str
			}
		}

		// Grade the question
		score := gradeQuestion(questionType, correctAnswer, studentAnswer, float64(points), tolerance)
		totalScore += score

		gradingResults = append(gradingResults, map[string]interface{}{
			"question_id":     questionID,
			"student_answer":  studentAnswer,
			"correct_answer":  correctAnswer,
			"points_earned":   score,
			"points_possible": points,
		})
	}

	// Calculate percentage
	percentage := float64(0)
	if maxScore > 0 {
		percentage = (totalScore / maxScore) * 100
	}

	// Update the exam attempt
	updateQuery := `
		UPDATE exam_attempts 
		SET submitted_at = NOW(),
		    score = $2,
		    max_score = $3,
		    percentage = $4,
		    grading_results = $5,
		    auto_submitted = true
		WHERE id = $1
	`

	gradingJSON, _ := json.Marshal(gradingResults)
	_, err = db.Pool.Exec(ctx, updateQuery, attemptID, totalScore, maxScore, percentage, gradingJSON)
	if err != nil {
		return fmt.Errorf("failed to update exam attempt: %v", err)
	}

	// Log the auto-submission
	auditQuery := `
		INSERT INTO audit_logs (tenant_id, user_id, action, resource_type, resource_id, details)
		VALUES ($1, $2, 'auto_submit_exam', 'exam_attempt', $3, $4)
	`

	auditDetails := map[string]interface{}{
		"exam_id":    examID,
		"score":      totalScore,
		"max_score":  maxScore,
		"percentage": percentage,
		"reason":     "time_expired",
	}
	auditJSON, _ := json.Marshal(auditDetails)

	_, err = db.Pool.Exec(ctx, auditQuery, tenantID, studentID, attemptID, auditJSON)
	if err != nil {
		log.Printf("Failed to log audit entry: %v", err)
	}

	return nil
}

func gradeQuestion(questionType, correctAnswer, studentAnswer string, maxPoints float64, tolerance *float64) float64 {
	if studentAnswer == "" {
		return 0
	}

	switch questionType {
	case "multiple_choice", "true_false":
		if strings.TrimSpace(strings.ToLower(studentAnswer)) == strings.TrimSpace(strings.ToLower(correctAnswer)) {
			return maxPoints
		}
		return 0

	case "multiple_select":
		// Parse both as JSON arrays and compare
		var correct, student []string
		if err := json.Unmarshal([]byte(correctAnswer), &correct); err != nil {
			return 0
		}
		if err := json.Unmarshal([]byte(studentAnswer), &student); err != nil {
			return 0
		}

		if len(correct) == 0 {
			return 0
		}

		matches := 0
		for _, c := range correct {
			for _, s := range student {
				if strings.TrimSpace(strings.ToLower(c)) == strings.TrimSpace(strings.ToLower(s)) {
					matches++
					break
				}
			}
		}

		// Partial credit: (matches / total_correct) * maxPoints
		return (float64(matches) / float64(len(correct))) * maxPoints

	case "numeric":
		correctNum, err1 := strconv.ParseFloat(strings.TrimSpace(correctAnswer), 64)
		studentNum, err2 := strconv.ParseFloat(strings.TrimSpace(studentAnswer), 64)

		if err1 != nil || err2 != nil {
			return 0
		}

		diff := correctNum - studentNum
		if diff < 0 {
			diff = -diff
		}

		if tolerance != nil && *tolerance > 0 {
			if diff <= *tolerance {
				return maxPoints
			}
		} else {
			if diff < 0.001 { // Default small tolerance
				return maxPoints
			}
		}
		return 0

	case "text", "essay":
		// Simple text comparison for now
		if strings.TrimSpace(strings.ToLower(studentAnswer)) == strings.TrimSpace(strings.ToLower(correctAnswer)) {
			return maxPoints
		}
		return 0

	default:
		return 0
	}
}
