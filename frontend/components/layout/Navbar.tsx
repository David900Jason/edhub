"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";

const Navbar = ({
    navLinks = [],
    isAuthenticated,
}: {
    navLinks: NavbarLinkType[];
    isAuthenticated?: boolean;
}) => {
    return (
        <nav className="mx-4 flex items-center justify-between border-b border-slate-100 bg-white py-4 md:mx-12 lg:mx-24">
            {/* Navbar Logo */}{" "}
            <div className="flex items-center gap-2">
                <GraduationCap className="text-primary h-10 w-10" />
                <Link href="/" className="text-2xl font-bold">
                    Edhub
                </Link>
            </div>
            {/* Navbar Links */}
            {isAuthenticated ? (
                <p></p>
            ) : (
                <ul className="nav-links flex gap-6">
                    {navLinks.map(({ title, href, icon }, index) => {
                        const Icon = icon;
                        return (
                            <li
                                className="hover:text-primary flex items-center gap-2"
                                key={index}
                            >
                                <Icon className="h-6 w-6" />
                                <Link href={href}>{title}</Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
