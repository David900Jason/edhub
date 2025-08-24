import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { rating, enrollmentId } = body;

        const data = await axios.patch(
            `http://localhost:8001/enrollments/${enrollmentId}`,
            {
                review: rating,
            },
        );

        return NextResponse.json({ success: true, data: data.data });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
