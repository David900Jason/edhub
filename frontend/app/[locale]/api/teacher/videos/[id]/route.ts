import { NextResponse } from "next/server";
import axios from "axios";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const { id } = params;

        const video = await axios.get(`http://localhost:8001/videos/${id}`);

        if (!video) {
            return NextResponse.json(
                { error: "Video not found" },
                { status: 404 },
            );
        }

        await axios.delete(`http://localhost:8001/videos/${id}`);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting video:", error);
        return NextResponse.json(
            { error: "Failed to delete video" },
            { status: 500 },
        );
    }
}
