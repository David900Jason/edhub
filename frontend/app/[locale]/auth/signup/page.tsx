"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/auth/DatePicker";
import FormHeader from "@/components/auth/FormHeader";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertCircle, Eye, EyeOff, Loader2, PlusCircle } from "lucide-react";
import { Link, useRouter } from "@/i18n/routing";
import { useForm, SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { signUpUser } from "@/lib/api/auth";
import { useLocale, useTranslations } from "next-intl";

const convertDate = (date: Date) => {
    const year = date.getFullYear();
    const mon = date.getMonth();
    const day = date.getDay();

    return `${year}-${mon < 10 ? `0${mon}` : mon}-${day < 10 ? `0${day}` : day}`;
};

const Signup = () => {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations("AUTH_FORMS");
    const cities = t.raw("SIGN_UP.CITY.cities") as string[];
    const [date, setDate] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { isSubmitting, errors, isValid },
    } = useForm<SignupFormType>();

    const onSubmit: SubmitHandler<SignupFormType> = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (!isValid) return;

        // TODO: Add API call to create user (Submit form)
        await signUpUser({
            full_name: data.full_name,
            email: data.email,
            password: data.password,
            city: data.city,
            phone_number: data.phone_number,
            parent_number: data.parent_number,
            role: data.role,
            birth_date: convertDate(new Date(date as string)),
        });

        // Push router to verify page
        router.push("/auth/login");
    };

    return (
        <>
            <FormHeader
                title={t("SIGN_UP.title")}
                description={t("SIGN_UP.description")}
            />
            {/* Sign Up Form */}
            <form
                method="post"
                className="register-form"
                onSubmit={handleSubmit(onSubmit)}
            >
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
                            validate: (value) =>
                                value === watch("password") ||
                                t("SIGN_UP.CONFIRM_PASSWORD.mat_msg"),
                        })}
                        placeholder={t("SIGN_UP.CONFIRM_PASSWORD.placeholder")}
                        type={showConfirmPassword ? "text" : "password"}
                    />
                    <Button
                        variant="ghost"
                        type="button"
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
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
                {/* Phone Input */}
                <div className="input-group">
                    <Label className="mb-2" htmlFor="phone_number">
                        {t("SIGN_UP.PHONE_NUMBER.label")}
                    </Label>
                    <Input
                        {...register("phone_number", {
                            required: t("SIGN_UP.PHONE_NUMBER.req_msg"),
                            pattern: {
                                value: /^[0-9]{11}$/,
                                message: t("SIGN_UP.PHONE_NUMBER.pattern_msg"),
                            },
                            maxLength: {
                                value: 11,
                                message: t("SIGN_UP.PHONE_NUMBER.max_msg"),
                            },
                        })}
                        placeholder={t("SIGN_UP.PHONE_NUMBER.placeholder")}
                        type="tel"
                        dir={locale === "ar" ? "rtl" : "ltr"}
                    />
                    {errors.phone_number && (
                        <p className="input-error">
                            <AlertCircle className="inline h-4 w-4" />{" "}
                            {errors.phone_number.message}
                        </p>
                    )}
                </div>
                {/* Parent Phone Input */}
                <div className="input-group">
                    <Label className="mb-2" htmlFor="parent_number">
                        {t("SIGN_UP.PARENT_PHONE_NUMBER.label")}
                    </Label>
                    <Input
                        {...register("parent_number", {
                            required:
                                watch("role") === "teacher"
                                    ? false
                                    : t("SIGN_UP.PARENT_PHONE_NUMBER.req_msg"),
                            pattern: {
                                value: /^[0-9]{11}$/,
                                message: t(
                                    "SIGN_UP.PARENT_PHONE_NUMBER.pattern_msg",
                                ),
                            },
                            maxLength: {
                                value: 11,
                                message: t(
                                    "SIGN_UP.PARENT_PHONE_NUMBER.max_msg",
                                ),
                            },
                        })}
                        placeholder={t(
                            "SIGN_UP.PARENT_PHONE_NUMBER.placeholder",
                        )}
                        type="tel"
                        dir={locale === "ar" ? "rtl" : "ltr"}
                    />
                    {errors.parent_number && (
                        <p className="input-error">
                            <AlertCircle className="inline h-4 w-4" />{" "}
                            {errors.parent_number.message}
                        </p>
                    )}
                </div>
                {/* Date of birth */}
                <DatePicker
                    date={date ? new Date(date) : null}
                    setDate={(date) => setDate(date?.toISOString() || null)}
                />
                {/* Select role */}
                <div className="input-group">
                    <Label className="mb-2" htmlFor="role">
                        {t("SIGN_UP.ROLE.label")}
                    </Label>
                    <Select
                        onValueChange={(value) => {
                            register("role").onChange({
                                target: {
                                    name: "role",
                                    value: value,
                                },
                            });
                        }}
                        {...register("role")}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue
                                placeholder={t("SIGN_UP.ROLE.placeholder")}
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="student">
                                    {t("SIGN_UP.ROLE.option1")}
                                </SelectItem>
                                <SelectItem value="teacher">
                                    {t("SIGN_UP.ROLE.option2")}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {/* Select City */}
                <div className="input-group">
                    <Label className="mb-2" htmlFor="city">
                        {t("SIGN_UP.CITY.label")}
                    </Label>
                    <Select
                        onValueChange={(value) => {
                            register("city").onChange({
                                target: {
                                    name: "city",
                                    value: value,
                                },
                            });
                        }}
                        {...register("city")}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue
                                placeholder={t("SIGN_UP.CITY.placeholder")}
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {cities.map((city, index) => {
                                    return (
                                        <SelectItem key={index} value={city}>
                                            {city}
                                        </SelectItem>
                                    );
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {/* Submit Button */}
                <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className={cn(
                        "btn btn-primary",
                        isSubmitting && "btn-loading",
                    )}
                >
                    {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <>
                            <PlusCircle /> {t("SIGN_UP.btn")}
                        </>
                    )}
                </Button>
                {/* Don't have an account? */}
                <p className="text-center text-sm text-gray-600">
                    {t("SIGN_UP.have_account")}{" "}
                    <Link href="/auth/login" className="text-primary">
                        {t("SIGN_UP.sign_in")}
                    </Link>
                </p>
            </form>
        </>
    );
};

export default Signup;
