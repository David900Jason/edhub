# Doroosy API Test Requests

This document contains curl requests to test all functionality of the Doroosy API.

## Prerequisites

1. Ensure the backend server is running on `http://localhost:8080`
2. Install jq for JSON parsing: `sudo apt-get install jq` (optional but recommended)

## 1. Health Check

```bash
curl -X GET "http://localhost:8080/health"
```

## 2. Authentication

### Register Teacher

```bash
curl -X POST "http://localhost:8080/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teacher@example.com",
    "password": "SecurePass123!",
    "display_name": "Test Teacher",
    "role": "teacher"
  }'
```

### Register Student

```bash
curl -X POST "http://localhost:8080/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "SecurePass123!",
    "display_name": "Test Student",
    "role": "student"
  }'
```

### Login Teacher

```bash
curl -X POST "http://localhost:8080/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teacher@example.com",
    "password": "SecurePass123!"
  }'
```

### Login Student

```bash
curl -X POST "http://localhost:8080/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "SecurePass123!"
  }'
```

## 3. Courses

### Create Course (Teacher)

```bash
curl -X POST "http://localhost:8080/courses" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TEACHER_TOKEN" \
  -d '{
    "title": "Test Course",
    "description": "This is a test course"
  }'
```

### List Courses

```bash
curl -X GET "http://localhost:8080/courses" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"
```

### Get Specific Course

```bash
curl -X GET "http://localhost:8080/courses/COURSE_ID" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"
```

### Update Course (Teacher)

```bash
curl -X PUT "http://localhost:8080/courses/COURSE_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TEACHER_TOKEN" \
  -d '{
    "title": "Updated Test Course",
    "description": "This is an updated test course"
  }'
```

### Delete Course (Teacher)

```bash
curl -X DELETE "http://localhost:8080/courses/COURSE_ID" \
  -H "Authorization: Bearer YOUR_TEACHER_TOKEN"
```

## 4. Videos

### Create Video in Course (Teacher)

```bash
curl -X POST "http://localhost:8080/courses/COURSE_ID/videos" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TEACHER_TOKEN" \
  -d '{
    "title": "Test Video",
    "description": "This is a test video",
    "url": "https://example.com/video.mp4",
    "duration": 300,
    "position_id": 1
  }'
```

### List Videos in Course

```bash
curl -X GET "http://localhost:8080/courses/COURSE_ID/videos" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"
```

### Update Video (Teacher)

```bash
curl -X PUT "http://localhost:8080/courses/videos/VIDEO_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TEACHER_TOKEN" \
  -d '{
    "title": "Updated Test Video",
    "description": "This is an updated test video",
    "url": "https://example.com/updated-video.mp4",
    "duration": 350
  }'
```

### Delete Video (Teacher)

```bash
curl -X DELETE "http://localhost:8080/courses/videos/VIDEO_ID" \
  -H "Authorization: Bearer YOUR_TEACHER_TOKEN"
```

### Update Video Progress (Student)

```bash
curl -X POST "http://localhost:8080/courses/videos/VIDEO_ID/progress" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN" \
  -d '{
    "progress_percentage": 50,
    "current_position": 150
  }'
```

### Reorder Videos in Course (Teacher)

```bash
curl -X POST "http://localhost:8080/courses/COURSE_ID/videos/reorder" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TEACHER_TOKEN" \
  -d '{
    "video_ids": ["VIDEO_ID_1", "VIDEO_ID_2", "VIDEO_ID_3"]
  }'
```

## 5. Quizzes

### Create Quiz in Course (Teacher)

```bash
curl -X POST "http://localhost:8080/courses/COURSE_ID/quizzes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TEACHER_TOKEN" \
  -d '{
    "title": "Test Quiz",
    "description": "This is a test quiz",
    "passing_score": 70,
    "max_attempts": 3,
    "position_id": 1
  }'
```

### List Quizzes in Course

```bash
curl -X GET "http://localhost:8080/courses/COURSE_ID/quizzes" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"
```

### Get Quiz Questions

