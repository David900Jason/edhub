// components/TimeAgo.tsx
"use client";

import { format, register } from "timeago.js";
import { useLocale } from "next-intl";
import ar from "timeago.js/lib/lang/ar";

// Register Arabic locale once (module scope)
register("ar", ar);

type Props = { date: string | number | Date };

export default function TimeAgo({ date }: Props) {
    const locale = useLocale() ?? "en";

    // Consider 'ar', 'ar-EG', etc. as Arabic
    const isArabic = locale.toLowerCase().startsWith("ar");
    const lang = isArabic ? "ar" : "en";

    // Normalize/validate date (ISO string is fine)
    const d =
        typeof date === "string" || typeof date === "number"
            ? new Date(date)
            : date;
    if (!d || Number.isNaN(d.getTime())) return <span>-</span>;

    return <span className="text-start">{format(d, lang)}</span>;
}
