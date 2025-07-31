"use client";

import { FormHeader, InputGroup } from "@/components/";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ForgottenPassword = () => {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;

        // TO DO: implement forgot password logic here
        // Alert success or fail message

        router.push("/reset-password?email=" + email);
    };

    return (
        <>
            <FormHeader
                title="Forgotten Password"
                description="Enter your email address to reset your password"
            />
            <form onSubmit={handleSubmit} className="register-form">
                <InputGroup
                    label="Email:"
                    name="email"
                    type="email"
                    placeholder="Your email address (e.g. example@gmail.com)"
                />
                <Button type="submit" className="btn btn-primary">
                    Reset password
                </Button>
            </form>
        </>
    );
};

export default ForgottenPassword;