```bash
curl -X GET "http://localhost:8080/courses/quizzes/QUIZ_ID/questions" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"
```

### Start Quiz Attempt (Student)

```bash
curl -X POST "http://localhost:8080/courses/quizzes/QUIZ_ID/start" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"
```

### Submit Quiz Attempt (Student)

```bash
curl -X POST "http://localhost:8080/courses/quiz-attempts/ATTEMPT_ID/submit" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN" \
  -d '{
    "answers": [
      {"question_id": "QUESTION_ID_1", "answer": "Option A"},
      {"question_id": "QUESTION_ID_2", "answer": "Option B"}
    ]
  }'
```

### Reorder Quizzes in Course (Teacher)

```bash
curl -X POST "http://localhost:8080/courses/COURSE_ID/quizzes/reorder" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TEACHER_TOKEN" \
  -d '{
    "quiz_ids": ["QUIZ_ID_1", "QUIZ_ID_2", "QUIZ_ID_3"]
  }'
```

## 6. Books

### Create Book in Video (Teacher)

```bash
curl -X POST "http://localhost:8080/videos/VIDEO_ID/books" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TEACHER_TOKEN" \
  -d '{
    "title": "Test Book",
    "description": "This is a test book",
    "url": "https://example.com/book.pdf",
    "pages": 50,
    "position_id": 1
  }'
```

### List Books in Video

```bash
curl -X GET "http://localhost:8080/videos/VIDEO_ID/books" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"
```

### Update Book (Teacher)

```bash
curl -X PUT "http://localhost:8080/videos/books/BOOK_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TEACHER_TOKEN" \
  -d '{
    "title": "Updated Test Book",
    "description": "This is an updated test book",
    "url": "https://example.com/updated-book.pdf",
    "pages": 60
  }'
```

### Delete Book (Teacher)

```bash
curl -X DELETE "http://localhost:8080/videos/books/BOOK_ID" \
  -H "Authorization: Bearer YOUR_TEACHER_TOKEN"
```

### Update Book Progress (Student)

```bash
curl -X POST "http://localhost:8080/videos/books/BOOK_ID/progress" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN" \
  -d '{
    "progress_percentage": 75,
    "current_page": 38
  }'
```

### Reorder Books in Video (Teacher)

```bash
curl -X POST "http://localhost:8080/videos/VIDEO_ID/books/reorder" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TEACHER_TOKEN" \
  -d '{
    "book_ids": ["BOOK_ID_1", "BOOK_ID_2", "BOOK_ID_3"]
  }'
```

## 7. Exams

### Create Exam (Teacher)

```bash
curl -X POST "http://localhost:8080/teacher/exams" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TEACHER_TOKEN" \
  -d '{
    "title": "Test Exam",
    "description": "This is a test exam",
    "passing_score": 75,
    "max_attempts": 2,
    "position_id": 1
  }'
```

### List Teacher's Exams

```bash
curl -X GET "http://localhost:8080/teacher/TEACHER_ID/exams" \
  -H "Authorization: Bearer YOUR_TEACHER_TOKEN"
```

### Update Exam (Teacher)

```bash
curl -X PUT "http://localhost:8080/teacher/exams/EXAM_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TEACHER_TOKEN" \
  -d '{
    "title": "Updated Test Exam",
    "description": "This is an updated test exam",
    "passing_score": 80,
    "max_attempts": 3
  }'
```

### Delete Exam (Teacher)

```bash
curl -X DELETE "http://localhost:8080/teacher/exams/EXAM_ID" \
  -H "Authorization: Bearer YOUR_TEACHER_TOKEN"
```

### Get Exam Questions

```bash
curl -X GET "http://localhost:8080/exams/questions/EXAM_ID" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"
```

### Start Exam Attempt (Student)

```bash
curl -X POST "http://localhost:8080/exams/EXAM_ID/attempt" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"
```

### Submit Exam Attempt (Student)

```bash
curl -X POST "http://localhost:8080/exams/attempts/ATTEMPT_ID/submit" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN" \
  -d '{
    "answers": [
      {"question_id": "QUESTION_ID_1", "answer": "Option A"},
      {"question_id": "QUESTION_ID_2", "answer": "Option B"}
    ]
  }'
```

