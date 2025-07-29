import Link from "next/link";
import Image from "next/image";

const Navbar = ({ navLinks = [] }: { navLinks: NavbarLinkType[] }) => {
    return (
        <nav className="mx-4 flex items-center justify-between border-b border-slate-100 bg-white py-4 md:mx-12 lg:mx-24">
            {/* Navbar Logo */}
            <div className="flex items-center gap-2">
                <Image src="/logo.png" alt="Logo" width={48} height={48} />
                <span className="text-2xl font-bold">Edhub</span>
            </div>
            {/* Navbar Links */}
            <ul className="nav-links flex gap-6">
                {navLinks.map(({ title, href, icon }, index) => {
                    const Icon = icon;
                    return (
                        <li
                            className="hover:text-primary flex items-center gap-2"
                            key={index}
                        >
                            <Icon />
                            <Link href={href}>{title}</Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Navbar;
