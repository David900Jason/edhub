"use client";

import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";
import { ProfileButtonLinks } from "@/constants";

const ProfileButton = ({ user }: { user: any }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex cursor-pointer items-center gap-4 rounded-full border bg-white p-2 shadow-md transition-colors hover:bg-gray-100">
                    <User
                        size={32}
                        className="rounded-full border object-cover shadow"
                    />
                    <span className="text-sm font-bold">
                        Hi, {user.full_name.split(" ")[0]}
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
                <DropdownMenuItem>
                    <Link
                        className="flex items-center gap-2"
                        href="/user/settings"
                    >
                        <Settings />
                        Settings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link
                        className="flex items-center gap-2 text-red-500"
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
