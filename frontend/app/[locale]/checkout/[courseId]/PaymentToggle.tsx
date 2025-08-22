"use client";

import { useRouter } from "@/i18n/routing";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { generateId } from "@/lib/utils";

const PaymnetToggle = ({ course }: { course: CourseType }) => {
    const router = useRouter();
    const [user] = useLocalStorage("user", null);
    const [paymentMethod, setPaymentMethod] = useState("digital wallet");

    const handlePayNow = async () => {
        const enrollment = {
            course_id: course.id,
            user_id: user?.id,
            payment_id: `CRS-${generateId(9)}`,
            enrolled_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            teacher_id: course.teacher_id,
            is_paid: true,
            price: course.price,
            review: "",
            status: "inactive",
        };

        const response = await fetch("http://localhost:8000/enrollments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(enrollment),
        });

        if (!response.ok) {
            throw new Error("Failed to enroll in course");
        }

        console.log(enrollment);

        router.push(`/dashboard/student/courses/${course.id}`);
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <h3 className="flex-1/2 text-lg font-medium">
                    Payment Method:
                </h3>
                <p className="flex-1/2 text-end text-lg text-gray-500">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="capitalize" variant="outline">
                                {paymentMethod}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuRadioGroup
                                value={paymentMethod}
                                onValueChange={setPaymentMethod}
                            >
                                <DropdownMenuRadioItem value="digital wallet">
                                    Digital Wallet
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="visa card">
                                    Visa Card
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </p>
            </div>
            <hr className="mt-6" />
            {paymentMethod === "digital wallet" && (
                <div className="flex items-center justify-center p-4">
                    <Button
                        className="bg-secondary ml-2 w-56"
                        variant="outline"
                        onClick={handlePayNow}
                    >
                        <ShoppingBag className="h-4 w-4" />
                        Pay Now
                    </Button>
                </div>
            )}
            {paymentMethod === "visa card" && (
                <div className="flex items-center justify-center p-4">
                    <p className="text-gray-500">Coming soon...</p>
                </div>
            )}
        </>
    );
};

export default PaymnetToggle;