"use client";

import { useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const Logout = () => {
    const [user, setUser] = useLocalStorage("current_user", null);
    const router = useRouter();

    useEffect(() => {
        const validateUser = async () => {
            if (!user) {
                alert("You are not logged in");
                router.push("/auth/login");
            }

            await new Promise((resolve) => setTimeout(resolve, 1000));

            // If user exists, remove it from localStorage and redirect to login page
            setUser(null);
            router.push("/auth/login");
        };
        validateUser();
    }, []);

    return (
        <div className="flex h-screen w-full place-content-center">
            <div className="flex flex-1 items-center justify-center">
                <Loader2 className="text-primary mr-2 animate-spin" />
                <p className="text-primary text-lg font-bold">
                    Loging out ...
                </p>
            </div>
        </div>
    );
};

export default Logout;
