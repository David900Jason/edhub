"use client";

import { FormHeader, InputGroup } from "@/components/";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";

const resetPassword = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const email = searchParams.get("email");

        const formData = new FormData(e.currentTarget);
        const password = formData.get("password") as string;
        
        // TO DO: implement password reset logic here
        
        router.push("/login");
    };
    return (
        <>
            <FormHeader
                title="Reset Password"
                description="Enter your email address to reset your password"
            />
            <form onSubmit={handleSubmit} className="register-form">
                <InputGroup
                    label="Password:"
                    name="password"
                    type="password"
                    placeholder="Your new password (8 characters min.)"
                />
                <Button type="submit" className="btn btn-primary">
                    Reset password
                </Button>
            </form>
        </>
    );
};

export default resetPassword;
