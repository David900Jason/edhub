import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
    try {
        // In a real app, you would get the teacher's ID from the session
        // const { userId } = await getCurrentUser();

        // For now, we'll use a mock implementation
        const videos = await axios.get("http://localhost:8000/videos");

        const formattedVideos = videos.data.map((video: any) => ({
            ...video,
            courseName: video.course?.name || "Uncategorized",
            courseId: video.courseId || "",
        }));

        return NextResponse.json(formattedVideos);
    } catch (error) {
        console.error("Error fetching videos:", error);
        return NextResponse.json(
            { error: "Failed to fetch videos" },
            { status: 500 },
        );
    }
}

