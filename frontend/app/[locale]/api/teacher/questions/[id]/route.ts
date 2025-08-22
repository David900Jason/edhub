import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db', 'db.json');

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { answer_text, teacher_id } = await request.json();
        
        if (!answer_text || !teacher_id) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 },
            );
        }

        const dbData = await fs.readFile(dbPath, 'utf8');
        const db = JSON.parse(dbData);
        
        const questionIndex = db.questions.findIndex((q: any) => q.id === id);
        
        if (questionIndex === -1) {
            return NextResponse.json(
                { error: "Question not found" },
                { status: 404 },
            );
        }

        // Update the question with the reply
        db.questions[questionIndex].reply = {
            answer_text,
            teacher_id,
            created_at: new Date().toISOString()
        };

        // Save the updated data back to the file
        await fs.writeFile(dbPath, JSON.stringify(db, null, 2));

        return NextResponse.json({
            success: true,
            question: db.questions[questionIndex]
        });

    } catch (error) {
        console.error("Error replying to question:", error);
        return NextResponse.json(
            { error: "Failed to post reply" },
            { status: 500 },
        );
    }
}
