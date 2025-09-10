"use client";

import { Link, usePathname } from "@/i18n/routing";

export default function LanguageSwitchLink({
    locale,
}: {
    locale: "en" | "ar";
}) {
    const pathname = usePathname(); // the current path without the locale prefix

    return (
        <Link href={pathname} locale={locale}>
            EN
        </Link>
    );
}
