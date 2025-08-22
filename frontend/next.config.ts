import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "dummyimage.com",
            },
        ],
    },
    allowedDevOrigins: ["http://localhost:3000", "http://192.168.1.12:3000"],
};

export default withNextIntl(nextConfig);
