"use client";

import { navLinks } from "@/constants";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const CourseLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <header className="header-sticky">
                <Navbar navLinks={navLinks} />
            </header>
            {children}
            <Footer />
        </>
    );
};

export default CourseLayout;
