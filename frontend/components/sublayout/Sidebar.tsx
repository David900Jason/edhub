"use client";

import { Button } from "../ui/button";
import { GraduationCap, LogOut, User, MoonStar, Settings } from "lucide-react";
import { dashboardLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
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

const Sidebar = () => {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();

    return (
        <div className="bg-primary sticky top-0 z-50 hidden h-screen w-64 flex-col justify-between sm:flex dark:bg-purple-950">
            <header>
                <div className="flex items-center justify-between gap-3 p-4">
                    <div className="flex items-center gap-2">
                        <GraduationCap size={42} className="text-secondary" />
                        <h2 className="text-2xl font-bold text-white">
                            <Link href="/">Doroosy</Link>
                        </h2>
                    </div>
                </div>
                <ul className="px-2 py-4">
                    {dashboardLinks.map(
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
                                        pathname === href && "bg-purple-800",
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
                </ul>
            </header>
            <footer className="flex justify-end gap-2 p-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="cursor-pointer">
                            <Settings size={24} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                        <DropdownMenuItem>
                            <User size={20} /> Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                setTheme(theme === "dark" ? "light" : "dark")
                            }
                        >
                            <MoonStar size={20} /> Theme
                            <DropdownMenuShortcut>
                                {theme === "dark" ? "Dark" : "Light"}
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link
                                className="flex items-center gap-2"
                                href="/auth/logout"
                            >
                                <LogOut size={20} /> Logout
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </footer>
        </div>
    );
};

export default Sidebar;
