"use client";

import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [user] = useLocalStorage("user", null);
    const router = useRouter();

    if (!user) {
        router.push("/auth/login");
        return;
    }

    return <>{children}</>;
};

export default DashboardLayout;
