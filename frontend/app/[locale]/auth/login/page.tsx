"use client";

import { useState } from "react";
import FormHeader from "@/components/auth/FormHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "@/i18n/routing";

import { useForm, SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

interface LoginFormData {
    email: string;
    password: string;
}

const Login = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations("AUTH_FORMS");

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors, isValid },
    } = useForm<LoginFormData>();

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        // Delay the function with a promise for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (!isValid) {
            return;
        }

        const res = await fetch(`/${locale}/api/auth`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            }),
        });

        const resData = await res.json();
        console.log(resData.user);

        if (resData.success) {
            localStorage.setItem("user", JSON.stringify(resData.user));
            router.push(`/dashboard`);
        } else {
            alert(resData.error);
        }
    };

    return (
        <>
            {/* Form Heading */}
            <FormHeader
                title={t("LOG_IN.title")}
                description={t("LOG_IN.description")}
            />
            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                {/* Email Input */}
                <div className="input-group">
                    <Label className="mb-2" htmlFor="email">
                        {t("LOG_IN.EMAIL.label")}
                    </Label>
                    <Input
                        placeholder={t("LOG_IN.EMAIL.placeholder")}
                        type="email"
                        {...register("email", {
                            required: t("LOG_IN.EMAIL.req_msg"),
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: t("LOG_IN.EMAIL.pattern_msg"),
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
                        {t("LOG_IN.PASSWORD.label")}
                    </Label>
                    <Input
                        placeholder={t("LOG_IN.PASSWORD.placeholder")}
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                            required: t("LOG_IN.PASSWORD.req_msg"),
                            minLength: {
                                value: 8,
                                message: t("LOG_IN.PASSWORD.len_msg"),
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
                        className={`absolute top-5.5 cursor-pointer rounded-md text-gray-500 !bg-transparent hover:!bg-transparent ${locale === "ar" ? "left-0" : "right-0"}`}
                    >
                        {showPassword ? <Eye /> : <EyeOff />}
                    </Button>
                </div>
                {/* Remember me */}
                <div className="flex items-center justify-start">
                    <Link
                        href="/auth/forgot-password"
                        className="text-primary text-sm"
                    >
                        {t("LOG_IN.forgot_password")}
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
                        t("LOG_IN.btn")
                    )}
                </Button>
                {/* Don't have an account? */}
                <p className="text-center text-sm text-gray-600">
                    {t("LOG_IN.have_account")}{" "}
                    <Link href="/auth/signup" className="text-primary text-sm">
                        {t("LOG_IN.sign_up")}
                    </Link>
                </p>
            </form>
        </>
    );
};

export default Login;
