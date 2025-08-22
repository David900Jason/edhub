import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db', 'db.json');

// GET /api/teacher/books/[id] - Get a single book
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const dbData = await fs.readFile(dbPath, 'utf8');
        const { books, courses, videos } = JSON.parse(dbData);
        
        const book = books.find((b: any) => b.id === id);
        
        if (!book) {
            return NextResponse.json(
                { error: "Book not found" },
                { status: 404 },
            );
        }

        // Enrich book with course and video data
        const course = courses.find((c: any) => c.id === book.course_id);
        const video = videos.find((v: any) => v.id === book.video_id);
        
        const enrichedBook = {
            ...book,
            course_title: course?.title || 'Unknown Course',
            video_title: video?.title || 'Unknown Video',
        };

        return NextResponse.json(enrichedBook);
    } catch (error) {
        console.error("Error fetching book:", error);
        return NextResponse.json(
            { error: "Failed to fetch book" },
            { status: 500 },
        );
    }
}

// PUT /api/teacher/books/[id] - Update a book
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const { title, src, course_id, video_id } = await request.json();
        
        const dbData = await fs.readFile(dbPath, 'utf8');
        const db = JSON.parse(dbData);
        
        const bookIndex = db.books.findIndex((b: any) => b.id === id);
        
        if (bookIndex === -1) {
            return NextResponse.json(
                { error: "Book not found" },
                { status: 404 },
            );
        }

        // Update book fields
        const updatedBook = {
            ...db.books[bookIndex],
            title: title !== undefined ? title : db.books[bookIndex].title,
            src: src !== undefined ? src : db.books[bookIndex].src,
            course_id: course_id !== undefined ? course_id : db.books[bookIndex].course_id,
            video_id: video_id !== undefined ? video_id : db.books[bookIndex].video_id,
            updated_at: new Date().toISOString(),
        };

        db.books[bookIndex] = updatedBook;
        await fs.writeFile(dbPath, JSON.stringify(db, null, 2));

        return NextResponse.json(updatedBook);
    } catch (error) {
        console.error("Error updating book:", error);
        return NextResponse.json(
            { error: "Failed to update book" },
            { status: 500 },
        );
    }
}

// DELETE /api/teacher/books/[id] - Delete a book
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        
        const dbData = await fs.readFile(dbPath, 'utf8');
        const db = JSON.parse(dbData);
        
        const bookIndex = db.books.findIndex((b: any) => b.id === id);
        
        if (bookIndex === -1) {
            return NextResponse.json(
                { error: "Book not found" },
                { status: 404 },
            );
        }

        // Remove book from array
        const deletedBook = db.books.splice(bookIndex, 1)[0];
        await fs.writeFile(dbPath, JSON.stringify(db, null, 2));

        return NextResponse.json({
            success: true,
            message: "Book deleted successfully",
            book: deletedBook,
        });
    } catch (error) {
        console.error("Error deleting book:", error);
        return NextResponse.json(
            { error: "Failed to delete book" },
            { status: 500 },
        );
    }
}
