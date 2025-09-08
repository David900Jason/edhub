"use client";

import Navbar from "@/components/layout/Navbar";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useEffect } from "react";
import { redirect } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { toast } from "sonner";

const TeachersLayout = ({ children }: { children: React.ReactNode }) => {
    const [user] = useSessionStorage("user_profile", null);
    const locale = useLocale();

    useEffect(() => {
        if (user) {
            if (user.role === "teacher") {
                redirect({ href: "/dashboard/teacher/students/", locale });
            }
        }

        if (!user) {
            toast.info("You are not signed in to proceed", {
                duration: 1000,
                description: "You will be redirected to the login page",
                onAutoClose() {
                    redirect({ href: "/auth/login", locale });
                },
            });
        }
    }, [user, locale]);

    return (
        <>
            <header className="header-sticky">
                <Navbar />
            </header>
            {children}
        </>
    );
};

export default TeachersLayout;
