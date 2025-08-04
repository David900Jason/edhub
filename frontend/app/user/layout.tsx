import Sidebar from "@/components/sublayout/Sidebar";
import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="p-4">{children}</main>
        </div>
    );
};

export default UserLayout;
