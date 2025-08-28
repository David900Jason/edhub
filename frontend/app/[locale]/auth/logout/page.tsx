"use client";

import { Loader2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { redirect } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { logoutUser } from "@/lib/api/auth";
import { toast } from "sonner";

const Logout = () => {
    const locale = useLocale();
    const [user] = useLocalStorage("user_profile", null);

    // No user, redirect to login
    if (!user) {
        redirect({ href: "/auth/login", locale });
        toast.error("You're not signed in to proceed");
    }

    // User found, logout
    if (user) {
        logoutUser();
        toast.success("You've been logged out successfully");
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
