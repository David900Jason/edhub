"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { redirect } from "@/i18n/routing";
import { useLocale } from "next-intl";

const DashboardPage = () => {
    const [user] = useLocalStorage("user_profile", null);
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

    if (user.role === "admin") {
        redirect({ href: "/dashboard/admin", locale });
    }

    return <div>Redirecting...</div>;
};

export default DashboardPage;
