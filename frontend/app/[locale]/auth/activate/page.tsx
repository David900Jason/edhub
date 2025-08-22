"use client";

import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { updateUserActivation } from "@/lib/api/auth";
import { useRouter } from "@/i18n/routing";

const ActivateUser = () => {
    const [user, setUser] = useLocalStorage("user", null);
    const router = useRouter();

    useEffect(() => {
        const activateUserLoggedIn = async () => {
            try {
                const currentUser = await updateUserActivation(user?.id as string);
                setUser(currentUser);
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
    }, [user, setUser, router]);

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
