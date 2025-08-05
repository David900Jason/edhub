import Sidebar from "@/components/sublayout/Sidebar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            <Sidebar />
            {children}
        </div>
    );
};

export default UserLayout;
