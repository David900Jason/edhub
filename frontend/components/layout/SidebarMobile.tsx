"use client";

import { SidebarOpen, LogOut, MoonStar, Settings, User } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTrigger,
} from "../ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useState } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
    AdminDashboardLinks,
    dashboardLinks,
    TeacherDashboardLinks,
} from "@/constants";
import { usePathname } from "@/i18n/routing";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useSessionStorage } from "@/hooks/useSessionStorage";

const SidebarMobile = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [user] = useSessionStorage("user_profile", null);
    const { theme, setTheme } = useTheme();
    const locale = useLocale();
    const pathname = usePathname();
    const t = useTranslations("STUDENT_DASHBOARD.SIDEBAR");

    // const switchTo = (locale: "en" | "ar") => {
    //     router.push(pathname, { locale });
    // };

    return (
        <div className="block sm:hidden">
            <Sheet>
                <SheetTrigger asChild className="fixed top-2 left-2 z-50">
                    <Button
                        variant="outline"
                        onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                    >
                        <SidebarOpen />
                    </Button>
                </SheetTrigger>
                <SheetContent
                    className="bg-primary flex max-w-64 sm:hidden dark:bg-purple-950"
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
                    <ul
                        className="flex-1 space-y-2 overflow-y-auto scroll-smooth px-2 transition-colors"
                        style={{ scrollbarWidth: "thin" }}
                    >
                        {user?.role === "student" &&
                            dashboardLinks.map(
                                (
                                    { title, href, icon }: DashboardLinkType,
                                    index: number,
                                ) => {
                                    const Icon: React.ElementType = icon;
                                    return (
                                        <li
                                            key={index}
                                            className={cn(
                                                "text-primary mb-2 cursor-pointer rounded-lg px-2 py-3 transition-colors hover:bg-purple-800 hover:text-black",
                                                pathname === href &&
                                                    "bg-purple-800",
                                            )}
                                        >
                                            <Link
                                                className="flex items-center gap-2 text-purple-300 dark:text-purple-300"
                                                href={href}
                                            >
                                                <Icon
                                                    size={24}
                                                    className="text-purple-300"
                                                />
                                                {title}
                                            </Link>
                                        </li>
                                    );
                                },
                            )}

                        {user?.role == "teacher" &&
                            TeacherDashboardLinks.map(
                                (
                                    { title, href, icon }: DashboardLinkType,
                                    index: number,
                                ) => {
                                    const Icon: React.ElementType = icon;
                                    return (
                                        <li
                                            key={index}
                                            className={cn(
                                                "text-primary mb-2 cursor-pointer rounded-lg px-2 py-3 transition-colors hover:bg-purple-800 hover:text-black",
                                                pathname === href &&
                                                    "bg-purple-800",
                                                "cursor-pointer",
                                            )}
                                        >
                                            <Link
                                                className="flex items-center gap-2 text-purple-300 dark:text-purple-300"
                                                href={href}
                                            >
                                                <Icon
                                                    size={24}
                                                    className="text-purple-300"
                                                />
                                                {title}
                                            </Link>
                                        </li>
                                    );
                                },
                            )}

                        {user?.role === "admin" &&
                            AdminDashboardLinks.map((link) => {
                                const Icon: React.ElementType = link.icon;
                                return (
                                    <li
                                        key={link.href}
                                        className="rounded-xl p-2 py-3 text-purple-300 hover:bg-purple-800"
                                    >
                                        <Link
                                            className="flex items-center gap-2 text-base"
                                            href={link.href}
                                        >
                                            <Icon />
                                            {link.title}
                                        </Link>
                                    </li>
                                );
                            })}
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
                                        href="/dashboard/student/profile"
                                    >
                                        <User size={20} /> {t("profile")}
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
                                        {theme === "dark"
                                            ? t("mode2")
                                            : t("mode1")}
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem>
                                {/* <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        <Globe className="mr-2 h-4 w-4" />
                                        <span>{t("language")}</span>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem
                                            onClick={() => switchTo("ar")}
                                        >
                                            AR
                                            {locale === "ar" && (
                                                <Check className="ml-auto h-4 w-4" />
                                            )}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => switchTo("en")}
                                        >
                                            EN
                                            {locale === "en" && (
                                                <Check className="ml-auto h-4 w-4" />
                                            )}
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuSub> */}
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
                                        {t("logout")}
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

export default SidebarMobile;
