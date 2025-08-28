import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import getRequestConfig from "@/i18n/request";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
    variable: "--font-ibm-plex-sans",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    fallback: ["sans-serif"],
});

export const metadata: Metadata = {
    title: "Edhub - Smarter Desicions behind Logic",
    description:
        "A platform built to help mid-level teachers afford their online teaching careers and aims at helping them start their own businesses.",
    icons: {
        icon: "/logo.png",
    },
};

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function RootLayout({
    children,
    params,
}: Props) {
    // Ensure the locale is valid
    const { locale: localeParam } = await params;
    const locale = (localeParam as string) as "en" | "ar";
    
    if (!routing.locales.includes(locale)) {
        notFound();
    }

    const theme = (await cookies()).get("theme")?.value || "light";
    const { messages } = await getRequestConfig({
        requestLocale: Promise.resolve(locale),
    });

    return (
        <html
            lang={locale}
            className={theme}
            style={{ colorScheme: theme }}
            dir={locale === "ar" ? "rtl" : "ltr"}
        >
            <body className={`${ibmPlexSans.variable} font-sans`}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                        <Toaster richColors />
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
