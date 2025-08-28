import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

type Locale = 'en' | 'ar';

export default getRequestConfig(async ({ requestLocale }) => {
    // Ensure we have a valid locale
    const locale = (await requestLocale) as Locale;
    const validLocale = routing.locales.includes(locale) ? locale : routing.defaultLocale;

    // Import messages for the locale
    const messages = (await import(`../messages/${validLocale}.json`)).default;

    return {
        locale: validLocale,
        messages,
    };
});
