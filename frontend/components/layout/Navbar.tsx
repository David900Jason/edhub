import Link from "next/link";
import { GraduationCap } from "lucide-react";
import Profile from "./Profile";

const Navbar = () => {
    return (
        <nav className="mx-4 flex items-center justify-between border-b border-slate-100 bg-white py-4 md:mx-12 lg:mx-24">
            {/* Navbar Logo */}
            <div className="flex items-center gap-2">
                <GraduationCap className="dark:bg-gradient-colourful text-primary h-10 w-10 rounded-full p-1" />
                <Link href="/" className="text-2xl font-bold">
                    Doroosy
                </Link>
            </div>
            {/* Profile Section */}
            <Profile />
        </nav>
    );
};

export default Navbar;
