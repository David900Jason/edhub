import { Link } from "@/i18n/routing";
import {
    Book,
    BookOpen,
    CreditCard,
    GraduationCap,
    User,
    Users,
    Video,
} from "lucide-react";
import Image from "next/image";

const AdminSidebar = () => {
    return (
        <aside className="sticky top-0 left-0">
            <header>
                <div className="flex items-center gap-2 p-6">
                    <Image src="/logo.png" alt="logo" width={64} height={64} />
                    <h1 className="text-2xl font-semibold">EdHub</h1>
                </div>
            </header>
            <main>
                <ul className="mt-2 flex flex-col gap-2 p-2">
                    <li className="rounded-xl p-2 py-3 text-purple-300 hover:bg-purple-800">
                        <Link
                            className="flex items-center gap-2 text-base"
                            href="/dashboard/admin/profile"
                        >
                            <User />
                            Profile
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
                </ul>
            </main>
            <footer></footer>
        </aside>
    );
};

export default AdminSidebar;
