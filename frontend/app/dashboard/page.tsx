"use client";

import { useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
    const [user] = useLocalStorage("user", null);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/auth/login");
            return;
        }

        if (user.role === "teacher") {
            router.push("/dashboard/teacher");
            return;
        }

        if (user.role === "student") {
            router.push("/dashboard/student");
            return;
        }

        if (user.role === "admin") {
            router.push("/dashboard/admin");
            return;
        }

        // Remove this route from history
        router.replace("/");
    }, [user]);

    return <div>Redirecting...</div>;
};

export default DashboardPage;