### Reorder Teacher's Exams (Teacher)

```bash
curl -X POST "http://localhost:8080/teacher/exams/reorder" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TEACHER_TOKEN" \
  -d '{
    "exam_ids": ["EXAM_ID_1", "EXAM_ID_2", "EXAM_ID_3"]
  }'
```

## 8. Wallet (Student)

### Get Wallet

```bash
curl -X GET "http://localhost:8080/wallet" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"
```

### Top Up Wallet

```bash
curl -X POST "http://localhost:8080/wallet/topup" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN" \
  -d '{
    "amount": 100.00
  }'
```

### Purchase Course

```bash
curl -X POST "http://localhost:8080/wallet/purchase" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN" \
  -d '{
    "course_id": "COURSE_ID"
  }'
```

## 9. Activity Tracking (Student)

### Start Video Tracking

```bash
curl -X POST "http://localhost:8080/tracking/video/start" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN" \
  -d '{
    "video_id": "VIDEO_ID"
  }'
```

### Update Video Progress

```bash
curl -X PUT "http://localhost:8080/tracking/video/update" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN" \
  -d '{
    "video_id": "VIDEO_ID",
    "progress_percentage": 25,
    "current_position": 75
  }'
```

### Start PDF Tracking

```bash
curl -X POST "http://localhost:8080/tracking/pdf/start" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN" \
  -d '{
    "book_id": "BOOK_ID"
  }'
```

### Update PDF Progress

```bash
curl -X PUT "http://localhost:8080/tracking/pdf/update" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN" \
  -d '{
    "book_id": "BOOK_ID",
    "progress_percentage": 50,
    "current_page": 25
  }'
```

### Get Student Activity

```bash
curl -X GET "http://localhost:8080/tracking/activity" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"
```

## 10. Comments

### Create Video Comment (Student)

```bash
curl -X POST "http://localhost:8080/comments/video" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN" \
  -d '{
    "item_id": "VIDEO_ID",
    "content": "This is a test comment"
  }'
```

### Create Teacher Reply (Teacher)

```bash
curl -X POST "http://localhost:8080/comments/COMMENT_ID/reply" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TEACHER_TOKEN" \
  -d '{
    "content": "This is a teacher reply"
  }'
```

### Get Video Comments

```bash
curl -X GET "http://localhost:8080/comments/video/VIDEO_ID" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"
```

### Delete Comment

```bash
curl -X DELETE "http://localhost:8080/comments/COMMENT_ID" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"
```

## 11. Notes (Student)

### Create Student Note

```bash
curl -X POST "http://localhost:8080/notes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN" \
  -d '{
    "title": "Test Note",
    "content": "This is a test note",
    "category": "General"
  }'
```

### Get Student Notes

```bash
curl -X GET "http://localhost:8080/notes" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"
```

### Get Specific Note

```bash
curl -X GET "http://localhost:8080/notes/NOTE_ID" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"
```

### Update Student Note

```bash
curl -X PUT "http://localhost:8080/notes/NOTE_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN" \
  -d '{
    "title": "Updated Test Note",
    "content": "This is an updated test note",
    "category": "Updated"
  }'
```

### Delete Student Note

```bash
curl -X DELETE "http://localhost:8080/notes/NOTE_ID" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"
```

### Get Note Categories

```bash
curl -X GET "http://localhost:8080/notes/categories" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"
```

## Tips

1. Replace `YOUR_TEACHER_TOKEN` and `YOUR_STUDENT_TOKEN` with actual JWT tokens obtained from login
2. Replace `COURSE_ID`, `VIDEO_ID`, `QUIZ_ID`, `BOOK_ID`, `EXAM_ID`, `ATTEMPT_ID`, `QUESTION_ID`, `COMMENT_ID`, and `NOTE_ID` with actual IDs from your API responses
3. Use `| jq '.'` at the end of curl commands to format JSON responses
4. Use `-v` flag with curl to see detailed request/response information
