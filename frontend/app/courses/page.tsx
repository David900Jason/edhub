import { Suspense } from "react";
import { School } from "lucide-react";

import { getCourses } from "@/lib/api/course";
import Banner from "@/components/containers/Banner";
import CoursesFilter from "@/app/courses/CoursesFilter";

export default async function Courses() {
    const courses = await getCourses();

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

            {/* Search and Filters */}

            {/* Courses Grid */}
            <Suspense
                fallback={
                    <p className="col-span-10 inline text-center text-sm font-normal text-gray-400">
                        Loading...
                    </p>
                }
            >
                <CoursesFilter coursesData={courses} />
            </Suspense>
        </>
    );
}
