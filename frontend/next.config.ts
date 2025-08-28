import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: "/media/:path*",
                destination: "https://145.223.81.248:8000/media/:path*",
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "dummyimage.com",
            },
            {
                protocol: "https",
                hostname: "145.223.81.248",
                port: "8000",
            },
            {
                protocol: "http",
                hostname: "127.0.0.1",
                port: "8000",
            },
        ],
    },
    allowedDevOrigins: ["http://localhost:3000", "http://192.168.1.12:3000"],
};

export default withNextIntl(nextConfig);
