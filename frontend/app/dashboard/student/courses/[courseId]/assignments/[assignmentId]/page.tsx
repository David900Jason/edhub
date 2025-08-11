import { getAllCourses } from "@/lib/api";

export async function generateStaticParams() {
    // Return at least one static param for static export
    // In a real app, you would fetch all assignments here
    return [{ courseId: "1", assignmentId: "1" }];
}

export default function AssignmentPage({
    params,
}: {
    params: { courseId: string; assignmentId: string };
}) {
    return (
        <div className="p-6">
            <h1 className="mb-4 text-2xl font-bold">Assignment Details</h1>
            <div className="rounded-lg bg-white p-6 shadow">
                <p>Course ID: {params.courseId}</p>
                <p>Assignment ID: {params.assignmentId}</p>
            </div>
        </div>
    );
}

