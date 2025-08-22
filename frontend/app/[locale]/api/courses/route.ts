import { getCourse, getEnrollmentsByUserId } from "@/lib/api/course";
import { getTeacherById } from "@/lib/api/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // Get the body from the request
        const { user_id } = await req.json();

        // Get Enrollments and filter them by user_id and status
        const enrollments = await getEnrollmentsByUserId(user_id);

        // Get the teachers of those assignments
        const teachers = await Promise.all(
            enrollments?.map((enrollment) =>
                getTeacherById(enrollment.teacher_id),
            ) || [],
        );

        const courses = await Promise.all(
            enrollments?.map((enrollment) => getCourse(enrollment.course_id)) ||
                [],
        );

        // Make an array of objects with course and teacher
        const coursesWithTeachers = courses?.map((course) => ({
            ...course,
            teacher_name: teachers?.find(
                (teacher) => teacher?.id === course?.teacher_id,
            )?.full_name,
            review: enrollments?.find(
                (enrollment) => enrollment.course_id === course?.id,
            )?.review,
        }));

        return NextResponse.json(coursesWithTeachers);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
