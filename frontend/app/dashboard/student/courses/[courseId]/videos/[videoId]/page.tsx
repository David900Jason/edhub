import { getAllCourses } from "@/lib/api";

export async function generateStaticParams() {
    // Return at least one static param for static export
    // In a real app, you would fetch all videos here
    return [{ courseId: "1", videoId: "1" }];
}

export default function VideoPage({
    params,
}: {
    params: { courseId: string; videoId: string };
}) {
    return (
        <div className="p-6">
            <h1 className="mb-4 text-2xl font-bold">Video Player</h1>
            <div className="rounded-lg bg-white p-6 shadow">
                <p>Course ID: {params.courseId}</p>
                <p>Video ID: {params.videoId}</p>
                <div className="mt-4 flex aspect-video items-center justify-center bg-gray-200">
                    <p>Video player will be embedded here</p>
                </div>
            </div>
        </div>
    );
}

