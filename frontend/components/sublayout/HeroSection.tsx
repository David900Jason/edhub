"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";

const HeroSection = () => {
    const t = useTranslations("HOME.HERO_SECTION");
    const locale = useLocale();

    return (
        <>
            <h1 className="mx-5 max-w-[800px] text-5xl leading-[1.2] font-bold tracking-tighter sm:text-6xl">
                {t.rich("title", {
                    color: (chunks) => (
                        <span className="text-primary dark:bg-gradient-to-r dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 dark:bg-clip-text dark:text-transparent">
                            {chunks}
                        </span>
                    ),
                })}
                {/* 
                . */}
            </h1>
            <p className="p-lead mx-5 mt-4 max-w-[600px] sm:mx-auto">
                {t("description")}
            </p>
            <div className="mt-8 flex justify-center gap-4">
                <Button asChild className="btn-primary" variant="default">
                    <Link href={`/auth/signup`}>{t("btn1")}</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href={`/courses`}>{t("btn2")}</Link>
                </Button>
            </div>
        </>
    );
};

export default HeroSection;
