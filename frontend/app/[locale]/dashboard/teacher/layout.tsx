"use client";

import { redirect } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import TeacherSidebar from "@/components/layout/TeacherSidebar";
import TeacherSidebarMobile from "@/components/layout/TeacherSidebarMobile";

const TeacherDashLayout = ({ children }: { children: React.ReactNode }) => {
    const [user] = useLocalStorage("user", null);
    const locale = useLocale();

    if (user.role !== "teacher") {
        redirect({ href: "/dashboard", locale });
    }

    return (
        <main className="relative flex min-h-screen">
            <div className="hidden min-w-64 w-1/5 flex-shrink-0 sm:block">
                <TeacherSidebar />
            </div>
            <TeacherSidebarMobile />
            <div className="w-4/5 max-sm:flex-1 overflow-auto p-6 max-sm:pt-18 sm:p-10">
                {children}
            </div>
        </main>
    );
};

export default TeacherDashLayout;
