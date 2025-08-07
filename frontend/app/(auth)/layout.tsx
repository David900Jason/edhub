import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex min-h-screen gap-12">{children}</div>;
};

export default AuthLayout;
