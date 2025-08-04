import { Button } from "../ui/button";
import { GraduationCap, LogOut, MoonStar, Sheet } from "lucide-react";
import { dashboardLinks } from "@/constants";
import Link from "next/link";

const Sidebar = () => {
    return (
        <div className="bg-primary hidden h-full w-64 flex-col justify-between sm:flex">
            <header>
                <div className="flex items-center gap-3 border-b border-b-gray-400 p-6">
                    <GraduationCap
                        size={32}
                        className="text-primary-foreground"
                    />
                    <h2 className="text-2xl font-bold">EdHub</h2>
                </div>
                <ul className="px-2 py-4">
                    {dashboardLinks.map(
                        (
                            { title, href, icon }: DashboardLinkType,
                            index: number,
                        ) => {
                            const Icon: React.ElementType = icon;
                            return (
                                <li
                                    key={index}
                                    className="mb-2 rounded-lg px-2 py-3 transition-colors hover:bg-white hover:text-black cursor-pointer"
                                >
                                    <Link
                                        className="flex items-center gap-2"
                                        href={href}
                                    >
                                        <Icon
                                            size={24}
                                            className="text-primary-foreground"
                                        />
                                        {title}
                                    </Link>
                                </li>
                            );
                        },
                    )}
                </ul>
            </header>
            <footer className="flex gap-2 p-4 border-t border-t-gray-400">
                <Button variant="ghost" className="cursor-pointer">
                    <MoonStar />
                </Button>
                <Button variant="ghost" className="cursor-pointer">
                    <LogOut />
                    Logout
                </Button>
            </footer>
        </div>
    );
};

export default Sidebar;
