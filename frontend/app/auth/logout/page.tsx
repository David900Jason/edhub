"use client";

import { useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const Logout = () => {
    const [user, setUser] = useLocalStorage("user", null);
    const router = useRouter();

    useEffect(() => {
        const validateUser = async () => {
            // Check if user exists
            if (!user) {
                alert("You are not logged in");
                router.push("/auth/login");
                return;
            }

            await new Promise((resolve) => setTimeout(resolve, 2000));
            router.push("/");
            setUser(null);
            return;
        };
        validateUser();
    }, []);

    return (
        <div className="flex h-screen w-full place-content-center">
            <div className="flex flex-1 items-center justify-center">
                <Loader2 className="text-primary mr-2 animate-spin" />
                <p className="text-primary text-lg font-bold">Loging out ...</p>
            </div>
        </div>
    );
};

export default Logout;
