# API Features Documentation

## API Modes

The API now supports two operational modes, configurable via the `API_MODE` environment variable:

### Simple Mode (`API_MODE=simple`)
- **Default mode**
- All teachers share the same platform
- No subdomain requirements
- Teachers are identified by their user ID
- Students can access all teachers' content from a single platform
- Suitable for smaller deployments or testing

### Complete Mode (`API_MODE=complete`)
- Each teacher has their own subdomain (e.g., `teacher1.doroosy.com`)
- Full tenant isolation
- Students access content through teacher-specific subdomains
- Enhanced data isolation and branding opportunities
- Suitable for production deployments with multiple independent teachers

## New Features

### 1. Video Comments System

Students can now comment on teacher videos with the following features:

#### Endpoints:
- `POST /api/comments/video` - Students create comments on videos
- `POST /api/comments/:comment_id/reply` - Teachers reply to comments (only video owner)
- `GET /api/comments/video/:item_id` - Get all comments for a video
- `DELETE /api/comments/:comment_id` - Delete own comments

#### Features:
- Students can comment with optional video timestamps
- Only the teacher who owns the video can reply to comments
- Hierarchical comment structure (replies to comments)
- Full comment history with author information

#### Request Examples:

**Create Comment (Student):**
```json
POST /api/comments/video
{
  "module_item_id": 123,
  "content": "Great explanation at this point!",
  "video_timestamp": 245,  // optional, in seconds
  "parent_comment_id": null  // optional, for nested comments
}
```

**Teacher Reply:**
```json
POST /api/comments/456/reply
{
  "content": "Thank you for your feedback!"
}
```

### 2. Student Notes System

Students can create personal notes with categorization and color coding:

#### Endpoints:
- `POST /api/notes` - Create a new note
- `GET /api/notes` - Get all notes (with optional filters)
- `GET /api/notes/:note_id` - Get specific note
- `PUT /api/notes/:note_id` - Update a note
- `DELETE /api/notes/:note_id` - Delete a note
- `GET /api/notes/categories` - Get all categories with counts

#### Features:
- Title, category, color, and content fields (all strings)
- In complete mode, notes store the subdomain where they were created
- Filter notes by category or subdomain
- Personal notes visible only to the creating student

#### Request Examples:

**Create Note:**
```json
POST /api/notes
{
  "title": "Important Concepts",
  "category": "Physics",
  "color": "#4CAF50",
  "content": "Newton's laws of motion..."
}
```

**Get Notes with Filters:**
```
GET /api/notes?category=Physics&subdomain=teacher1
```

**Update Note:**
```json
PUT /api/notes/789
{
  "title": "Updated Title",
  "category": "Mathematics",
  "color": "#2196F3",
  "content": "Updated content..."
}
```

## Mode Switching

### Configuration
Set the API mode in your `.env` file:
```env
# For simple mode (default)
API_MODE=simple

# For complete mode
API_MODE=complete
```

### Smooth Transition
The API is designed to handle mode switching without data loss:

1. **From Simple to Complete:**
   - Existing data remains accessible
   - Teachers can be assigned subdomains
   - Notes created in simple mode will have null subdomain field

2. **From Complete to Simple:**
   - All data remains intact
   - Subdomain information is preserved but not enforced
   - Teachers identified by headers or query parameters

### Simple Mode Teacher Access
In simple mode, teachers can be accessed via:
- Header: `X-Teacher-Slug: teacher1`
- Query parameter: `?teacher=teacher1`

## Database Schema

### Video Comments Table
```sql
CREATE TABLE video_comments (
  id BIGSERIAL PRIMARY KEY,
  module_item_id BIGINT NOT NULL,
  student_id BIGINT,
  teacher_id BIGINT,
  parent_comment_id BIGINT,
  content TEXT NOT NULL,
  video_timestamp INTEGER,
  is_teacher_reply BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);
```

### Student Notes Table
```sql
CREATE TABLE student_notes (
  id BIGSERIAL PRIMARY KEY,
  student_id BIGINT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  color TEXT NOT NULL,
  content TEXT NOT NULL,
  subdomain TEXT,  -- Populated in complete mode
  tenant_id BIGINT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);
```

## Security & Permissions

### Comment Permissions:
- **Students:** Can create comments on any video they have access to
- **Teachers:** Can only reply to comments on videos they own
- **All users:** Can delete only their own comments

### Note Permissions:
- **Students:** Full CRUD on their own notes only
- **Teachers:** Cannot access student notes
- **Admin:** Not implemented in current version

## Migration Guide

### Running Migrations
```bash
# Apply the new migrations
psql $DATABASE_URL < migrations/0002_comments_notes.sql
```

### Environment Variables
Add to your `.env`:
```env
API_MODE=simple  # or "complete"
```

## Testing

### Test Simple Mode:
```bash
# Set API_MODE=simple in .env
# Access API without subdomains
curl http://localhost:8080/api/health
```

### Test Complete Mode:
```bash
# Set API_MODE=complete in .env
# Access with subdomain
curl http://teacher1.localhost:8080/api/health
```

## Error Handling

The API provides clear error messages for:
- Invalid API mode configuration
- Missing subdomain in complete mode
- Unauthorized comment replies
- Invalid note operations
- Mode-specific validation errors

## Performance Considerations

- Comments are indexed by `module_item_id` for fast retrieval
- Notes are indexed by `student_id` and `category`
- Subdomain lookup uses cached tenant information
- Row-level security (RLS) ensures data isolation in complete mode

## Future Enhancements

Potential improvements for future versions:
- Rich text formatting for comments and notes
- Comment reactions/likes
- Note sharing between students (with permissions)
- Export notes to PDF/Markdown
- Real-time comment notifications
- Note templates
- Advanced search across notes
