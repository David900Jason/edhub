"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/auth/DatePicker";
import FormHeader from "@/components/auth/FormHeader";
import { cities } from "@/constants";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertCircle, Eye, EyeOff, Loader2, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { createUser } from "@/lib/api/auth";
import api from "@/lib/api";

const Signup = () => {
    const router = useRouter();
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

        if (!isValid) {
            return;
        }

        // Alert with success
        alert("Signup Successfully");

        // TODO: Add API call to create user (Submit form)

        // Push router to verify page
        router.push("/auth/verify?email=" + data.email);
    };

    return (
        <>
            <FormHeader
                title="Sign Up to your account"
                description="Subscribe to our platform to view our content"
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
                        Your Full Name
                    </Label>
                    <Input
                        {...register("full_name", {
                            required: "Full name is required",
                            minLength: {
                                value: 3,
                                message:
                                    "Full name must be at least 3 characters long",
                            },
                            maxLength: {
                                value: 50,
                                message:
                                    "Full name must be at most 50 characters long",
                            },
                            pattern: {
                                value: /^[a-zA-Z ]+$/,
                                message: "Full name must contain only letters",
                            },
                        })}
                        placeholder="Enter your full name"
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
                        Your Password
                    </Label>
                    <Input
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message:
                                    "Password must be at least 8 characters long",
                            },
                            maxLength: {
                                value: 20,
                                message:
                                    "Password must be at most 20 characters long",
                            },
                        })}
                        placeholder="Enter your password (8 characters min.)"
                        type={showPassword ? "text" : "password"}
                    />
                    <Button
                        variant="ghost"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-5.5 right-0 cursor-pointer rounded-none border-s-[1px] border-s-gray-300 text-gray-500 hover:bg-transparent dark:bg-black"
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
                        Confirm Password
                    </Label>
                    <Input
                        {...register("confirm_password", {
                            required: "Confirm password is required",
                            validate: (value) =>
                                value === watch("password") ||
                                "Passwords do not match",
                            minLength: {
                                value: 8,
                                message:
                                    "Password must be at least 8 characters long",
                            },
                            maxLength: {
                                value: 20,
                                message:
                                    "Password must be at most 20 characters long",
                            },
                        })}
                        placeholder="Confirm your password"
                        type={showConfirmPassword ? "text" : "password"}
                    />
                    <Button
                        variant="ghost"
                        type="button"
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute top-5.5 right-0 cursor-pointer rounded-none border-s-[1px] border-s-gray-300 text-gray-500 hover:bg-transparent dark:bg-black"
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
                        Your Phone Number
                    </Label>
                    <Input
                        {...register("phone_number", {
                            required: "Phone number is required",
                            pattern: {
                                value: /^[0-9]{11}$/,
                                message: "Invalid phone number",
                            },
                            maxLength: {
                                value: 11,
                                message: "Phone number must be 11 digits long",
                            },
                        })}
                        placeholder="Your phone number (e.g. 01098765432)"
                        type="tel"
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
                        Parent Phone Number
                    </Label>
                    <Input
                        {...register("parent_number", {
                            required:
                                watch("role") === "teacher"
                                    ? false
                                    : "Parent phone number is required",
                            pattern: {
                                value: /^[0-9]{11}$/,
                                message: "Invalid phone number",
                            },
                            maxLength: {
                                value: 11,
                                message: "Phone number must be 11 digits long",
                            },
                        })}
                        placeholder="Parent phone number (e.g. 01098765432) (students only)"
                        type="tel"
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
                        Who are you?
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
                            <SelectValue placeholder="Choose your identity" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="student">Student</SelectItem>
                                <SelectItem value="teacher">Teacher</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {/* Select School year */}
                <div className="input-group">
                    <Label className="mb-2" htmlFor="school_year">
                        Your school year
                    </Label>
                    <Select
                        onValueChange={(value) => {
                            register("school_year").onChange({
                                target: {
                                    name: "school_year",
                                    value: value,
                                },
                            });
                        }}
                        {...register("school_year")}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select your school year" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="1">Grade 10</SelectItem>
                                <SelectItem value="2">Grade 11</SelectItem>
                                <SelectItem value="3">Grade 12</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {/* Select City */}
                <div className="input-group">
                    <Label className="mb-2" htmlFor="city">
                        Your city
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
                            <SelectValue placeholder="Select your city" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {cities.map((city) => (
                                    <SelectItem key={city} value={city}>
                                        {city}
                                    </SelectItem>
                                ))}
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
                            <PlusCircle /> Create Account
                        </>
                    )}
                </Button>
                {/* Don't have an account? */}
                <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="text-primary">
                        Login
                    </Link>
                </p>
            </form>
        </>
    );
};

export default Signup;
