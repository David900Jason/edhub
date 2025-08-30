"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { getStudentEnrollments } from "@/lib/api/course";
import CoursesView from "./_components/CoursesView";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "@/i18n/routing";

const PrivateCoursesPage = () => {
    const [courses, setCourses] = useState<EnrollmentType[]>([]);

    // Get locale
    // const locale = useLocale();
    const t = useTranslations("STUDENT_DASHBOARD.COURSES");

    // Extract search query
    const searchParams = useSearchParams();
    const search = searchParams.get("search");

    // Fetch All Courses
    useEffect(() => {
        getStudentEnrollments().then((res) => setCourses(res));
    }, [search]);

    return (
        <section>
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold">{t("title")}</h1>
                    <p className="p-lead">{t("description")}</p>
                </div>
                <Button variant="secondary" className="dark:text-black" asChild>
                    <Link href="/courses">
                        <ShoppingCart /> Buy New Course
                    </Link>
                </Button>
            </header>
            <Suspense fallback={<div>{t("loading")}</div>}>
                <CoursesView
                    searchQuery={search || ""}
                    courses={courses as EnrollmentType[]}
                />
            </Suspense>
        </section>
    );
};

export default PrivateCoursesPage;
