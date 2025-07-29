import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
    variable: "--font-ibm-plex-sans",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    fallback: ["sans-serif"],
});

export const metadata: Metadata = {
    title: "EdHub - Smarter Desicions behind Logic",
    description:
        "A platform built to help mid-level teachers afford their online teaching careers and aims at helping them start their own businesses.",
    icons: {
        icon: "/logo.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${ibmPlexSans.variable} font-sans`}>{children}</body>
        </html>
    );
}
