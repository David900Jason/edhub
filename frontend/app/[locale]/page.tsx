"use client";

import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sublayout/HeroSection";
import SectionHeading from "@/components/sublayout/SectionHeading";
import Statistics from "@/components/sublayout/Statistics";
import Testimonials from "@/components/sublayout/Testimonials";
import { Link } from "@/i18n/routing";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { stats } from "@/constants";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

const Home = () => {
    const t = useTranslations("HOME");
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.5, // Trigger when 50% of the element is visible
    });

    return (
        <>
            <header className="header-fixed">
                <Navbar />
            </header>
            <main className="dark:bg-gradient-dark mx-auto grid min-h-screen place-content-center text-center">
                <HeroSection />
            </main>
            <section className="py-[5vh]" id="stats" ref={ref}>
                <Statistics inView={inView} stats={stats} />
            </section>
            <section className="py-[15vh]" id="about-us">
                <SectionHeading title={t("ABOUT_US.title")} />
                <div className="mx-auto flex flex-col items-center justify-center gap-12 md:flex-row md:px-14">
                    <div className="flex flex-1 flex-col gap-8 px-8 md:ps-12">
                        <p className="p-lead text-center md:text-start">
                            {t.rich("ABOUT_US.paragraph1", {
                                color: (chunks) => (
                                    <span className="text-primary font-bold">
                                        {chunks}
                                    </span>
                                ),
                            })}
                        </p>
                        <p className="p-lead text-center md:text-start">
                            {t.rich("ABOUT_US.paragraph2", {
                                color: (chunks) => (
                                    <span className="text-primary font-bold">
                                        {chunks}
                                    </span>
                                ),
                            })}
                        </p>
                    </div>
                    <div className="hidden flex-1 items-center justify-center md:flex">
                        <div
                            style={{
                                backgroundImage: "url('/about-us.png')",
                                backgroundSize: "cover",
                                backgroundPosition: "left",
                                backgroundRepeat: "no-repeat",
                            }}
                            className="h-[400px] w-[400px] rounded-full shadow-xl"
                        ></div>
                    </div>
                </div>
            </section>

            <aside
                className="bg-gradient-colourful flex flex-col items-center justify-center gap-4 py-[15vh] text-black"
                id="cta"
            >
                <h1 className="text-center text-5xl font-bold tracking-tighter sm:text-6xl">
                    {t("CTA.title")}
                </h1>
                <p className="p-lead mx-5 text-center !text-white sm:max-w-[65ch]">
                    {t("CTA.description")}
                </p>
                <Button asChild variant="outline">
                    <Link href="/auth/signup">{t("CTA.btn")}</Link>
                </Button>
            </aside>
            <section className="py-[20vh]" id="testimonials">
                <Testimonials />
            </section>
            <Footer />
        </>
    );
};

export default Home;
