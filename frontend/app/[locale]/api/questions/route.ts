import { generateId } from "@/lib/utils";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const response = await axios.post("http://localhost:8001/questions", {
            ...body,
            id: generateId(4),
            reply: {
                answer_text: "",
                teacher_id: "",
                created_at: "",
            },
            created_at: new Date().toISOString(),
        });

        return NextResponse.json(
            { ...response.data },
            {
                status: 201,
            },
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
