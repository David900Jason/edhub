"use client";

import { Loader2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { redirect } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { logoutUser } from "@/lib/api/auth";

const Logout = () => {
    const locale = useLocale();
    const [user] = useLocalStorage("user_profile", null);

    // No user, redirect to login
    if (!user) {
        redirect({ href: "/auth/login", locale });
    }

    // User found, logout
    if (user) {
        logoutUser();
        redirect({ href: "/auth/login", locale });
    }

    return (
        <div className="flex h-screen w-full place-content-center">
            <div className="flex flex-1 items-center justify-center">
                <Loader2 className="text-primary mr-2 animate-spin" />
                <p className="text-primary text-lg font-bold">Loging out ...</p>
            </div>
        </div>
    );
};

export default Logout;
