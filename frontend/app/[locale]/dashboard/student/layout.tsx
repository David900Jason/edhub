"use client";

import { redirect } from "@/i18n/routing";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useEffect } from "react";
import { useLocale } from "next-intl";
import Sidebar from "@/components/sublayout/Sidebar";
import SidebarMobile from "@/components/layout/SidebarMobile";

const StudentDashLayout = ({ children }: { children: React.ReactNode }) => {
    const [user] = useSessionStorage("user_profile", null);
    const locale = useLocale();

    useEffect(() => {
        if (user.role !== "student") {
            redirect({ href: "/dashboard", locale });
        }
    }, [user, locale]);

    return (
        <main className="relative flex min-h-screen">
            <div className="hidden w-1/5 min-w-64 flex-shrink-0 sm:block">
                <Sidebar />
            </div>
            <SidebarMobile />
            <div className="w-4/5 overflow-auto p-6 max-sm:flex-1 max-sm:pt-18 sm:p-10">
                {children}
            </div>
        </main>
    );
};

export default StudentDashLayout;
