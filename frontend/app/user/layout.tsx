import ProfileButton from "@/components/sublayout/ProfileButton";
import Sidebar from "@/components/sublayout/Sidebar";
import { ArrowLeft, SidebarOpen } from "lucide-react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1">
                <nav className="flex items-center justify-between border-b border-slate-200 p-6">
                    <div className="flex items-center gap-2">
                        <ArrowLeft />
                        <SidebarOpen className="block sm:hidden" />
                    </div>
                    <ProfileButton name="Ahmed" image="/logo.png" />
                </nav>
                {children}
            </main>
        </div>
    );
};

export default UserLayout;
