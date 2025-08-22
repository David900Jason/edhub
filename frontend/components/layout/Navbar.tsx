import { Link } from "@/i18n/routing";
import Image from "next/image";
import Profile from "./Profile";

const Navbar = () => {
    return (
        <nav className="mx-4 flex items-center justify-between border-b border-slate-100 bg-white py-4 md:mx-12 lg:mx-24">
            {/* Navbar Logo */}
            <div className="flex items-center gap-2">
                <Image
                    src={"/logo.png"}
                    width={60}
                    height={60}
                    alt="Logo"
                    style={{ width: "auto", height: "auto" }}
                />
                <Link href="/" className="text-2xl font-bold">
                    Edhub
                </Link>
            </div>
            {/* Profile Section */}
            <Profile />
        </nav>
    );
};

export default Navbar;
