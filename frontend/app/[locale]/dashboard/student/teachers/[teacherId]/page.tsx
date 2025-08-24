"use client";

import { Link } from "@/i18n/routing";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import Tag from "@/components/ui/Tag";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { getTeacherById } from "@/lib/api/user";
import { TeacherType } from "../page";

const TeacherCourses = () => {
    // States
    const [teacher, setTeacher] = useState<TeacherType | null>(null);

    const t = useTranslations("STUDENT_DASHBOARD");
    const { teacherId }: { teacherId: string } = useParams();

    const coursesRelatedToTeacherOnly: CourseType[] = [];

    useEffect(() => {
        const getTeacher = async () => {
            const teacher: TeacherType | null = await getTeacherById(teacherId);
            setTeacher(teacher);
        };
        getTeacher();
    }, []);

    return (
        <section>
            <header className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-semibold">
                    {teacher?.full_name}
                </h1>
                <Button asChild variant="outline">
                    <Link href="/dashboard/student/teachers">
                        {t("TEACHERS.cta2")}
                    </Link>
                </Button>
            </header>
            {coursesRelatedToTeacherOnly?.length > 0 ? (
                <main className="grid grid-cols-1 gap-8 rounded-2xl border p-6 sm:grid-cols-2 md:grid-cols-3 dark:bg-black/40">
                    {coursesRelatedToTeacherOnly?.map((course) => (
                        <Card
                            key={course?.id}
                            className="gap-8 overflow-hidden p-0"
                        >
                            <CardHeader className="flex flex-1 flex-col justify-start p-0">
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
                                    </div>
                                    <CardTitle className="mb-1 text-lg font-semibold">
                                        {course?.title}
                                    </CardTitle>
                                    <CardDescription className="mb-1">
                                        {t("TEACHERS.by")}:{" "}
                                        {teacher?.full_name ||
                                            "Unknown Teacher"}
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
                                        {t("COURSES.cta1")}
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </main>
            ) : (
                <div className="flex h-64 items-center justify-center rounded-2xl border-2 border-dashed">
                    <p className="text-lg text-gray-500">{t("TEACHERS.not_found")}</p>
                </div>
            )}
        </section>
    );
};

export default TeacherCourses;
