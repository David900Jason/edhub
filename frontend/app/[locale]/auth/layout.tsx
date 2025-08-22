"use client";

import { redirect, usePathname } from "@/i18n/routing";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useLocale } from "next-intl";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const [user] = useLocalStorage("user", null);
    const pathName = usePathname();
    const locale = useLocale();

    if (pathName !== "/auth/logout" && user) {
        redirect({ href: "/dashboard", locale });
    }

    return <div className="flex min-h-screen gap-12">{children}</div>;
};

export default AuthLayout;
