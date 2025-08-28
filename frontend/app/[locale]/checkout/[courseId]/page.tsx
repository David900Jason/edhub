"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCourse, enrollCourse } from "@/lib/api/course";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";

const CheckoutPage = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState<CourseType | null>(null);
    const router = useRouter();

    useEffect(() => {
        getCourse(courseId as string).then((res) => {
            setCourse(res);
        });
    }, [courseId]);

    const handlePayment = async () => {
        const res = await enrollCourse(courseId as string);
        toast(res, {
            duration: 3000,
            description: "You will be redirected to the courses page",
            onAutoClose() {
                router.push("/dashboard/student/courses");
            },
            action: (
                <Button
                    variant="outline"
                    onClick={() => router.push("/dashboard/student/courses")}
                >
                    Go to Courses
                </Button>
            ),
        });
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
                                {course?.id}
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
                                Teacher Name:
                            </h3>
                            <p className="flex-1/2 text-end text-lg text-gray-500">
                                {course?.teacher?.full_name}
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
                                    {course?.currency}
                                </span>
                            </p>
                        </div>
                        <div className="flex items-start justify-between">
                            <h3 className="flex-1/2 text-lg font-medium">
                                Discount:
                            </h3>
                            <p className="text-primary flex-1/2 text-end text-lg font-extrabold">
                                {course?.discount}
                                <span className="text-xs font-extrabold text-gray-500">
                                    {" "}
                                    {course?.currency}
                                </span>
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <h3 className="flex-1/2 text-lg font-medium">
                                Payment Method:
                            </h3>
                            <p className="flex-1/2 text-end text-lg text-gray-500">
                                Digital Wallet
                            </p>
                        </div>
                        <hr className="mt-6" />
                        <div className="flex items-center justify-center p-4">
                            <Button
                                className="bg-secondary ml-2 w-56"
                                variant="outline"
                                onClick={handlePayment}
                            >
                                <ShoppingBag className="h-4 w-4" />
                                Pay Now
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
};

export default CheckoutPage;
