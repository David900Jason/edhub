"use client";

import { useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter, usePathname } from "next/navigation";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const [user] = useLocalStorage("user", null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (user && pathname !== "/auth/logout") {
            router.push("/");
        }
    }, [user, pathname, router]);

    return <div className="flex min-h-screen gap-12">{children}</div>;
};

export default AuthLayout;
