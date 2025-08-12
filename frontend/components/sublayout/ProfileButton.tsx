"use client";

import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Check, LogOut, MoonStar, User } from "lucide-react";
import { ProfileButtonLinks } from "@/constants";
import { useTheme } from "next-themes";

const ProfileButton = ({ user }: { user: UserType }) => {
    const { theme, setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
                <div className="flex cursor-pointer items-center gap-4 rounded-full border bg-white p-2 shadow-md transition-colors hover:bg-white dark:bg-black">
                    <User
                        size={32}
                        className="rounded-full border object-cover shadow"
                    />
                    <span className="text-sm font-bold">
                        Hi, {user?.full_name}
                    </span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[99999999] flex w-48 flex-col gap-1">
                {ProfileButtonLinks.map(({ label, href, icon }, index) => {
                    const Icon: React.ElementType = icon;
                    return (
                        <DropdownMenuItem key={index}>
                            <Link
                                className="flex items-center gap-2"
                                href={href}
                            >
                                <Icon size={20} />
                                {label}
                            </Link>
                        </DropdownMenuItem>
                    );
                })}
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <MoonStar className="mr-2 h-4 w-4" />
                        <span>Theme</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                            {theme === "light" && (
                                <Check className="ml-auto h-4 w-4" />
                            )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                            {theme === "dark" && (
                                <Check className="ml-auto h-4 w-4" />
                            )}
                        </DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem>
                    <Link
                        className="flex cursor-pointer items-center gap-2 text-red-500"
                        href="/auth/logout"
                    >
                        <LogOut className="text-red-500" />
                        Logout
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileButton;
