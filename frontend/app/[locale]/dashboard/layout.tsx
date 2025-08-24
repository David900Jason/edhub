"use client";

import { redirect } from "@/i18n/routing";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect } from "react";
import { useLocale } from "next-intl";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [user] = useLocalStorage("user_profile", null);
    const locale = useLocale();

    useEffect(() => {
        if (!user) {
            redirect({ href: "/auth/login", locale });
        }
    }, []);

    return <>{children}</>;
};

export default DashboardLayout;
