import { cookies } from "next/headers";
import { Star } from "lucide-react";
import { getEnrollmentsByUserId, getCourse } from "@/lib/api/course";
import { getTeacherById } from "@/lib/api/user";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Tag from "@/components/ui/Tag";
import RatingButton from "./RatingButton";
import Link from "next/link";

const PrivateCoursesPage = async () => {
    // Get user from cookies
    const cookiesStore = await cookies();
    const userId = JSON.parse(cookiesStore.get("user")?.value || "")?.id;

    const enrollments = await getEnrollmentsByUserId(userId);
    const courses = await Promise.all(
        enrollments?.map((enrollment) => getCourse(enrollment.course_id)) ||
            [],
    );

    const teachers = await Promise.all(
        enrollments?.map((enrollment) =>
            getTeacherById(enrollment.teacher_id),
        ) || [],
    );

    return (
        <section>
            <header className="mb-8">
                <h1 className="text-3xl font-semibold">Your Courses</h1>
                <p className="p-lead">Check courses you have enrolled in</p>
            </header>
            <main className="mb-20 grid grid-cols-1 gap-8 p-4 sm:grid-cols-2 md:grid-cols-3">
                {courses?.map((course: CourseType | null) => (
                    <Card
                        key={course?.id}
                        className="gap-8 overflow-hidden p-0"
                    >
                        <CardHeader className="p-0">
                            <Image
                                src={course?.thumbnail || ""}
                                alt={course?.title || "Course Thumbnail"}
                                width={600}
                                height={400}
                            />
                            <div className="gap-2 px-6 pt-4">
                                <div className="mb-4 flex items-center gap-2">
                                    <Tag color="green">{course?.category}</Tag>
                                    <Tag color="yellow">
                                        {course?.school_year}
                                    </Tag>
                                </div>
                                <CardTitle className="mb-1 text-lg font-semibold">
                                    {course?.title}
                                </CardTitle>
                                <CardDescription className="mb-1">
                                    by:{" "}
                                    {teachers.find(
                                        (teacher) =>
                                            teacher?.id === course?.teacher_id,
                                    )?.full_name || "Unknown Teacher"}
                                </CardDescription>
                                <CardDescription>
                                    {enrollments?.find(
                                        (enrollment) =>
                                            enrollment.course_id === course?.id,
                                    )?.review === 0 ? (
                                        <RatingButton
                                            id={
                                                enrollments?.find(
                                                    (enrollment) =>
                                                        enrollment.course_id ==
                                                        course?.id,
                                                )?.id || ""
                                            }
                                        />
                                    ) : (
                                        <>
                                            <Star className="inline h-4 w-4 text-yellow-300" />{" "}
                                            {Number(
                                                enrollments?.find(
                                                    (enrollment) =>
                                                        enrollment.course_id ==
                                                        course?.id,
                                                )?.review,
                                            )?.toFixed(1)}
                                        </>
                                    )}
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="px-6 pb-6">
                            <Button variant="outline" className="w-full">
                                <Link
                                    href={`/dashboard/student/courses/${course?.id}`}
                                >
                                    View Course
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </main>
        </section>
    );
};

export default PrivateCoursesPage;
