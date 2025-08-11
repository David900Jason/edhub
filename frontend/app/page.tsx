"use client";

import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sublayout/HeroSection";
import SectionHeading from "@/components/sublayout/SectionHeading";
import Statistics from "@/components/sublayout/Statistics";
import Testimonials from "@/components/sublayout/Testimonials";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { stats } from "@/constants";
import { useInView } from "react-intersection-observer";

const Home = () => {
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
                <SectionHeading title="About us" />
                <div className="mx-auto flex flex-col items-center justify-center gap-12 md:flex-row md:px-14">
                    <div className="flex flex-1 flex-col gap-8 px-8 md:ps-12">
                        <p className="p-lead text-center md:text-start">
                            At{" "}
                            <span className="bg-text-gradient-colourful font-bold">
                                Doroosy
                            </span>
                            , we believe that education should be accessible,
                            engaging, and empowering. Our mission is to connect
                            learners with high-quality content, expert
                            instructors, and a supportive community that fosters
                            growth.
                        </p>
                        <p className="p-lead text-center md:text-start">
                            Whether you&apos;re preparing for exams, developing
                            new skills, or exploring new interests,{" "}
                            <span className="bg-text-gradient-colourful font-bold">
                                Doroosy
                            </span>{" "}
                            provides the tools and resources to help you succeed
                            — anytime, anywhere. With a strong focus on
                            innovation, integrity, and inclusivity, we aim to
                            become a global hub for learners who are passionate
                            about continuous learning and self-improvement.
                        </p>
                        <Button
                            className="btn btn-primary mx-auto w-fit md:mx-0"
                            variant="default"
                        >
                            Learn more
                        </Button>
                    </div>
                    <div className="hidden flex-1 items-center justify-center md:flex">
                        <div className="bg-gradient-colourful h-[400px] w-[400px] rounded-full shadow-xl"></div>
                    </div>
                </div>
            </section>

            <aside
                className="bg-gradient-colourful flex flex-col items-center justify-center gap-4 py-[15vh] text-black"
                id="cta"
            >
                <h1 className="text-center text-6xl font-bold tracking-tighter">
                    Ready to get started?
                </h1>
                <p className="p-lead max-w-[65ch] text-center !text-white">
                    Check out our awesome and amazing courses brought to you by
                    our fully-competent teachers. Sign up now and start
                    learning!
                </p>
                <Button className="btn" variant="outline">
                    <Link href="/signup">Get started</Link>
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
