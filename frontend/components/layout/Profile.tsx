"use client";

import ProfileButton from "../sublayout/ProfileButton";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { LogIn, Menu, MoonStar, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import { Link } from "@/i18n/routing";
import LanguageSwitchLink from "./LanguageSwitchLink";
import { useLocale, useTranslations } from "next-intl";

const Profile = () => {
    const [user] = useLocalStorage("user_profile", null);
    const { theme, setTheme } = useTheme();
    const locale = useLocale();
    const t = useTranslations("NAVBAR");

    if (user) {
        return <ProfileButton user={user} />;
    }

    return (
        <>
            <Sheet>
                <SheetTrigger className="block sm:hidden" asChild>
                    <Button variant="ghost">
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent
                    dir={locale === "ar" ? "rtl" : "ltr"}
                    side={locale === "ar" ? "left" : "right"}
                >
                    <SheetHeader>
                        <SheetTitle>{t("SIDEBAR.title")}</SheetTitle>
                        <SheetDescription>
                            {t("SIDEBAR.description")}
                        </SheetDescription>
                    </SheetHeader>
                    <ul className="space-y-6">
                        <li className="p-2 ps-4 pb-0">
                            <Link
                                href="/auth/login"
                                className="flex items-center gap-2"
                            >
                                <LogIn size={20} /> {t("cta1")}
                            </Link>
                        </li>
                        <li className="p-2 ps-4 pb-0">
                            <Link
                                href="/auth/signup"
                                className="flex items-center gap-2"
                            >
                                <User size={20} /> {t("cta2")}
                            </Link>
                        </li>
                    </ul>
                    <SheetFooter>
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <span>
                                    {theme === "dark" ? (
                                        <MoonStar size={18} />
                                    ) : (
                                        <Sun size={18} />
                                    )}
                                </span>
                                <Switch
                                    dir="ltr"
                                    checked={theme === "dark"}
                                    onCheckedChange={(checked) =>
                                        setTheme(checked ? "dark" : "light")
                                    }
                                />
                            </div>
                            {locale === "en" ? (
                                <LanguageSwitchLink locale="ar" />
                            ) : (
                                <LanguageSwitchLink locale="en" />
                            )}
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>

            <div className="hidden items-center gap-2 sm:flex">
                <div className="flex items-center gap-4">
                    <span>
                        {locale === "en" ? (
                            <LanguageSwitchLink locale="ar" />
                        ) : (
                            <LanguageSwitchLink locale="en" />
                        )}
                    </span>
                    <span className="flex items-center gap-2">
                        {theme === "dark" ? (
                            <MoonStar size={18} />
                        ) : (
                            <Sun size={18} />
                        )}
                        <Switch
                            dir="ltr"
                            checked={theme === "dark"}
                            onCheckedChange={(checked) =>
                                setTheme(checked ? "dark" : "light")
                            }
                        />
                    </span>
                </div>
                <div className="ms-4 flex items-center gap-2">
                    <Button
                        className="btn btn-primary bg-gradient-colourful"
                        asChild
                    >
                        <Link href={`/auth/login`}>{t("cta1")}</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href={`/auth/signup`}>{t("cta2")}</Link>
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Profile;
