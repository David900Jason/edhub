"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Award, DollarSign, Users, Video } from "lucide-react";
import CountUp from "react-countup";
import AverageRevenue from "./_components/AverageRevenue";
import StudentsLineChart from "./_components/StudentsLineChart";
import { useTranslations } from "next-intl";

const DashboardInfoCards = [
    {
        title: "Enrolled Students",
        value: 0,
        icon: <Users />,
    },
    {
        title: "Total Revenue",
        value: 0,
        icon: <DollarSign />,
    },
    {
        title: "Videos Uploaded",
        value: 0,
        icon: <Video />,
    },
    {
        title: "Average Students score",
        value: 0,
        icon: <Award />,
    },
];

const TeacherDash = () => {
    const [user] = useLocalStorage("user", null);
    const t = useTranslations("TEACHER_DASHBOARD.HOME");

    return (
        <main>
            <nav className="mb-6">
                <header>
                    <h1 className="text-3xl font-semibold tracking-tight">
                        {t("welcome")}, {user?.full_name} 👋
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
                            <CountUp
                                className="text-primary text-3xl font-extrabold tracking-tight"
                                duration={2}
                                end={Number(card.value.toFixed(2))}
                                decimal=","
                                decimalPlaces={2}
                                suffix={
                                    card_title === "Average Students score" ||
                                    card_title === "متوسط نقاط الطلاب"
                                        ? "%"
                                        : ""
                                }
                            />
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
                    <p className="p-lead">
                        {t("section_1.description")}
                    </p>
                    <div className="mt-6 grid min-h-[50vh] place-content-center rounded-xl bg-slate-100 dark:bg-slate-800">
                        <p>{t("coming_soon")}</p>
                    </div>
                </div>
                <div className="rounded-xl border p-6">
                    <h2 className="text-2xl font-semibold">
                        {t("section_2.title")}
                    </h2>
                    <p className="p-lead mb-6">
                        {t("section_2.description")}
                    </p>
                    {/* <ul className="flex flex-col gap-2">
                        <li className="flex items-center justify-between rounded-lg bg-slate-100 p-4">
                            <div className="text-primary bg-primary/10 aspect-square w-fit rounded-full p-2 font-bold">
                                #1
                            </div>
                            <div className="dark:text-black">John Doe</div>
                            <div className="font-bold text-green-600">100%</div>
                        </li>
                        <li className="flex items-center justify-between rounded-lg bg-slate-100 p-4">
                            <div className="text-primary bg-primary/10 aspect-square w-fit rounded-full p-2 font-bold">
                                #2
                            </div>
                            <div className="dark:text-black">Jane Doe</div>
                            <div className="font-bold text-green-600">95%</div>
                        </li>
                        <li className="flex items-center justify-between rounded-lg bg-slate-100 p-4">
                            <div className="text-primary bg-primary/10 aspect-square w-fit rounded-full p-2 font-bold">
                                #3
                            </div>
                            <div className="dark:text-black">Ahmed Wael</div>
                            <div className="font-bold text-green-600">90%</div>
                        </li>
                        <li className="flex items-center justify-between rounded-lg bg-slate-100 p-4">
                            <div className="text-primary bg-primary/10 aspect-square w-fit rounded-full p-2 font-bold">
                                #4
                            </div>
                            <div className="dark:text-black">John Doe</div>
                            <div className="font-bold text-green-600">85%</div>
                        </li>
                        <li className="flex items-center justify-between rounded-lg bg-slate-100 p-4">
                            <div className="text-primary bg-primary/10 aspect-square w-fit rounded-full p-2 font-bold">
                                #5
                            </div>
                            <div className="dark:text-black">
                                Sarah Elsharawy
                            </div>
                            <div className="font-bold text-green-600">80%</div>
                        </li>
                    </ul> */}
                    <div className="mt-6 grid min-h-[50vh] place-content-center rounded-xl bg-slate-100 dark:bg-slate-800">
                        <p>{t("coming_soon")}</p>
                    </div>
                </div>
            </div>
            {/* Students Exams Score Chart */}
            <div className="rounded-xl border p-6">
                <h2 className="text-2xl font-semibold">
                    {t("section_3.title")}
                </h2>
                <p className="p-lead">
                    {t("section_3.description")}
                </p>
                {/* <StudentsLineChart /> */}
                <div className="mt-6 grid min-h-[50vh] place-content-center rounded-xl bg-slate-100 dark:bg-slate-800">
                    <p>{t("coming_soon")}</p>
                </div>
            </div>
        </main>
    );
};

export default TeacherDash;
