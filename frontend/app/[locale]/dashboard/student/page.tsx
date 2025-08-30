"use client";

// Hooks
import { useEffect, useState } from "react";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useRouter } from "@/i18n/routing";

// Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Search,
    BookCopy,
    Video,
    Book,
    CircleQuestionMark,
    Loader2,
} from "lucide-react";

import { useTranslations } from "next-intl";
import { getDashboardDetails } from "@/lib/api/user";
import CountUp from "react-countup";

const DashboardStudent = () => {
    // Grab user data from sessionStorage
    const [user] = useSessionStorage("user_profile", null);
    const [dashboardDetails, setDashboardDetails] = useState({
        average_score: 0,
        enrolled_courses: 0,
        questions_asked: 0,
        wallet_balance: 0,
        wallet_currency: "EGP",
    });
    const [searchInput, setSearchInput] = useState("");

    const router = useRouter();
    const t = useTranslations("STUDENT_DASHBOARD");

    useEffect(() => {
        getDashboardDetails().then((res) => {
            setDashboardDetails({
                average_score: res.average_score,
                enrolled_courses: res.enrolled_courses,
                questions_asked: res.questions_asked,
                wallet_balance: res.wallet_balance,
                wallet_currency: res.wallet_currency,
            });
        });
    }, [user]);

    // handle search courses
    const handleSearchCourses = () => {
        router.push("/dashboard/student/courses?search=" + searchInput);
    };

    const DashboardCards = [
        {
            id: 1,
            title: t("HOME_PAGE.card_title1"),
            value: dashboardDetails?.enrolled_courses,
            icon: <BookCopy />,
        },
        {
            id: 2,
            title: t("HOME_PAGE.card_title2"),
            value: dashboardDetails?.questions_asked,
            icon: <CircleQuestionMark />,
        },
        {
            id: 3,
            title: t("HOME_PAGE.card_title3"),
            value: dashboardDetails?.average_score,
            icon: <Book />,
        },
        {
            id: 4,
            title: t("HOME_PAGE.card_title4"),
            value: dashboardDetails?.wallet_balance,
            icon: <Video />,
        },
    ];

    return (
        <>
            <nav className="mb-6 flex flex-col items-center justify-between gap-6 lg:flex-row lg:gap-0">
                <header>
                    <h1 className="text-3xl font-semibold tracking-tight">
                        {t("HOME_PAGE.welcome")}
                        {user?.full_name.split(" ")[0]} 👋
                    </h1>
                    <p className="p-lead max-w-[45ch]">
                        {t("HOME_PAGE.description")}
                    </p>
                </header>
                <div className="input-group flex items-center gap-2">
                    <Input
                        className="min-w-[250px]"
                        placeholder={t("HOME_PAGE.search_placeholder")}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <Button
                        onClick={() => handleSearchCourses()}
                        variant="outline"
                    >
                        <Search />
                    </Button>
                </div>
            </nav>
            <div className="mb-6 grid grid-cols-2 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {DashboardCards.map((card, index) => (
                    <div
                        key={index}
                        className="flex flex-col rounded-xl border border-slate-200 bg-purple-100 p-6"
                    >
                        <div className="mb-2 w-fit rounded-full bg-white p-4 text-purple-900">
                            {card.icon}
                        </div>
                        <h3 className="text-lg font-semibold dark:text-black">
                            {card.title}
                        </h3>
                        <span className="text-primary text-3xl font-extrabold tracking-tight">
                            <CountUp end={card.value} duration={2} />
                            {card.id === 3 && (
                                <span className="text-lg font-bold text-gray-500">
                                    {" "}
                                    %
                                </span>
                            )}
                            <span className="text-sm font-bold text-gray-500">
                                {card.id === 4
                                    ? " " + dashboardDetails?.wallet_currency
                                    : ""}
                            </span>
                        </span>
                    </div>
                ))}
            </div>
            <div className="mb-6 grid min-h-[450px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border p-6 lg:col-span-2">
                    <h2 className="text-2xl font-semibold">
                        {t("HOME_PAGE.section_1.title")}
                    </h2>
                    <p className="p-lead mb-6">
                        {t("HOME_PAGE.section_1.description")}
                    </p>
                    <div className="flex min-h-[50vh] place-content-center items-center gap-2 rounded-xl bg-slate-100 text-gray-500 dark:text-black">
                        <Loader2 className="animate-spin" />{" "}
                        {t("HOME_PAGE.coming_soon")} ...
                    </div>
                </div>
                <div className="rounded-xl border p-6">
                    <h2 className="text-2xl font-semibold">
                        {t("HOME_PAGE.section_2.title")}
                    </h2>
                    <p className="p-lead mb-6">
                        {t("HOME_PAGE.section_2.description")}
                    </p>
                    <div className="flex min-h-[50vh] place-content-center items-center gap-2 rounded-xl bg-slate-100 text-gray-500 dark:text-black">
                        <Loader2 className="animate-spin" />{" "}
                        {t("HOME_PAGE.coming_soon")} ...
                    </div>
                </div>
            </div>
            <div className="mb-16 min-h-[450px] rounded-xl border p-6">
                <h2 className="text-2xl font-semibold">
                    {t("HOME_PAGE.section_3.title")}
                </h2>
                <p className="p-lead mb-6">
                    {t("HOME_PAGE.section_3.description")}
                </p>
                <div className="flex min-h-[50vh] place-content-center items-center gap-2 rounded-xl bg-slate-100 text-gray-500 dark:text-black">
                    <Loader2 className="animate-spin" />{" "}
                    {t("HOME_PAGE.coming_soon")} ...
                </div>
            </div>
        </>
    );
};

export default DashboardStudent;
