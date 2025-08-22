import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db', 'db.json');

// GET /api/teacher/books - Get all books
export async function GET() {
    try {
        const dbData = await fs.readFile(dbPath, 'utf8');
        const { books, courses, videos } = JSON.parse(dbData);

        // Enrich books with course and video data
        const enrichedBooks = books.map((book: any) => {
            const course = courses.find((c: any) => c.id === book.course_id);
            const video = videos.find((v: any) => v.id === book.video_id);
            
            return {
                ...book,
                course_title: course?.title || 'Unknown Course',
                video_title: video?.title || 'Unknown Video',
            };
        });

        return NextResponse.json(enrichedBooks);
    } catch (error) {
        console.error("Error fetching books:", error);
        return NextResponse.json(
            { error: "Failed to fetch books" },
            { status: 500 },
        );
    }
}

// POST /api/teacher/books - Create a new book
export async function POST(request: Request) {
    try {
        const { title, src, course_id, video_id } = await request.json();
        
        if (!title || !src || !course_id || !video_id) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 },
            );
        }

        const dbData = await fs.readFile(dbPath, 'utf8');
        const db = JSON.parse(dbData);
        
        // Create new book with a unique ID
        const newBook = {
            id: Date.now().toString(),
            title,
            src,
            course_id,
            video_id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        db.books.push(newBook);
        await fs.writeFile(dbPath, JSON.stringify(db, null, 2));

        return NextResponse.json(newBook, { status: 201 });
    } catch (error) {
        console.error("Error creating book:", error);
        return NextResponse.json(
            { error: "Failed to create book" },
            { status: 500 },
        );
    }
}
