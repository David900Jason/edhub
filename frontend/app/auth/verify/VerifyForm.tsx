"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { verifyUser, findUserByEmail } from "@/lib/api";
import { cn, generateTime } from "@/lib/utils";
import FormHeader from "@/components/auth/FormHeader";

const VerifyForm = () => {
    const [otp, setOtp] = useState("");
    const router = useRouter();
    const email = useSearchParams().get("email");
    const [countdown, setCountdown] = useState(90);

    useEffect(() => {
        const timer = setInterval(() => {
            if (countdown > 0) {
                setCountdown((prevCountdown) => prevCountdown - 1);
            } else {
                clearInterval(timer);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [countdown]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (otp.length < 6) return alert("Please enter a valid OTP");

        const userId = await findUserByEmail(email);
        if (!userId) return alert("User not found");

        verifyUser(otp, email, userId);
        alert("OTP Submitted Successfully");
        router.push("/auth/login");
    };

    return (
        <>
            <FormHeader
                title="Verify your account"
                description="Enter the Verification Code sent to your phone number on Whatsapp"
            />
            <form
                onSubmit={handleSubmit}
                className="register-form flex items-center justify-center"
            >
                <InputOTP value={otp} onChange={setOtp} maxLength={6}>
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
                </InputOTP>
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
                <Button type="submit" className="btn btn-primary">
                    <Check /> Verify
                </Button>
            </form>
        </>
    );
};

export default VerifyForm;
