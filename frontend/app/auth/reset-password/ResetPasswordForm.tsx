"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ResetPasswordForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get("email");

    const {
        register,
        handleSubmit,
        watch,
        formState: { isSubmitting, errors },
    } = useForm({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: {
        password: string;
        confirmPassword: string;
    }): Promise<void> => {
        // Handle password reset logic
        console.log(data);
        router.push("/auth/login");
    };

    return (
        <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
            <h1 className="text-center text-2xl font-bold">Reset Password</h1>
            <p className="text-center text-gray-600">
                Enter a new password for {email}
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Label htmlFor="password">New Password</Label>
                    <Input
                        id="password"
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
                        <p className="text-sm text-red-500">
                            {errors.password.message as string}
                        </p>
                    )}
                </div>
                <div>
                    <Label htmlFor="confirmPassword">
                        Confirm New Password
                    </Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        {...register("confirmPassword", {
                            required: "Please confirm your password",
                            validate: (value: string) =>
                                value === watch("password") ||
                                "Passwords do not match",
                        })}
                    />
                    {errors.confirmPassword && (
                        <p className="text-sm text-red-500">
                            {errors.confirmPassword.message as string}
                        </p>
                    )}
                </div>
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Resetting..." : "Reset Password"}
                </Button>
            </form>
        </div>
    );
};

export default ResetPasswordForm;
