"use client";

import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Sidebar from "@/components/sublayout/Sidebar";

const StudentDashLayout = ({ children }: { children: React.ReactNode }) => {
    const [user] = useLocalStorage("user", null);
    const router = useRouter();

    if (!user) {
        router.push("/auth/login");
        return;
    }

    if (user.role !== "student") {
        router.push("/dashboard");
        return;
    }

    return (
        <main className="relative flex max-w-screen dark:bg-[#1A1A1A]">
            <Sidebar />
            <div className="flex-1 px-6 py-8">{children}</div>
        </main>
    );
};

export default StudentDashLayout;
