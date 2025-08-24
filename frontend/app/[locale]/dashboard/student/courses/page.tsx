"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { getCourses } from "@/lib/api/course";
import CoursesView from "./_components/CoursesView";

const PrivateCoursesPage = () => {
    const [courses, setCourses] = useState<CourseType[]>([]);

    // Get locale
    // const locale = useLocale();
    const t = useTranslations("STUDENT_DASHBOARD.COURSES");

    // Extract search query
    const searchParams = useSearchParams();
    const search = searchParams.get("search");

    // Fetch All Courses
    useEffect(() => {
        const fetchCourses = async () => {
            const courses = await getCourses();
            setCourses(courses);
        }
        fetchCourses();
    }, [search]);

    return (
        <section>
            <header className="mb-8">
                <div>
                    <h1 className="text-3xl font-semibold">{t("title")}</h1>
                    <p className="p-lead">{t("description")}</p>
                </div>
            </header>
            <Suspense fallback={<div>{t("loading")}</div>}>
                <CoursesView
                    searchQuery={search || ""}
                    courses={courses}
                />
            </Suspense>
        </section>
    );
};

export default PrivateCoursesPage;
