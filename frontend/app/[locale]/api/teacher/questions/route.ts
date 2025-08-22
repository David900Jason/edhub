import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db', 'db.json');

export async function GET() {
    try {
        const dbData = await fs.readFile(dbPath, 'utf8');
        const { questions, users, videos } = JSON.parse(dbData);

        // Enrich questions with user and video data
        const enrichedQuestions = questions.map((question: any) => {
            const user = users.find((u: any) => u.id === question.user_id);
            const video = videos.find((v: any) => v.id === question.video_id);
            
            return {
                id: question.id,
                question_text: question.question_text,
                created_at: question.created_at,
                reply: question.reply || null,
                user: user ? {
                    id: user.id,
                    name: user.full_name,
                    email: user.email
                } : null,
                video: video ? {
                    id: video.id,
                    title: video.title
                } : null
            };
        });

        return NextResponse.json(enrichedQuestions);
    } catch (error) {
        console.error("Error fetching questions:", error);
        return NextResponse.json(
            { error: "Failed to fetch questions" },
            { status: 500 },
        );
    }
}
