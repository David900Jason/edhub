"use client";

// Hooks
import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";

// Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Search,
    BookCopy,
    Video,
    Book,
    CircleQuestionMark,
    Star,
    User,
} from "lucide-react";

import RecentActivities from "@/app/dashboard/student/RecentActivities";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
    TableCaption,
} from "@/components/ui/table";

import { format } from "timeago.js";
import { Progress } from "@/components/ui/progress";
import Tag from "@/components/ui/Tag";
import Link from "next/link";
import CountUp from "react-countup";

const DashboardInfoCards = [
    {
        title: "Enrolled Courses",
        value: 5,
        icon: <BookCopy />,
    },
    {
        title: "Completed Videos",
        value: 42,
        icon: <Video />,
    },
    {
        title: "Average Score",
        value: 87,
        icon: <Book />,
    },
    {
        title: "Questions asked",
        value: 10,
        icon: <CircleQuestionMark />,
    },
];

const DashboardStudent = () => {
    // Grab user data from localStorage
    const [user] = useLocalStorage("user", null);
    const [searchInput, setSearchInput] = useState("");
    const [isClient, setIsClient] = useState(false);

    const router = useRouter();

    // handle search courses
    const handleSearchCourses = () => {
        router.push("/dashboard/student/courses?search=" + searchInput);
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <>
            <nav className="mb-6 flex flex-col items-center justify-between gap-6 lg:flex-row lg:gap-0">
                <header>
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Hi, {user?.full_name.split(" ")[0]} 👋
                    </h1>
                    <p className="p-lead max-w-[45ch]">
                        Welcome to your dashboard. Let&apos;s learn something new!
                    </p>
                </header>
                <div className="input-group flex items-center gap-2">
                    <Input
                        className="min-w-[250px]"
                        placeholder="Search courses..."
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
                {DashboardInfoCards.map((card, index) => (
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
                        <CountUp
                            className="text-primary text-3xl font-extrabold tracking-tight"
                            duration={2}
                            end={Number(card.value.toFixed(2))}
                            decimal=","
                            decimalPlaces={2}
                            suffix={card.title === "Average Score" ? "%" : ""}
                        />
                    </div>
                ))}
            </div>
            <div className="mb-6 grid min-h-[450px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border p-6 lg:col-span-2">
                    <h2 className="text-2xl font-semibold">
                        Recent Activities
                    </h2>
                    <p className="p-lead">Check your recent activities</p>
                    <RecentActivities />
                </div>
                <div className="rounded-xl border p-6">
                    <h2 className="text-2xl font-semibold">Leaderboard</h2>
                    <p className="p-lead mb-6">Check your leaderboard</p>
                    <ul className="flex flex-col gap-2">
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
                    </ul>
                </div>
            </div>
            <div className="mb-16 min-h-[450px] rounded-xl border p-6">
                <h2 className="text-2xl font-semibold">Top 5 Courses</h2>
                <p className="p-lead mb-6">A table of your top 5 courses</p>
                <Table>
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
                                Instructor
                            </TableHead>
                            <TableHead className="flex flex-1 items-center gap-2">
                                Progress
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
                            <TableCell className="flex flex-1 items-center gap-2 py-4">
                                <Progress value={90} />
                                <span>90%</span>
                            </TableCell>
                        </TableRow>
                        <TableRow className="flex">
                            <TableCell className="flex flex-1 items-center gap-2 py-4">
                                <Link href="/dashboard/student/courses/2">
                                    <Book size={16} className="inline" /> Course
                                    2
                                </Link>
                            </TableCell>
                            <TableCell className="flex flex-1 items-center gap-2 py-4">
                                <Tag color="primary">
                                    {format(user?.created_at)}
                                </Tag>
                            </TableCell>
                            <TableCell className="flex flex-1 items-center gap-1 py-4">
                                <Star className="text-yellow-500" size={16} />{" "}
                                4.0
                            </TableCell>
                            <TableCell className="flex flex-1 items-center gap-2 py-4">
                                <div className="flex w-fit items-center justify-center rounded-full bg-slate-100 p-2">
                                    <User
                                        size={16}
                                        className="inline dark:text-black"
                                    />
                                </div>
                                Mr. Kamal
                            </TableCell>
                            <TableCell className="flex flex-1 items-center gap-2 py-4">
                                <Progress value={85} />
                                <span>85%</span>
                            </TableCell>
                        </TableRow>
                        <TableRow className="flex">
                            <TableCell className="flex flex-1 items-center gap-2 py-4">
                                <Link href="/dashboard/student/courses/3">
                                    <Book size={16} className="inline" /> Course
                                    3
                                </Link>
                            </TableCell>
                            <TableCell className="flex flex-1 items-center gap-2 py-4">
                                <Tag color="primary">
                                    {format(user?.created_at)}
                                </Tag>
                            </TableCell>
                            <TableCell className="flex flex-1 items-center gap-1 py-4">
                                <Star className="text-yellow-500" size={16} />{" "}
                                3.5
                            </TableCell>
                            <TableCell className="flex flex-1 items-center gap-2 py-4">
                                <div className="flex w-fit items-center justify-center rounded-full bg-slate-100 p-2">
                                    <User
                                        size={16}
                                        className="inline dark:text-black"
                                    />
                                </div>
                                Mrs. Sarah
                            </TableCell>
                            <TableCell className="flex flex-1 items-center gap-2 py-4">
                                <Progress value={80} />
                                <span>80%</span>
                            </TableCell>
                        </TableRow>
                        <TableRow className="flex">
                            <TableCell className="flex flex-1 items-center gap-2 py-4">
                                <Link href="/dashboard/student/courses/4">
                                    <Book size={16} className="inline" /> Course
                                    4
                                </Link>
                            </TableCell>
                            <TableCell className="flex flex-1 items-center gap-2 py-4">
                                <Tag color="primary">
                                    {format(user?.created_at)}
                                </Tag>
                            </TableCell>
                            <TableCell className="flex flex-1 items-center gap-1 py-4">
                                <Star className="text-yellow-500" size={16} />{" "}
                                3.0
                            </TableCell>
                            <TableCell className="flex flex-1 items-center gap-2 py-4">
                                <div className="flex w-fit items-center justify-center rounded-full bg-slate-100 p-2">
                                    <User
                                        size={16}
                                        className="inline dark:text-black"
                                    />
                                </div>
                                Mr. Ali
                            </TableCell>
                            <TableCell className="flex flex-1 items-center gap-2 py-4">
                                <Progress value={79} />
                                <span>79%</span>
                            </TableCell>
                        </TableRow>
                        <TableRow className="flex">
                            <TableCell className="flex flex-1 items-center gap-2 py-4">
                                <Link href="/dashboard/student/courses/5">
                                    <Book size={16} className="inline" /> Course
                                    5
                                </Link>
                            </TableCell>
                            <TableCell className="flex flex-1 items-center gap-2 py-4">
                                <Tag color="primary">
                                    {format(user?.created_at)}
                                </Tag>
                            </TableCell>
                            <TableCell className="flex flex-1 items-center gap-1 py-4">
                                <Star className="text-yellow-500" size={16} />{" "}
                                2.5
                            </TableCell>
                            <TableCell className="flex flex-1 items-center gap-2 py-4">
                                <div className="flex w-fit items-center justify-center rounded-full bg-slate-100 p-2">
                                    <User
                                        size={16}
                                        className="inline dark:text-black"
                                    />
                                </div>
                                Mr. Mohamed
                            </TableCell>
                            <TableCell className="flex flex-1 items-center gap-2 py-4">
                                <Progress value={75} />
                                <span>75%</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default DashboardStudent;
