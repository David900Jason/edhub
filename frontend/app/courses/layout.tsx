"use client";

import Navbar from "@/components/layout/Navbar";

const CourseLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <header className="header-sticky">
                <Navbar />
            </header>
            {children}
        </>
    );
};

export default CourseLayout;
