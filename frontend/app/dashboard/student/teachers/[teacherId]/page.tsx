import { getCourse, getEnrollmentsByUserId } from "@/lib/api/course";
import { getTeacherById } from "@/lib/api/user";
import { Star } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import Tag from "@/components/ui/Tag";
import Image from "next/image";
import RatingButton from "../../courses/RatingButton";
import { Button } from "@/components/ui/button";

const TeacherCourses = async ({
    params,
}: {
    params: { teacherId: string };
}) => {
    const cookieStore = await cookies();
    const user = JSON.parse(cookieStore.get("user")?.value || "");
    const { teacherId } = await params;

    const enrollments: EnrollmentType[] | null = await getEnrollmentsByUserId(
        user?.id || "",
    );
    const courses: CourseType[] = (await Promise.all(
        enrollments?.map((enrollment) => getCourse(enrollment.course_id)) || [],
    )) as CourseType[];

    const coursesRelatedToTeacherOnly = courses.filter(
        (course) => course?.teacher_id === teacherId,
    );
    const teacher = await getTeacherById(teacherId);

    return (
        <section>
            <header className="mb-8">
                <h1 className="text-3xl font-semibold">
                    {teacher?.full_name}&apos;s Courses
                </h1>
            </header>
            {coursesRelatedToTeacherOnly?.length > 0 ? (
                <main className="grid grid-cols-1 gap-8 p-4 sm:grid-cols-2 md:grid-cols-3">
                    {coursesRelatedToTeacherOnly?.map((course) => (
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
                                        <Tag color="green">
                                            {course?.category}
                                        </Tag>
                                        <Tag color="yellow">
                                            {course?.school_year}
                                        </Tag>
                                    </div>
                                    <CardTitle className="mb-1 text-lg font-semibold">
                                        {course?.title}
                                    </CardTitle>
                                    <CardDescription className="mb-1">
                                        by:{" "}
                                        {teacher?.full_name ||
                                            "Unknown Teacher"}
                                    </CardDescription>
                                    <CardDescription>
                                        {enrollments?.find(
                                            (enrollment) =>
                                                enrollment.course_id ===
                                                course?.id,
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
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    asChild
                                >
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
            ) : (
                <div className="flex h-64 items-center justify-center rounded-2xl border-2 border-dashed">
                    <p className="text-lg text-gray-500">No courses found</p>
                </div>
            )}
        </section>
    );
};

export default TeacherCourses;
