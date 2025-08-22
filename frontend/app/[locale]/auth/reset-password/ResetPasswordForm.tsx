"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormHeader from "@/components/auth/FormHeader";

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
        router.push("/auth/login");
    };

    return (
        <>
            <FormHeader
                title="Reset Password"
                description={`Enter a new password for ${email}`}
            />
            <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                <div>
                    <Label className="mb-2" htmlFor="password">
                        New Password
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        className="border border-slate-300"
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
                    <Label className="mb-2" htmlFor="confirmPassword">
                        Confirm New Password
                    </Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        className="border border-slate-300"
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
        </>
    );
};

export default ResetPasswordForm;
