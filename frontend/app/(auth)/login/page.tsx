"use client";

import { InputGroup, FormHeader } from "@/components/";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import Link from "next/link";

const Login = () => {
    return (
        <>
            {/* Form Heading */}
            <FormHeader
                title="Login to your account"
                description="Enter your email and password to login"
            />
            {/* Login Form */}
            <form action="" method="" className="register-form">
                {/* Email Input */}
                <InputGroup
                    label="Email:"
                    name="email"
                    type="email"
                    placeholder="Your email address (e.g. example@gmail.com)"
                />
                {/* Password Input */}
                <InputGroup
                    label="Password:"
                    name="password"
                    type="password"
                    placeholder="Your password"
                />
                {/* Remember me */}
                <div className="flex items-center justify-start">
                    <Link href="/forgot-password" className="text-primary text-sm">
                        Forgot password?
                    </Link>
                </div>
                {/* Submit Button */}
                <Button type="submit" className="btn btn-primary text-sm">
                    Login
                </Button>
                {/* Don't have an account? */}
                <p className="text-center text-gray-600 text-sm">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-primary text-sm">
                        Sign Up
                    </Link>
                </p>
            </form>
        </>
    );
};

export default Login;
