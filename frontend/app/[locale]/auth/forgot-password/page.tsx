"use client";

import FormHeader from "@/components/auth/FormHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { useForm, SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils";
import { getUserByEmail } from "@/lib/api/auth";

interface ForgotPasswordFormData {
    email: string;
}

const ForgottenPassword = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors, isValid },
    } = useForm<ForgotPasswordFormData>();

    const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (!isValid) {
            return;
        }

        const user = await getUserByEmail(data.email);
        if (!user) {
            throw new Error("User not found");
        }

        alert("Email found Successfully");

        // Alert success or fail message
        router.push("/auth/reset-password?email=" + data.email);
    };

    return (
        <>
            <FormHeader
                title="Forgotten Password"
                description="Enter your email address to reset your password"
            />
            <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                <div className="input-group">
                    <Label className="mb-2" htmlFor="email">
                        Your Email Address
                    </Label>
                    <Input
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format",
                            },
                        })}
                        placeholder="Enter your email address (e.g. example@gmail.com)"
                        type="text"
                    />
                    {errors.email && (
                        <p className="input-error">
                            <AlertCircle className="inline h-4 w-4" />{" "}
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                        "btn btn-primary",
                        isSubmitting && "btn-loading",
                    )}
                >
                    {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        "Reset Password"
                    )}
                </Button>
            </form>
        </>
    );
};

export default ForgottenPassword;
