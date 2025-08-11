"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import ProfileButton from "../sublayout/ProfileButton";

const NavbarClient = () => {
    const [user] = useLocalStorage("user", null);

    if (!user) {
        // You can add login/signup buttons here for non-logged-in users
        return null;
    }

    return <ProfileButton user={user} />;
};

export default NavbarClient;
