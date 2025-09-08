"use client";

import { useSessionStorage } from "@/hooks/useSessionStorage";
import { getDashboardDetails } from "@/lib/api/user";
import { BookOpen, DollarSign, GraduationCap, Users } from "lucide-react";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const AdminDashPage = () => {
    const [user] = useSessionStorage("user_profile", null);

    const [dashboardDetails, setDashboardDetails] = useState({
        total_revenue: 0,
        total_students: 0,
        total_teachers: 0,
        total_courses: 0,
        currency: "EGP",
    });

    useEffect(() => {
        getDashboardDetails().then((res) => {
            setDashboardDetails(res);
        });
    }, []);

    return (
        <section>
            <header className="mb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-0">
                <div className="text-center sm:text-left">
                    <h1 className="text-start text-3xl font-semibold">
                        Hi, {user?.full_name}
                    </h1>
                    <p className="p-lead">Welcome to your admin dashboard</p>
                </div>
            </header>
            <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col rounded-xl border border-slate-200 bg-purple-100 p-6">
                    <div className="mb-2 w-fit rounded-full bg-white p-4 text-purple-900">
                        <DollarSign size={28} />
                    </div>
                    <h3 className="text-lg font-semibold dark:text-black">
                        Total Revenue
                    </h3>
                    <span className="text-primary text-3xl font-bold tracking-tight">
                        <CountUp
                            start={0}
                            end={dashboardDetails.total_revenue}
                            duration={2}
                        />{" "}
                        <span className="text-sm font-bold text-gray-500">
                            {dashboardDetails.currency || "EGP"}
                        </span>
                    </span>
                </div>
                <div className="flex flex-col rounded-xl border border-slate-200 bg-purple-100 p-6">
                    <div className="mb-2 w-fit rounded-full bg-white p-4 text-purple-900">
                        <Users size={28} />
                    </div>
                    <h3 className="text-lg font-semibold dark:text-black">
                        Total Students
                    </h3>
                    <span className="text-primary text-3xl font-bold tracking-tight">
                        {dashboardDetails.total_students}
                    </span>
                </div>
                <div className="flex flex-col rounded-xl border border-slate-200 bg-purple-100 p-6">
                    <div className="mb-2 w-fit rounded-full bg-white p-4 text-purple-900">
                        <GraduationCap size={28} />
                    </div>
                    <h3 className="text-lg font-semibold dark:text-black">
                        Total Teachers
                    </h3>
                    <span className="text-primary text-3xl font-bold tracking-tight">
                        {dashboardDetails.total_teachers}
                    </span>
                </div>
                <div className="flex flex-col rounded-xl border border-slate-200 bg-purple-100 p-6">
                    <div className="mb-2 w-fit rounded-full bg-white p-4 text-purple-900">
                        <BookOpen size={28} />
                    </div>
                    <h3 className="text-lg font-semibold dark:text-black">
                        Courses created
                    </h3>
                    <span className="text-primary text-3xl font-bold tracking-tight">
                        {dashboardDetails.total_courses}
                    </span>
                </div>
            </main>
        </section>
    );
};

export default AdminDashPage;
