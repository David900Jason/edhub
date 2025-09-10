"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { CoursesView } from "@/app/[locale]/dashboard/teacher/courses/_components/CoursesView";
import { useTranslations } from "next-intl";
import { getCourses } from "@/lib/api/course";

export default function TeacherCourses() {
    const [courses, setCourses] = useState<CourseType[]>([]);
    const t = useTranslations("TEACHER_DASHBOARD.COURSES");

    useEffect(() => {
        const fetchTeacherCourses = async () => {
            const res = await getCourses();
            setCourses(res || []);
        };
        fetchTeacherCourses();
    }, [setCourses]);

    return (
        <section>
            <header className="mb-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold mb-2">{t("title")}</h1>
                        <p className="text-muted-foreground">
                            {t("description")}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link
                                href="/dashboard/teacher/students"
                                className="flex items-center gap-2"
                            >
                                <Users className="h-4 w-4" />
                                {t("cta1")}
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link
                                href="/dashboard/teacher/courses/new"
                                className="btn-primary flex items-center gap-2"
                            >
                                <Plus className="h-4 w-4" />
                                {t("cta2")}
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            <div className="bg-card rounded-lg border p-6 shadow-sm">
                <CoursesView courses={courses || []} />
            </div>
        </section>
    );
}
