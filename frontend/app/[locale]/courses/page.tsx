import { Suspense } from "react";
import { School } from "lucide-react";

import { getCourses, getEnrollmentsByUserId } from "@/lib/api/course";
import Banner from "@/components/containers/Banner";
import CoursesFilter from "@/app/[locale]/courses/CoursesFilter";
import { cookies } from "next/headers";
import { redirect } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

export default async function Courses() {
    const cookieStore = await cookies();
    const user = cookieStore.get("user");
    const locale = await getLocale();

    let userData;
    if (user) {
        userData = JSON.parse(user.value);
    }

    // Check user role before opening this page
    if (userData?.role === "teacher") {
        return redirect({ href: "/dashboard/teacher/courses", locale });
    }

    const courses = await getCourses();
    const enrollments = await getEnrollmentsByUserId(userData?.id || "");

    const coursesNotInEnrollments = courses.filter(
        (course) =>
            !enrollments?.some(
                (enrollment) => enrollment.course_id === course.id,
            ),
    );

    return (
        <>
            {/* Banner */}
            <Banner className="mb-6 grid min-h-[40vh] place-content-center">
                <h1 className="mx-auto mb-4 flex items-center gap-4 text-center text-5xl font-bold tracking-tighter">
                    <School size={64} className="inline-block" /> Courses
                </h1>
                <p className="p-lead mx-auto max-w-[45ch] text-center !text-white">
                    Explore a wide range of courses tailored to your learning
                    goals, Check them out below!
                </p>
            </Banner>

            {/* Courses Grid */}
            <Suspense
                fallback={
                    <p className="col-span-10 inline text-center text-sm font-normal text-gray-400">
                        Loading...
                    </p>
                }
            >
                <CoursesFilter
                    coursesData={userData ? coursesNotInEnrollments : courses}
                />
            </Suspense>
        </>
    );
}
