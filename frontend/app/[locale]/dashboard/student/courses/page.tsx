import { Suspense } from "react";
import { cookies } from "next/headers";
import { getLocale, getTranslations } from "next-intl/server";
import CoursesView from "./_components/CoursesView";

const PrivateCoursesPage = async ({ searchParams }: { searchParams: Promise<{ search: string }> }) => {
    // Get user from cookies
    const cookiesStore = await cookies();
    const userId = JSON.parse(cookiesStore.get("user")?.value || "")?.id;

    // Get locale
    const locale = await getLocale();
    const t = await getTranslations("STUDENT_DASHBOARD.COURSES");

    // Extract search query
    const { search } = await searchParams;

    // Fetch All Enrollments
    const enrollments = await fetch(`http://localhost:3000/${locale}/api/courses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id: userId,
            search
        })
    });
    const courses = await enrollments.json();

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
                    courses={courses || []}
                    searchQuery={search}
                />
            </Suspense>
        </section>
    );
};

export default PrivateCoursesPage;
