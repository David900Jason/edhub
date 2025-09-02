"use client";

import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/i18n/routing";
import {
    LogOut,
    Home,
    Users,
    GraduationCap,
    CreditCard,
    BookOpen,
    Video,
    Book,
    MoonStar,
    Settings,
    User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SidebarOpen } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";

const AdminSidebarMobile = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const locale = useLocale();
    const t = useTranslations("STUDENT_DASHBOARD.SIDEBAR");

    return (
        <div className="block sm:hidden">
            <Sheet>
                <SheetTrigger className="fixed top-2 left-2 z-50" asChild>
                    <Button
                        variant="outline"
                        onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                    >
                        <SidebarOpen />
                    </Button>
                </SheetTrigger>
                <SheetContent
                    className="bg-primary max-w-64 dark:bg-purple-950"
                    side={locale === "ar" ? "right" : "left"}
                >
                    <SheetHeader>
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <Image
                                    src={"/logo.png"}
                                    width={60}
                                    height={60}
                                    alt="Logo"
                                />
                                <h2 className="text-2xl font-bold text-white">
                                    <Link href="/">Edhub</Link>
                                </h2>
                            </div>
                        </div>
                    </SheetHeader>
                    <ul className="flex flex-col gap-2 p-2">
                        <li className="rounded-xl p-2 py-3 text-purple-300 hover:bg-purple-800">
                            <Link
                                className="flex items-center gap-2 text-base"
                                href="/dashboard/admin"
                            >
                                <Home />
                                Home
                            </Link>
                        </li>
                        <li className="rounded-xl p-2 py-3 text-purple-300 hover:bg-purple-800">
                            <Link
                                className="flex items-center gap-2 text-base"
                                href="/dashboard/admin/students"
                            >
                                <Users />
                                Students
                            </Link>
                        </li>
                        <li className="rounded-xl p-2 py-3 text-purple-300 hover:bg-purple-800">
                            <Link
                                className="flex items-center gap-2 text-base"
                                href="/dashboard/admin/teachers"
                            >
                                <GraduationCap />
                                Teachers
                            </Link>
                        </li>
                        <li className="rounded-xl p-2 py-3 text-purple-300 hover:bg-purple-800">
                            <Link
                                className="flex items-center gap-2 text-base"
                                href="/dashboard/admin/subscriptions"
                            >
                                <CreditCard />
                                Subscriptions
                            </Link>
                        </li>
                        <li className="rounded-xl p-2 py-3 text-purple-300 hover:bg-purple-800">
                            <Link
                                className="flex items-center gap-2 text-base"
                                href="/dashboard/admin/courses"
                            >
                                <BookOpen />
                                Courses
                            </Link>
                        </li>
                        <li className="rounded-xl p-2 py-3 text-purple-300 hover:bg-purple-800">
                            <Link
                                className="flex items-center gap-2 text-base"
                                href="/dashboard/admin/videos"
                            >
                                <Video />
                                Videos
                            </Link>
                        </li>
                        <li className="rounded-xl p-2 py-3 text-purple-300 hover:bg-purple-800">
                            <Link
                                className="flex items-center gap-2 text-base"
                                href="/dashboard/admin/books"
                            >
                                <Book />
                                Books
                            </Link>
                        </li>
                    </ul>
                    <SheetFooter className="flex flex-col gap-2 overflow-y-auto">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="cursor-pointer"
                                >
                                    <Settings size={24} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-48">
                                <DropdownMenuItem>
                                    <Link
                                        className="flex items-center gap-2"
                                        href="/dashboard/teacher/profile"
                                    >
                                        <User size={20} /> Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() =>
                                        setTheme(
                                            theme === "dark" ? "light" : "dark",
                                        )
                                    }
                                >
                                    <MoonStar size={20} /> {t("theme")}
                                    <DropdownMenuShortcut>
                                        {theme === "dark" ? "Dark" : "Light"}
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link
                                        className="flex items-center gap-2 text-red-500"
                                        href="/auth/logout"
                                    >
                                        <LogOut
                                            className="text-red-500"
                                            size={20}
                                        />{" "}
                                        Log out
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default AdminSidebarMobile;
