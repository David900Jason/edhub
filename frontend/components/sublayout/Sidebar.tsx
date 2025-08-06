"use client";

import { Button } from "../ui/button";
import { GraduationCap, LogOut, MoonStar } from "lucide-react";
import { dashboardLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="bg-primary sticky top-0 left-0 hidden h-screen w-64 flex-col justify-between sm:flex">
            <header>
                <div className="flex items-center gap-3 p-4 pt-6 pb-2">
                    <GraduationCap
                        size={42}
                        className="text-primary-foreground"
                    />
                    <h2 className="text-3xl font-bold">EdHub</h2>
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
                                        "mb-2 cursor-pointer rounded-lg px-2 py-3 text-white transition-colors hover:bg-white hover:text-black",
                                        pathname === href &&
                                            "bg-white text-black",
                                    )}
                                >
                                    <Link
                                        className="flex items-center gap-2"
                                        href={href}
                                    >
                                        <Icon
                                            size={24}
                                            className="text-primary-foreground"
                                        />
                                        {title}
                                    </Link>
                                </li>
                            );
                        },
                    )}
                </ul>
            </header>
            <footer className="flex gap-2 p-4">
                <Button variant="ghost" className="cursor-pointer">
                    <MoonStar />
                </Button>
                <Button variant="ghost" className="cursor-pointer">
                    <LogOut />
                    Logout
                </Button>
            </footer>
        </div>
    );
};

export default Sidebar;
