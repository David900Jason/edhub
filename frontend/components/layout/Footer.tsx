import { Link } from "@/i18n/routing";
import { Facebook, Instagram } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Footer = () => {
    const t = useTranslations("HOME");

    return (
        <footer className="border-t border-slate-300 px-4 py-20 shadow-lg sm:px-24 dark:border-t dark:border-slate-700">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div>
                    <figure className="mb-4 flex items-center gap-2">
                        <Image
                            src={"/logo.png"}
                            width={40}
                            height={40}
                            alt="Logo"
                        />
                        <figcaption className="sr-only">
                            EdHub
                        </figcaption>
                    </figure>
                    <p className="text-muted-foreground max-w-[30ch] text-sm">
                        Your gateway to quality education, expert instructors,
                        and interactive courses — all in one place.
                    </p>
                </div>
                <div>
                    <h3 className="mb-4 text-xl font-bold">Quick Links</h3>
                    <ul>
                        <li className="p-lead">
                            <Link href="#about-us">About us</Link>
                        </li>
                        <li className="p-lead">
                            <Link href="/courses">Courses</Link>
                        </li>
                        <li className="p-lead">
                            <Link href="/terms-of-use">Terms of Use</Link>
                        </li>
                        <li className="p-lead">
                            <Link href="/privacy-policy">Privacy Policy</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="mb-4 text-xl font-bold">Support & Help</h3>
                    <ul>
                        <li className="p-lead">
                            <Link href="/contact">Contact Us</Link>
                        </li>
                        <li className="p-lead">
                            <Link href="#faq">FAQ</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="mb-4 text-xl font-bold">Social Links</h3>
                    <ul className="flex gap-2">
                        <li className="p-lead">
                            <Link
                                target="_blank"
                                href="https://www.facebook.com/profile.php?id=61578880064392"
                                className="hover:text-blue-600"
                            >
                                <Facebook />
                            </Link>
                        </li>
                        <li className="p-lead">
                            <Link
                                target="_blank"
                                href="https://www.instagram.com/digital.dreamers.edhub/?igsh=Y2ZqZ3pqZXo4Y2hu#"
                                className="hover:text-pink-600"
                            >
                                <Instagram />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <hr className="my-6 mt-16" />
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
