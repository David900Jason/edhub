"use client";

import { useState } from "react";
import FormHeader from "@/components/auth/FormHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

import { useForm, SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils";
import { loginUser } from "@/lib/api";
import { useRouter } from "next/navigation";

interface LoginFormData {
    email: string;
    password: string;
}

const Login = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors, isValid },
    } = useForm<LoginFormData>();

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        // Delay the function with a promise for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (!isValid) {
            return;
        }

        alert("Login successfully");

        const user = await loginUser(data);
        if (!user) {
            throw new Error("User not found");
        }
        
        localStorage.setItem("current_user", JSON.stringify(user));
        router.push("/");
    };

    return (
        <>
            {/* Form Heading */}
            <FormHeader
                title="Login to your account"
                description="Enter your email and password to login"
            />
            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                {/* Email Input */}
                <div className="input-group">
                    <Label className="mb-2" htmlFor="email">
                        Email
                    </Label>
                    <Input
                        placeholder="Your email address (e.g. example@gmail.com)"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format",
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="input-error">
                            <AlertCircle className="inline h-4 w-4" />{" "}
                            {errors.email.message}
                        </p>
                    )}
                </div>
                {/* Password Input */}
                <div className="input-group relative">
                    <Label className="mb-2" htmlFor="password">
                        Password
                    </Label>
                    <Input
                        placeholder="Your password"
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters long",
                            },
                        })}
                    />
                    {errors.password && (
                        <p className="input-error">
                            <AlertCircle className="inline h-4 w-4" />{" "}
                            {errors.password.message}
                        </p>
                    )}
                    <Button
                        variant="ghost"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-5.5 right-0 cursor-pointer rounded-none border-s-[1px] border-s-gray-300 text-gray-500 hover:bg-transparent dark:bg-black"
                    >
                        {showPassword ? <Eye /> : <EyeOff />}
                    </Button>
                </div>
                {/* Remember me */}
                <div className="flex items-center justify-start">
                    <Link
                        href="/forgot-password"
                        className="text-primary text-sm"
                    >
                        Forgot password?
                    </Link>
                </div>
                {/* Submit Button */}
                <Button
                    type="submit"
                    className={cn(
                        "btn btn-primary text-sm",
                        isSubmitting && "btn-loading",
                    )}
                    disabled={isSubmitting}
                    onClick={handleSubmit(onSubmit)}
                >
                    {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        "Login"
                    )}
                </Button>
                {/* Don't have an account? */}
                <p className="text-center text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link href="/auth/signup" className="text-primary text-sm">
                        Sign Up
                    </Link>
                </p>
            </form>
        </>
    );
};

export default Login;
