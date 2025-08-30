"use client";

import { useSessionStorage } from "@/hooks/useSessionStorage";
import { getDashboardDetails } from "@/lib/api/user";
import { Award, DollarSign, Loader2, Users, Video } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const TeacherDash = () => {
    const [user] = useSessionStorage("user_profile", null);
    const [dashboard_details, setDashboardDetails] = useState({
        enrolled_students: 0,
        total_revenue: 0,
        videos_uploaded: 0,
        average_score: 0,
        currency: "",
    });
    const t = useTranslations("TEACHER_DASHBOARD.HOME");

    useEffect(() => {
        const fetchDashboardDetails = async () => {
            const details = await getDashboardDetails();
            setDashboardDetails(details);
        };
        fetchDashboardDetails();
    }, []);

    const DashboardInfoCards = [
        {
            id: 1,
            title: "Enrolled Students",
            value: dashboard_details?.enrolled_students ?? 0,
            icon: <Users />,
        },
        {
            id: 2,
            title: "Total Revenue",
            value: dashboard_details?.total_revenue ?? 0,
            icon: <DollarSign />,
        },
        {
            id: 3,
            title: "Videos Uploaded",
            value: dashboard_details?.videos_uploaded ?? 0,
            icon: <Video />,
        },
        {
            id: 4,
            title: "Average Students score",
            value: dashboard_details?.average_score ?? 0,
            icon: <Award />,
        },
    ];

    return (
        <main>
            <nav className="mb-6">
                <header>
                    <h1 className="text-3xl font-semibold tracking-tight">
                        {t("welcome")}
                        {user?.full_name} 👋
                    </h1>
                    <p className="p-lead max-w-[45ch]">{t("description")}</p>
                </header>
            </nav>
            {/* Dashboard Cards */}
            <div className="mb-6 grid grid-cols-2 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {DashboardInfoCards.map((card, index) => {
                    const card_title = t(`card_title${index + 1}`);
                    return (
                        <div
                            key={index}
                            className="flex flex-col rounded-xl border border-slate-200 bg-purple-100 p-6"
                        >
                            <div className="mb-2 w-fit rounded-full bg-white p-4 text-purple-900">
                                {card.icon}
                            </div>
                            <h3 className="text-lg font-semibold dark:text-black">
                                {card_title}
                            </h3>
                            <span className="text-primary text-3xl font-extrabold tracking-tight">
                                {card?.value || 0}
                                {card.id === 4 && (
                                    <span className="text-lg font-bold text-gray-500">
                                        {" "}
                                        %
                                    </span>
                                )}
                                <span className="text-sm font-bold text-gray-500">
                                    {card.id === 2
                                        ? " " +
                                          (dashboard_details?.currency ?? "EGP")
                                        : ""}
                                </span>
                            </span>
                        </div>
                    );
                })}
            </div>
            {/* Leaderboard and Average Revenue Bar chart */}
            <div className="mb-6 grid min-h-[450px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border p-6 lg:col-span-2">
                    <h2 className="text-2xl font-semibold">
                        {t("section_1.title")}
                    </h2>
                    <p className="p-lead mb-6">{t("section_1.description")}</p>
                    <div className="flex min-h-[50vh] place-content-center items-center gap-2 rounded-xl bg-slate-100 text-gray-500 dark:text-black">
                        <Loader2 className="animate-spin" /> {t("coming_soon")}{" "}
                        ...
                    </div>
                </div>
                <div className="rounded-xl border p-6">
                    <h2 className="text-2xl font-semibold">
                        {t("section_2.title")}
                    </h2>
                    <p className="p-lead mb-6">{t("section_2.description")}</p>
                    <div className="flex min-h-[50vh] place-content-center items-center gap-2 rounded-xl bg-slate-100 text-gray-500 dark:text-black">
                        <Loader2 className="animate-spin" /> {t("coming_soon")}{" "}
                        ...
                    </div>
                </div>
            </div>
            {/* Students Exams Score Chart */}
            <div className="rounded-xl border p-6">
                <h2 className="text-2xl font-semibold">
                    {t("section_3.title")}
                </h2>
                <p className="p-lead mb-6">{t("section_3.description")}</p>
                <div className="flex min-h-[50vh] place-content-center items-center gap-2 rounded-xl bg-slate-100 text-gray-500 dark:text-black">
                    <Loader2 className="animate-spin" /> {t("coming_soon")} ...
                </div>
            </div>
        </main>
    );
};

export default TeacherDash;
