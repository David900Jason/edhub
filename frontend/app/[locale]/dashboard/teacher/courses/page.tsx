"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { getAllTeachersCourses } from "@/lib/api/course";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { CoursesView } from "@/app/[locale]/dashboard/teacher/courses/_components/CoursesView";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";

export default function TeacherCourses() {
    const [courses, setCourses] = useState<CourseType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [teacherId, setTeacherId] = useState<string | null>(null);

    const t = useTranslations("TEACHER_DASHBOARD.COURSES");

    useEffect(() => {
        // Get teacher ID from cookies on the client side
        const userData = localStorage.getItem("user");
        if (userData) {
            const user = JSON.parse(userData);
            setTeacherId(user.id);
        }
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            if (!teacherId) return;

            try {
                setIsLoading(true);
                const data = await getAllTeachersCourses(teacherId);
                setCourses(data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, [teacherId]);

    if (isLoading || !teacherId) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-12 w-64" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-[400px] w-full" />
            </div>
        );
    }

    return (
        <section>
            <header className="mb-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold">{t("title")}</h1>
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
                <CoursesView data={courses || []} />
            </div>
        </section>
    );
}
