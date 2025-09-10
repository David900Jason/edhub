"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const HeroSection = () => {
    const t = useTranslations("HOME.HERO_SECTION");

    return (
        <>
            <h1 className="mx-5 max-w-4xl text-5xl leading-[1.2] font-bold tracking-tighter sm:text-6xl">
                {t.rich("title", {
                    color: (chunks) => (
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                            {chunks}
                        </span>
                    ),
                })}
            </h1>
            <p className="p-lead mx-5 mt-4 max-w-[500px] sm:mx-auto">
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
