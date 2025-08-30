"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Input } from "@/components/ui/input";
import CourseCard from "./CourseCard";

const CoursesView = ({
    courses = [],
    searchQuery = "",
}: {
    courses?: EnrollmentType[];
    searchQuery?: string;
}) => {
    const [searchInput, setSearchInput] = useState(searchQuery || "");
    const deferredSearchInput = useDeferredValue(searchInput);

    const locale = useLocale();
    const dir = locale === "ar" ? "rtl" : "ltr"; // Set direction based on locale
    const t = useTranslations("STUDENT_DASHBOARD.COURSES");

    // TODO: Search Bar Functionality
    const filteredCourses = useMemo(() => {
        if (!courses) return [];
        return courses?.filter((course) => {
            return course.course.title
                .toLowerCase()
                .includes(deferredSearchInput.toLowerCase());
        });
    }, [deferredSearchInput, courses]);

    return (
        <>
            <main className="mb-20 rounded-2xl border p-6" dir={dir}>
                <div
                    className={`mb-8 w-full ${dir === "rtl" ? "sm:ml-auto sm:w-2/5" : "sm:w-2/5"}`}
                >
                    <Input
                        placeholder={t("search_placeholder")}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className={dir === "rtl" ? "text-right" : "text-left"}
                    />
                </div>

                {filteredCourses && filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                        {filteredCourses.map((course) => (
                            <CourseCard key={course?.id} course={course} />
                        ))}
                    </div>
                ) : (
                    <div className="text-muted-foreground flex h-40 items-center justify-center">
                        <p>{t("no_courses")}</p>
                    </div>
                )}
            </main>
        </>
    );
};

export default CoursesView;
