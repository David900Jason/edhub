import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";

const PersonalDetails = ({
    register,
    errors,
    watch,
}: {
    register: UseFormRegister<SignupFormType>;
    errors: FieldErrors<SignupFormType>;
    watch: UseFormWatch<SignupFormType>;
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const t = useTranslations("AUTH_FORMS");
    const locale = useLocale();

    return (
        <>
            {/* Name Input */}
            <div className="input-group">
                <Label className="mb-2" htmlFor="full_name">
                    {t("SIGN_UP.FULL_NAME.label")}
                </Label>
                <Input
                    {...register("full_name", {
                        required: t("SIGN_UP.FULL_NAME.req_msg"),
                        minLength: {
                            value: 3,
                            message: t("SIGN_UP.FULL_NAME.min_msg"),
                        },
                        maxLength: {
                            value: 50,
                            message: t("SIGN_UP.FULL_NAME.max_msg"),
                        },
                        pattern: {
                            value: /^[a-zA-Z ]+$/,
                            message: t("SIGN_UP.FULL_NAME.pattern_msg"),
                        },
                    })}
                    placeholder={t("SIGN_UP.FULL_NAME.placeholder")}
                    type="text"
                />
                {errors.full_name && (
                    <p className="input-error">
                        <AlertCircle className="inline h-4 w-4" />{" "}
                        {errors.full_name.message}
                    </p>
                )}
            </div>
            {/* Email Input */}
            <div className="input-group">
                <Label className="mb-2" htmlFor="email">
                    {t("SIGN_UP.EMAIL.label")}
                </Label>
                <Input
                    {...register("email", {
                        required: t("SIGN_UP.EMAIL.req_msg"),
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: t("SIGN_UP.EMAIL.pattern_msg"),
                        },
                    })}
                    placeholder={t("SIGN_UP.EMAIL.placeholder")}
                    type="email"
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
                    {t("SIGN_UP.PASSWORD.label")}
                </Label>
                <Input
                    {...register("password", {
                        required: t("SIGN_UP.PASSWORD.req_msg"),
                        minLength: {
                            value: 8,
                            message: t("SIGN_UP.PASSWORD.min_msg"),
                        },
                        maxLength: {
                            value: 20,
                            message: t("SIGN_UP.PASSWORD.max_msg"),
                        },
                    })}
                    placeholder={t("SIGN_UP.PASSWORD.placeholder")}
                    type={showPassword ? "text" : "password"}
                />
                <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute top-5.5 cursor-pointer rounded-none !bg-transparent text-gray-500 hover:!bg-transparent ${locale === "ar" ? "left-0" : "right-0"}`}
                >
                    {showPassword ? <Eye /> : <EyeOff />}
                </Button>
                {errors.password && (
                    <p className="input-error">
                        <AlertCircle className="inline h-4 w-4" />{" "}
                        {errors.password.message}
                    </p>
                )}
            </div>
            {/* Confirm Password Input */}
            <div className="input-group relative">
                <Label className="mb-2" htmlFor="confirm_password">
                    {t("SIGN_UP.CONFIRM_PASSWORD.label")}
                </Label>
                <Input
                    {...register("confirm_password", {
                        required: t("SIGN_UP.CONFIRM_PASSWORD.req_msg"),
                        validate: (value: string | undefined) =>
                            !value ||
                            value === watch("password") ||
                            t("SIGN_UP.CONFIRM_PASSWORD.mat_msg"),
                    })}
                    placeholder={t("SIGN_UP.CONFIRM_PASSWORD.placeholder")}
                    type={showConfirmPassword ? "text" : "password"}
                />
                <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute top-5.5 cursor-pointer !bg-transparent text-gray-500 hover:!bg-transparent ${locale === "ar" ? "left-0" : "right-0"}`}
                >
                    {showConfirmPassword ? <Eye /> : <EyeOff />}
                </Button>
                {errors.confirm_password && (
                    <p className="input-error">
                        <AlertCircle className="inline h-4 w-4" />{" "}
                        {errors.confirm_password.message}
                    </p>
                )}
            </div>
        </>
    );
};

export default PersonalDetails;
