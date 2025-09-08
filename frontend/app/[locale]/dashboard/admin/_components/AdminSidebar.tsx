import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/i18n/routing";
import {
    Book,
    BookOpen,
    CreditCard,
    GraduationCap,
    Home,
    LogOut,
    MessageCircle,
    MoonStar,
    Settings,
    User,
    Users,
    Video,
} from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";

const AdminSidebar = () => {
    const { theme, setTheme } = useTheme();

    return (
        <aside className="sticky top-0 left-0 flex min-h-screen flex-col">
            <header>
                <div className="flex items-center gap-2 p-6">
                    <Image src="/logo.png" alt="logo" width={64} height={64} />
                    <h1 className="text-2xl font-semibold">
                        <Link href="/">Edhub</Link>
                    </h1>
                </div>
            </header>
            <main className="flex-1">
                <ul className="flex flex-col gap-2 p-2">
                    <li className="rounded-xl p-2 py-3 text-purple-300 hover:bg-purple-800">
                        <Link
                            className="flex items-center gap-2 text-base"
                            href="/dashboard/admin"
                        >
                            <Home />
                            Home
                        </Link>
                    </li>
                    <li className="rounded-xl p-2 py-3 text-purple-300 hover:bg-purple-800">
                        <Link
                            className="flex items-center gap-2 text-base"
                            href="/dashboard/admin/students"
                        >
                            <Users />
                            Students
                        </Link>
                    </li>
                    <li className="rounded-xl p-2 py-3 text-purple-300 hover:bg-purple-800">
                        <Link
                            className="flex items-center gap-2 text-base"
                            href="/dashboard/admin/teachers"
                        >
                            <GraduationCap />
                            Teachers
                        </Link>
                    </li>
                    <li className="rounded-xl p-2 py-3 text-purple-300 hover:bg-purple-800">
                        <Link
                            className="flex items-center gap-2 text-base"
                            href="/dashboard/admin/subscriptions"
                        >
                            <CreditCard />
                            Subscriptions
                        </Link>
                    </li>
                    <li className="rounded-xl p-2 py-3 text-purple-300 hover:bg-purple-800">
                        <Link
                            className="flex items-center gap-2 text-base"
                            href="/dashboard/admin/courses"
                        >
                            <BookOpen />
                            Courses
                        </Link>
                    </li>
                    <li className="rounded-xl p-2 py-3 text-purple-300 hover:bg-purple-800">
                        <Link
                            className="flex items-center gap-2 text-base"
                            href="/dashboard/admin/videos"
                        >
                            <Video />
                            Videos
                        </Link>
                    </li>
                    <li className="rounded-xl p-2 py-3 text-purple-300 hover:bg-purple-800">
                        <Link
                            className="flex items-center gap-2 text-base"
                            href="/dashboard/admin/books"
                        >
                            <Book />
                            Books
                        </Link>
                    </li>
                    <li className="rounded-xl p-2 py-3 text-purple-300 hover:bg-purple-800">
                        <Link
                            className="flex items-center gap-2 text-base"
                            href="/dashboard/admin/contact"
                        >
                            <MessageCircle />
                            Messages
                        </Link>
                    </li>
                </ul>
            </main>
            <footer className="flex items-center justify-end p-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="cursor-pointer">
                            <Settings size={24} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                        <DropdownMenuItem>
                            <Link
                                className="flex items-center gap-2"
                                href="/dashboard/teacher/profile"
                            >
                                <User size={20} /> Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                setTheme(theme === "dark" ? "light" : "dark")
                            }
                        >
                            <MoonStar size={20} /> Theme
                            <DropdownMenuShortcut>
                                {theme === "dark" ? "Light" : "Dark"}
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link
                                className="flex items-center gap-2 text-red-500"
                                href="/auth/logout"
                            >
                                <LogOut className="text-red-500" size={20} />{" "}
                                Log out
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </footer>
        </aside>
    );
};

export default AdminSidebar;
