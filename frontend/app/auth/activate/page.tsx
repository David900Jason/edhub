"use client";

import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { activateUser } from "@/lib/api";
import { useRouter } from "next/navigation";

const ActivateUser = () => {
    const [user, setUser] = useLocalStorage("current_user", null);
    const router = useRouter();

    const token = useSearchParams().get("token");

    useEffect(() => {
        const activateUserLoggedIn = async () => {
            try {
                await activateUser(user?.id as string, token as string);
                router.back();
            } catch (error) {
                console.log(error);
                alert("Activation failed");
            }
        };
        if (!user) {
            throw new Error("User not found");
        }
        activateUserLoggedIn();
    }, []);

    return (
        <div className="flex h-screen w-full place-content-center">
            <div className="flex flex-1 items-center justify-center">
                <Loader2 className="text-primary mr-2 animate-spin" />
                <p className="text-primary text-lg font-bold">Activating ...</p>
            </div>
        </div>
    );
};

export default ActivateUser;
