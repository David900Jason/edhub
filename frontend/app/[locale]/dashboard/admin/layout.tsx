"use client";

import AdminSidebar from "./_components/AdminSidebar";
import { redirect } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useEffect } from "react";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { toast } from "sonner";
import AdminSidebarMobile from "./_components/AdminSidebarMobile";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const [user] = useSessionStorage("user_profile", null);
    const locale = useLocale();

    useEffect(() => {
        if (user.role !== "admin") {
            redirect({ href: "/dashboard", locale });
            toast.error("You are not authorized to access this page");
        }
    }, [user, locale]);

    return (
        <main className="relative flex min-h-screen">
            <div className="bg-primary dark:bg-purple-950 hidden w-1/5 max-w-64 min-w-64 flex-shrink-0 flex-col sm:flex">
                <AdminSidebar />
            </div>
            <AdminSidebarMobile />
            <div className="w-4/5 overflow-auto p-6 max-sm:flex-1 max-sm:pt-18 sm:p-10">
                {children}
            </div>
        </main>
    );
};

export default AdminLayout;
