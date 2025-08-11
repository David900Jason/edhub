import { fetchCourse, getAllCourses } from "@/lib/api";

export async function generateStaticParams() {
    // Fetch all courses to get their IDs at build time
    const courses = await getAllCourses();

    // Return an array of params for each course
    return courses.map((course: any) => ({
        courseId: course.id.toString(),
    }));
}

export default async function TeacherCoursePage({
    params,
}: {
    params: { courseId: string };
}) {
    const course = await fetchCourse(params.courseId);

    return (
        <div className="p-6">
            <h1 className="mb-4 text-2xl font-bold">
                {course?.title || "Course Details"}
            </h1>
            <div className="rounded-lg bg-white p-6 shadow">
                <p>{course?.description || "No description available"}</p>
            </div>
        </div>
    );
}

