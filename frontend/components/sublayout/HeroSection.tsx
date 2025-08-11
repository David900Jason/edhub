import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
    return (
        <>
            <h1 className="max-w-[800px] text-6xl leading-[1.2] font-bold tracking-tighter">
                Empowering Online Education with{" "}
                <span className="text-primary dark:bg-gradient-to-r dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 dark:bg-clip-text dark:text-transparent">
                    Doroosy
                </span>
                .
            </h1>
            <p className="p-lead mx-auto mt-4 max-w-[600px]">
                Your gateway to quality education, expert instructors, and
                interactive courses — all in one place.
            </p>
            <div className="mt-8 flex justify-center gap-4">
                <Button className="btn btn-primary" variant="default">
                    <Link href="/signup">Get started</Link>
                </Button>
                <Button className="btn" variant="outline">
                    <Link href="/courses">Check it out</Link>
                </Button>
            </div>
        </>
    );
};

export default HeroSection;
