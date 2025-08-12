import axios from "axios";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const { id } = params;
        const response = await axios.delete(
            `http://localhost:8000/questions/${id}`,
        );
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

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const { id } = params;
        const body = await request.json();
        const response = await axios.patch(
            `http://localhost:8000/questions/${id}`,
            {
                question_text: body?.question_text,
            },
        );
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
