"use client";

import FormHeader from "@/components/auth/FormHeader";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ResetPasswordFormData {
    password: string;
}

const ResetPassword = () => {
    // const searchParams = useSearchParams();
    const router = useRouter();
    // const email = searchParams.get("email");

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors, isValid },
    } = useForm<ResetPasswordFormData>();

    const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (!isValid) {
            return;
        }

        alert("Password reset successfully!");

        // TODO: Edit user with email as a query and password as the new change
        console.log(data);

        // TO DO: implement password reset logic here
        router.push("/auth/login");
    };
    return (
        <>
            <FormHeader
                title="Reset Password"
                description="Enter your email address to reset your password"
            />
            <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                <div className="input-group">
                    <Label className="mb-2" htmlFor="password">
                        New Password
                    </Label>
                    <Input
                        placeholder="Your new password"
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message:
                                    "Password must be at least 8 characters long",
                            },
                        })}
                    />
                    {errors.password && (
                        <p className="input-error">
                            <AlertCircle className="inline h-4 w-4" />{" "}
                            {errors.password.message}
                        </p>
                    )}
                </div>
                {errors.password && (
                    <p className="input-error">
                        <AlertCircle className="inline h-4 w-4" />{" "}
                        {errors.password.message}
                    </p>
                )}
                <Button
                    type="submit"
                    className={cn(
                        "btn btn-primary",
                        isSubmitting && "btn-loading",
                    )}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        "Reset password"
                    )}
                </Button>
            </form>
        </>
    );
};

export default ResetPassword;
