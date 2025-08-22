import type { Metadata } from "next";
import { IBM_Plex_Sans, Noto_Kufi_Arabic } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/lib/query-client";

import "./globals.css";
import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import getRequestConfig from "@/i18n/request";

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

export default async function RootLayout({
    children,
    params: { locale: localeParam }
}: {
    children: React.ReactNode;
    params: { locale: string | Promise<string> };
}) {
    // Handle both Locale and Promise<Locale> for locale
    const locale = typeof localeParam === 'string' ? localeParam : await localeParam;
    
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const theme = (await cookies()).get("theme")?.value || "light";
    const { messages } = await getRequestConfig({ requestLocale: Promise.resolve(locale) });

    return (
        <html lang={locale} className={theme} style={{ colorScheme: theme }} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <body className={`${ibmPlexSans.variable} font-sans`}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <QueryProvider>
                            {children}
                            <Toaster />
                        </QueryProvider>
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}


