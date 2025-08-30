"use client";

import { useSessionStorage } from "@/hooks/useSessionStorage";
import { redirect } from "@/i18n/routing";
import { useLocale } from "next-intl";

const DashboardPage = () => {
    const [user] = useSessionStorage("user_profile", null);
    const locale = useLocale();

    if (!user) {
        redirect({ href: "/auth/login", locale });
    }

    if (user.role === "student") {
        redirect({ href: "/dashboard/student", locale });
    }

    if (user.role === "teacher") {
        redirect({ href: "/dashboard/teacher", locale });
    }

    return <div>Redirecting...</div>;
};

export default DashboardPage;
