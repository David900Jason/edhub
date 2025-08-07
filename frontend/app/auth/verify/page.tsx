"use client";

import { useState, useEffect } from "react";

import FormHeader from "@/components/auth/FormHeader";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";
import { verifyUser } from "@/lib/api";
import Link from "next/link";
import { findUserByEmail } from "@/lib/api";
import { cn, generateTime } from "@/lib/utils";

const VerifyAccount = () => {
    const [otp, setOtp] = useState("");
    const router = useRouter();
    const email = useSearchParams().get("email");

    // Timer Countdown Function
    const [countdown, setCountdown] = useState(90);
    useEffect(() => {
        const timer = setInterval(() => {
            if (countdown > 0) {
                setCountdown((prevCountdown) => prevCountdown - 1);
            } else {
                clearInterval(timer);
                alert("OTP Expired");
                // restart
                setCountdown(90);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [countdown]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Handle OTP submission
        if (otp.length < 6) {
            return alert("Please enter a valid OTP");
        }
        alert("OTP Submitted Successfully");

        const userId = await findUserByEmail(email);

        // TODO: Add API call to verify user
        verifyUser(otp, email, userId);

        router.push("/auth/login");
    };

    return (
        <>
            <FormHeader
                title="Verify your account"
                description="Enter the Verification Code sent to your phone number on Whatsapp"
            />
            <form
                action=""
                method=""
                onSubmit={handleSubmit}
                className="register-form flex items-center justify-center"
            >
                {" "}
                <InputOTP value={otp} onChange={setOtp} maxLength={9}>
                    <InputOTPGroup>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTPGroup>
                </InputOTP>
                {/* Timer for Entering OTP */}
                <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-center text-sm text-gray-600">
                        Resend OTP in{" "}
                        <span
                            className={cn(
                                countdown === 0
                                    ? "text-red-500"
                                    : "text-primary",
                            )}
                        >
                            {/* Generate 00:00 time string */}
                            {generateTime(countdown)}
                        </span>
                    </p>
                </div>
                <p className="text-center text-sm text-gray-600">
                    Are you a teacher? Please verify your account on Whatsapp{" "}
                    <Link href="tel:+2001093632618" className="text-primary">
                        here
                    </Link>
                </p>
                {/* Verify Button */}
                <Button type="submit" className="btn btn-primary">
                    <Check /> Verify
                </Button>
            </form>
        </>
    );
};

export default VerifyAccount;
