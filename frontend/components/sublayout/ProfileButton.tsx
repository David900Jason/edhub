"use client";

import { Link } from "@/i18n/routing";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Check, Globe, LogOut, MoonStar } from "lucide-react";
import { ProfileButtonLinks, TeacherProfileButtonLinks } from "@/constants";
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import Image from "next/image";

const ProfileButton = ({ user }: { user: UserType }) => {
    const { theme, setTheme } = useTheme();
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations();

    const switchTo = (locale: "en" | "ar") => {
        router.push(pathname, { locale });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
                <div className="flex cursor-pointer items-center gap-4 rounded-full border bg-white p-2 shadow-md transition-colors hover:bg-white dark:bg-black">
                    <Image
                        src={
                            user.profile_img == null
                                ? "/avatar.jpg"
                                : user.profile_img
                        }
                        width={32}
                        height={32}
                        alt="Profile Image"
                        className="rounded-full"
                    />
                    <span className="order-1 text-sm font-bold">
                        {t("NAVBAR.PROFILE_STUDENT.welcome")}{" "}
                        {user?.full_name.split(" ")[0]}
                    </span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex w-48 flex-col gap-1">
                {user.role === "student"
                    ? ProfileButtonLinks.map(({ href, icon, label }, index) => {
                          const Icon: React.ElementType = icon;
                          return (
                              <DropdownMenuItem key={index}>
                                  <Link
                                      className="flex flex-1 items-center justify-start gap-2 text-start"
                                      href={href}
                                      dir={locale === "ar" ? "rtl" : "ltr"}
                                  >
                                      <Icon size={20} />
                                      {label}
                                  </Link>
                              </DropdownMenuItem>
                          );
                      })
                    : TeacherProfileButtonLinks.map(({ href, icon, label }, index) => {
                          const Icon: React.ElementType = icon;
                          return (
                              <DropdownMenuItem key={index}>
                                  <Link
                                      className="flex flex-1 items-center justify-start gap-2 text-start"
                                      href={href}
                                      dir={locale === "ar" ? "rtl" : "ltr"}
                                  >
                                      <Icon size={20} />
                                      {label}
                                  </Link>
                              </DropdownMenuItem>
                          );
                      })}
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <Globe className="mr-2 h-4 w-4" />
                        <span>
                            {t("NAVBAR.PROFILE_STUDENT.DROPDOWN.link5")}
                        </span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem onClick={() => switchTo("ar")}>
                            AR
                            {locale === "ar" && (
                                <Check className="ml-auto h-4 w-4" />
                            )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => switchTo("en")}>
                            EN
                            {locale === "en" && (
                                <Check className="ml-auto h-4 w-4" />
                            )}
                        </DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <MoonStar className="mr-2 h-4 w-4" />
                        <span>
                            {t("NAVBAR.PROFILE_STUDENT.DROPDOWN.link6")}
                        </span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            {t("NAVBAR.PROFILE_STUDENT.DROPDOWN.mode1")}
                            {theme === "light" && (
                                <Check className="ml-auto h-4 w-4" />
                            )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            {t("NAVBAR.PROFILE_STUDENT.DROPDOWN.mode2")}
                            {theme === "dark" && (
                                <Check className="ml-auto h-4 w-4" />
                            )}
                        </DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem>
                    <Link
                        className="flex cursor-pointer items-center justify-start gap-2 text-start text-red-500"
                        href="/auth/logout"
                    >
                        <LogOut className="text-red-500" />
                        {t("NAVBAR.PROFILE_STUDENT.DROPDOWN.link7")}
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileButton;
