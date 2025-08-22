"use client";

// Hooks
import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
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
} from "lucide-react";

import { getEnrollmentsByUserId } from "@/lib/api/course";
import { getVideoQuestionsByUserId } from "@/lib/api/video";
import { useTranslations } from "next-intl";

const DashboardStudent = () => {
    // Grab user data from localStorage
    const [user] = useLocalStorage("user", null);
    const [searchInput, setSearchInput] = useState("");
    const [enrolledCourses, setEnrolledCourses] = useState(0);
    const [questionsAsked, setQuestionsAsked] = useState(0);

    const router = useRouter();
    const t = useTranslations("STUDENT_DASHBOARD");

    // handle search courses
    const handleSearchCourses = () => {
        router.push("/dashboard/student/courses?search=" + searchInput);
    };

    useEffect(() => {
        const fetchAllEnrolledCourses = async () => {
            const data = await getEnrollmentsByUserId(user?.id);
            setEnrolledCourses(data?.length ?? 0);
        };

        const fetchAllQuestionsAsked = async () => {
            const data = await getVideoQuestionsByUserId(user?.id);
            setQuestionsAsked(data?.length ?? 0);
        };

        fetchAllEnrolledCourses();
        fetchAllQuestionsAsked();
    }, []);

    return (
        <>
            <nav className="mb-6 flex flex-col items-center justify-between gap-6 lg:flex-row lg:gap-0">
                <header>
                    <h1 className="text-3xl font-semibold tracking-tight">
                        {t("HOME_PAGE.welcome")}{user?.full_name.split(" ")[0]} 👋
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
                {[
                    {
                        title: t("HOME_PAGE.card_title1"),
                        value: enrolledCourses,
                        icon: <BookCopy />,
                    },
                    {
                        title: t("HOME_PAGE.card_title2"),
                        value: questionsAsked,
                        icon: <CircleQuestionMark />,
                    },
                    {
                        title: t("HOME_PAGE.card_title3"),
                        value: 0,
                        icon: <Book />,
                    },
                    {
                        title: t("HOME_PAGE.card_title4"),
                        value: 0,
                        icon: <Video />,
                    },
                ].map((card, index) => (
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
                            {Number(card.value)}{" "}
                            {card.title === t("HOME_PAGE.card_title3") ? "%" : ""}
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
                    <div className="grid min-h-[50vh] place-content-center rounded-xl bg-slate-100">
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
                        <li className="flex items-center justify-between rounded-lg bg-green-200 p-4">
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
                    <div className="grid min-h-[50vh] place-content-center rounded-xl bg-slate-100">
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
                {/* <Table>
                    <TableCaption>A list of top 5 courses</TableCaption>
                    <TableHeader>
                        <TableRow className="flex">
                            <TableHead className="flex flex-1 items-center gap-2">
                                Course Name
                            </TableHead>
                            <TableHead className="flex flex-1 items-center gap-2">
                                Joined at
                            </TableHead>
                            <TableHead className="flex flex-1 items-center gap-2">
                                Rating
                            </TableHead>
                            <TableHead className="flex flex-1 items-center gap-2">
                                Teacher
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="flex flex-col">
                        <TableRow className="flex">
                            <TableCell className="flex flex-1 items-center gap-2 py-4">
                                <Link href="/dashboard/student/courses/1">
                                    <Book size={16} className="inline" /> Course
                                    1
                                </Link>
                            </TableCell>
                            <TableCell className="flex flex-1 items-center gap-2 py-4">
                                <Tag color="primary">
                                    {format(user?.created_at)}
                                </Tag>
                            </TableCell>
                            <TableCell className="flex flex-1 items-center gap-1 py-4">
                                <Star className="text-yellow-500" size={16} />{" "}
                                4.5
                            </TableCell>
                            <TableCell className="flex flex-1 items-center gap-2 py-4">
                                <div className="flex w-fit items-center justify-center rounded-full bg-slate-100 p-2">
                                    <User
                                        size={16}
                                        className="inline dark:text-black"
                                    />
                                </div>
                                Mr. Smith
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table> */}
                <div className="grid min-h-[50vh] place-content-center rounded-xl bg-slate-100">
                    {t("HOME_PAGE.coming_soon")} ...
                </div>
            </div>
        </>
    );
};

export default DashboardStudent;
