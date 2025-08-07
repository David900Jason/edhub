"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Tag from "@/components/ui/Tag";
import { fetchCourse, fetchTeacher } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBag } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const CheckoutPage = () => {
    const params = useParams();
    const router = useRouter();
    const courseId = params?.courseId as string;

    const [paymentMethod, setPaymentMethod] = useState("digital wallet");

    const { data: course } = useQuery({
        queryKey: ["course", courseId],
        queryFn: () => fetchCourse(courseId),
    });

    const { data: teacher } = useQuery({
        queryKey: ["teacher"],
        queryFn: () => fetchTeacher(course?.teacher_id || "1"),
    });

    const handlePayNow = () => {
        // TODO: Add Enrollment logic 'handleEnrollment()'

        // TODO: Implement payment logic
        router.push(`/checkout/${courseId}/success`);
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <Card className="min-w-[450px]">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        Checkout Page
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        Confirm the data of the item before paying
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-start justify-between">
                            <h3 className="flex-1/2 text-lg font-medium">
                                ID:
                            </h3>
                            <p className="flex-1/2 text-end text-lg text-gray-500">
                                {courseId}
                            </p>
                        </div>
                        <div className="flex items-start justify-between">
                            <h3 className="flex-1/2 text-lg font-medium">
                                Course Name:
                            </h3>
                            <p className="flex-1/2 text-end text-lg text-gray-500">
                                &quot;{course?.title}&quot;
                            </p>
                        </div>
                        <div className="flex items-start justify-between">
                            <h3 className="flex-1/2 text-lg font-medium">
                                School Year:
                            </h3>
                            <p className="flex-1/2 text-end text-lg text-gray-500">
                                <Tag color="purple">{course?.school_year}</Tag>
                            </p>
                        </div>
                        <div className="flex items-start justify-between">
                            <h3 className="flex-1/2 text-lg font-medium">
                                Teacher Name:
                            </h3>
                            <p className="flex-1/2 text-end text-lg text-gray-500">
                                {teacher?.full_name}
                            </p>
                        </div>
                        <div className="flex items-start justify-between">
                            <h3 className="flex-1/2 text-lg font-medium">
                                Subject:
                            </h3>
                            <p className="flex-1/2 text-end text-lg text-gray-500">
                                <Tag color="blue">{course?.category}</Tag>
                            </p>
                        </div>
                        <div className="flex items-start justify-between">
                            <h3 className="flex-1/2 text-lg font-medium">
                                Price:
                            </h3>
                            <p className="text-primary flex-1/2 text-end text-lg font-extrabold">
                                {course?.price}
                                <span className="text-xs font-extrabold text-gray-500">
                                    {" "}
                                    EGP
                                </span>
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <h3 className="flex-1/2 text-lg font-medium">
                                Payment Method:
                            </h3>
                            <p className="flex-1/2 text-end text-lg text-gray-500">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            className="capitalize"
                                            variant="outline"
                                        >
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
                        {/* Small form to enter a payment code */}
                        {paymentMethod === "digital wallet" && (
                            <div className="flex items-center justify-center p-4">
                                <Button
                                    className="ml-2 w-56 bg-secondary"
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
                    </div>
                </CardContent>
            </Card>
        </main>
    );
};

export default CheckoutPage;
