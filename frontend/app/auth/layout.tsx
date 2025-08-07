"use client";

import { useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter, usePathname } from "next/navigation";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useLocalStorage("current_user", null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (user && pathname !== "/auth/logout") {
            router.push("/");
        }
    }, []);

    return <div className="flex min-h-screen gap-12">{children}</div>;
};

export default AuthLayout;
