"use client";

import { navLinks } from "@/constants";
import Navbar from "@/components/layout/Navbar";

const CourseLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <header className="header-sticky">
                <Navbar navLinks={navLinks} />
            </header>
            {children}
        </>
    );
};

export default CourseLayout;
