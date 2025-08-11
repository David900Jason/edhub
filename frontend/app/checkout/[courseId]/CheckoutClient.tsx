"use client";

import { Card, CardContent } from "@/components/ui/card";
import Tag from "@/components/ui/Tag";
import PaymentToggle from "./PaymentToggle";

interface TeacherType {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    address: string;
    image: string;
}

interface CourseType {
    id: string;
    title: string;
    school_year: string;
    category: string;
    price: string;
    teacher_id: string;
}

export default function CheckoutClient({
    course,
    teacher,
}: {
    course: CourseType;
    teacher: TeacherType;
}) {
    if (!course || !teacher) {
        return <div>Loading...</div>;
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <Card className="min-w-[450px]">
                <CardContent className="p-6">
                    <h2 className="mb-6 text-2xl font-bold">Checkout</h2>
                    <div className="space-y-4">
                        <div className="flex items-start justify-between">
                            <h3 className="flex-1/2 text-lg font-medium">
                                ID:
                            </h3>
                            <p className="flex-1/2 text-end text-lg text-gray-500">
                                {course.id}
                            </p>
                        </div>
                        <div className="flex items-start justify-between">
                            <h3 className="flex-1/2 text-lg font-medium">
                                Course Name:
                            </h3>
                            <p className="flex-1/2 text-end text-lg text-gray-500">
                                &quot;{course.title}&quot;
                            </p>
                        </div>
                        <div className="flex items-start justify-between">
                            <h3 className="flex-1/2 text-lg font-medium">
                                School Year:
                            </h3>
                            <p className="flex-1/2 text-end text-lg text-gray-500">
                                <Tag color="purple">{course.school_year}</Tag>
                            </p>
                        </div>
                        <div className="flex items-start justify-between">
                            <h3 className="flex-1/2 text-lg font-medium">
                                Teacher Name:
                            </h3>
                            <p className="flex-1/2 text-end text-lg text-gray-500">
                                {teacher.full_name}
                            </p>
                        </div>
                        <div className="flex items-start justify-between">
                            <h3 className="flex-1/2 text-lg font-medium">
                                Subject:
                            </h3>
                            <p className="flex-1/2 text-end text-lg text-gray-500">
                                <Tag color="blue">{course.category}</Tag>
                            </p>
                        </div>
                        <div className="flex items-start justify-between">
                            <h3 className="flex-1/2 text-lg font-medium">
                                Price:
                            </h3>
                            <p className="text-primary flex-1/2 text-end text-lg font-extrabold">
                                {course.price}
                                <span className="text-xs font-extrabold text-gray-500">
                                    {" "}
                                    EGP
                                </span>
                            </p>
                        </div>
                        <PaymentToggle courseId={course.id} />
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
