"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DatePicker,
    FormHeader,
    InputGroup,
    SelectElement,
} from "@/components/";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface SignupFormType {
    name: string;
    email: string;
    password: string;
    "confirm-password": string;
    phone: string;
}

// {
//   "full_name": "Salma Mahmoud",
//   "email": "salma@studentmail.com",
//   "password": "12345678",
//   "role": "student",
//   "phone_number": "01112345678",
//   "parent_phone": "01098765432",
//   "birth_date": "2008-11-05"
// }

const Signup = ({ action }: { action: string }) => {
    const [roleValue, setRoleValue] = useState<string>("");
    const [date, setDate] = useState<Date | undefined>(undefined);

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Get all formData from the form
        const formData = new FormData(e.currentTarget);
        formData.set("role", roleValue);
        const {
            full_name,
            email,
            password,
            "confirm-password": confirmPassword,
            phone,
            parent_phone = "",
            birth_date = date?.toISOString() || "",
            role = "student",
        } = Object.fromEntries(formData.entries());

        // Check if the password and confirm password are the same
        if (password !== confirmPassword) {
            return alert("Passwords do not match");
        }

        // Redirect to verify page
        router.push("/verify");

        return console.log({
            full_name,
            email,
            password,
            phone,
            parent_phone,
            birth_date,
            role,
        });
    };

    return (
        <>
            <FormHeader
                title="Sign Up to your account"
                description="Subscribe to our platform to view our content"
            />
            {/* Sign Up Form */}
            <form
                action={action}
                method="post"
                className="register-form"
                onSubmit={handleSubmit}
            >
                {/* Name Input */}
                <InputGroup
                    label="Your Full Name"
                    name="full_name"
                    required
                    type="text"
                    placeholder="Enter your full name"
                />
                {/* Email Input */}
                <InputGroup
                    label="Your Email Address"
                    name="email"
                    required
                    type="email"
                    placeholder="Enter your email address (e.g. example@gmail.com)"
                />
                {/* Password Input */}
                <InputGroup
                    label="Your Password"
                    name="password"
                    type="password"
                    required
                    placeholder="Enter your password (8 characters min.)"
                />
                {/* Confirm Password Input */}
                <InputGroup
                    label="Confirm password"
                    name="confirm-password"
                    type="password"
                    required
                    placeholder="Confirm your password"
                />
                {/* Phone Input */}
                <InputGroup
                    label="Your Phone Number"
                    name="phone"
                    type="tel"
                    required
                    placeholder="Your phone number (e.g. 01098765432)"
                />
                {/* Parent Phone Input */}
                <InputGroup
                    label="Parent Phone Number"
                    name="parent_phone"
                    type="tel"
                    placeholder="Parent phone number (e.g. 01098765432) (students only)"
                />
                {/* Date of birth */}
                <DatePicker date={date} setDate={setDate} />
                {/* Select role */}
                <SelectElement
                    placeholder="Select your role"
                    options={[
                        { label: "Student", value: "student" },
                        { label: "Teacher", value: "teacher" },
                    ]}
                    label="Join us as"
                    name="role"
                    required
                    onChange={(value) => setRoleValue(value)}
                />
                {/* Submit Button */}
                <Button type="submit" size="lg" className="btn btn-primary">
                    <PlusCircle /> Create Account
                </Button>
                {/* Don't have an account? */}
                <p className="text-center text-gray-600 text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary">
                        Login
                    </Link>
                </p>
            </form>
        </>
    );
};

export default Signup;
