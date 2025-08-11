"use client";

import ProfileButton from "../sublayout/ProfileButton";
import { Button } from "../ui/button";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const Profile = () => {
    const [user] = useLocalStorage("user", null);

    if (user) {
        return <ProfileButton user={user} />;
    }

    return (
        <div className="flex items-center gap-2">
            <Button className="btn btn-primary bg-gradient-colourful" asChild>
                <Link href="/auth/login">Login</Link>
            </Button>
            <Button variant="outline" asChild>
                <Link href="/auth/signup">Sign Up</Link>
            </Button>
        </div>
    );
};

export default Profile;
