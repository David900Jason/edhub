import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const Footer = () => {
    const t = useTranslations("HOME");

    return (
        <footer className="border-1 border-slate-300 px-4 py-6 shadow-lg dark:border-t dark:border-slate-700">
            <p className="text-muted-foreground text-center text-sm">
                &copy; {new Date().getFullYear()} {t("FOOTER")}{" "}
                <Link
                    href="https://github.com/David900Jason/edhub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold hover:underline"
                >
                    Digital Dreamers
                </Link>
            </p>
        </footer>
    );
};

export default Footer;
