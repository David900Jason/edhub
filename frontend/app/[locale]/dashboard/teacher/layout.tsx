"use client";

import { redirect } from "@/i18n/routing";
import { useLocale } from "next-intl";
import Sidebar from "@/components/sublayout/Sidebar";
import SidebarMobile from "@/components/layout/SidebarMobile";

const TeacherDashLayout = ({ children }: { children: React.ReactNode }) => {
    const user = JSON.parse(sessionStorage.getItem("user_profile") || "{}");
    const locale = useLocale();

    if (user.role !== "teacher") {
        redirect({ href: "/dashboard", locale });
    }

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

export default TeacherDashLayout;
