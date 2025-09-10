"use client";

import { Button } from "../ui/button";
import { LogOut, User, MoonStar, Settings } from "lucide-react";
import {
    AdminDashboardLinks,
    dashboardLinks,
    TeacherDashboardLinks,
} from "@/constants";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTheme } from "next-themes";
import Image from "next/image";

const Sidebar = () => {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();

    const [user] = useSessionStorage("user_profile", null);

    const t = useTranslations("STUDENT_DASHBOARD.SIDEBAR");

    // const switchTo = (locale: "en" | "ar") => {
    //     router.push(pathname, { locale });
    // };

    return (
        <div className="bg-primary sticky top-0 z-50 hidden h-screen flex-1/5 flex-shrink-0 flex-col justify-between sm:flex dark:bg-purple-950">
            <header>
                <div className="flex items-center justify-between gap-3 p-4">
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
                <ul className="px-2 py-4">
                    {user?.role == "student" &&
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
            </header>
            <footer className="flex justify-end gap-2 p-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full cursor-pointer"
                        >
                            <Settings size={24} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                        <DropdownMenuItem asChild>
                            <Link href="/dashboard/student/profile">
                                <span className="flex items-center gap-2">
                                    <User size={20} /> {t("profile")}
                                </span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                setTheme(theme === "dark" ? "light" : "dark")
                            }
                            asChild
                        >
                            <span className="flex items-center gap-2">
                                <MoonStar size={20} /> {t("theme")}
                                <DropdownMenuShortcut>
                                    {theme === "dark" ? t("mode2") : t("mode1")}
                                </DropdownMenuShortcut>
                            </span>
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
                        <DropdownMenuItem asChild>
                            <Link
                                className="flex flex-1 items-center gap-2 !text-red-500 hover:!text-red-600"
                                href="/auth/logout"
                            >
                                <span className="flex items-center gap-2">
                                    <LogOut
                                        className="!text-red-500"
                                        size={20}
                                    />{" "}
                                    {t("logout")}
                                </span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </footer>
        </div>
    );
};

export default Sidebar;
