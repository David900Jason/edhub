"use client";

import { redirect } from "@/i18n/routing";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useEffect } from "react";
import { useLocale } from "next-intl";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [user] = useSessionStorage("user_profile", null);
    const locale = useLocale();

    useEffect(() => {
        if (!user) {
            redirect({ href: "/auth/login", locale });
        }
    }, [user, locale]);

    return <>{children}</>;
};

export default DashboardLayout;
