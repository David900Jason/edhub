// middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
    // match root and locale-prefixed routes
    matcher: ["/", "/(en|ar)/:path*"],
};
