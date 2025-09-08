"use client";

import Banner from "@/components/containers/Banner";
import { GraduationCap } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import TeachersGrid from "./components/TeachersGrid";
import { getAllTeachers } from "@/lib/api/user";

const TeachersPage = () => {
    const [teachers, setTeachers] = useState<UserType[]>([]);

    useEffect(() => {
        getAllTeachers().then(res => setTeachers(res as UserType[]))
    }, []);

    return (
        <>
            {/* Banner */}
            <Banner className="mb-6 grid min-h-[40vh] place-content-center">
                <h1 className="mx-auto mb-4 flex items-center gap-4 text-center text-5xl font-bold tracking-tighter">
                    <GraduationCap size={64} className="inline-block" /> Teachers
                </h1>
                <p className="p-lead mx-auto max-w-[45ch] text-center !text-white">
                    Explore our wide range of teachers who are here to help you
                    learn and reach greatness.
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
                <TeachersGrid data={teachers} />
            </Suspense>
        </>
    );
};

export default TeachersPage;
