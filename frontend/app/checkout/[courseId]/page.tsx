import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Tag from "@/components/ui/Tag";
import { fetchCourse, fetchTeacher } from "@/lib/api";
import PaymnetToggle from "./success/PaymentToggle";

const CheckoutPage = async ({ params }: { params: { courseId: string } }) => {
    const { courseId } = await params;

    const course = await fetchCourse(courseId);
    const teacher = await fetchTeacher(course?.teacher_id || "1");

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
                        <PaymnetToggle courseId={courseId} />
                    </div>
                </CardContent>
            </Card>
        </main>
    );
};

export default CheckoutPage;
