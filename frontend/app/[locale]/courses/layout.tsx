"use client";

import Navbar from "@/components/layout/Navbar";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useEffect } from "react";
import { redirect } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { toast } from "sonner";
import { X } from "lucide-react";

const CourseLayout = ({ children }: { children: React.ReactNode }) => {
    const [user] = useSessionStorage("user_profile", null);
    const locale = useLocale();

    useEffect(() => {
        if (user) {
            if (user.role === "teacher") {
                redirect({ href: "/dashboard/teacher/courses/", locale });
            }
        }

        if (!user) {
            toast("You must be logged in to access this page", {
                duration: 2000,
                icon: <X />,
                position: "top-center",
            });
            redirect({ href: "/", locale });
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

export default CourseLayout;
