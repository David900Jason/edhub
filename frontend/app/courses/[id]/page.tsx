// UI Components
import Banner from "@/components/containers/Banner";
import Container from "@/components/containers/Container";
import PaymentDialog from "@/components/sublayout/PaymentDialog";
import Tag from "@/components/ui/Tag";

// Util Function
import { format } from "timeago.js";

// Icons
import { Eye, School } from "lucide-react";

// Util Function
import { fetchCourse, fetchSessions } from "@/lib/api";

// ShadCN Components
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const Course = async ({ params }: { params: { id: string } }) => {
    const { id } = await params;

    const course = await fetchCourse(Number(id));
    const sessions = await fetchSessions(Number(id));

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <>
            <main>
                <Banner className="min-h-[50vh] py-6">
                    <Container className="flex flex-col justify-center gap-6">
                        <ul className="flex items-center gap-2">
                            <li className="text-lg font-medium">
                                <Tag color="purple">
                                    {course[0]?.schoolYear}
                                </Tag>
                            </li>
                            <li className="text-lg font-medium">
                                <Tag color="blue">{course[0]?.subject}</Tag>
                            </li>
                        </ul>
                        <div className="flex flex-col gap-4 text-white">
                            <h1 className="flex items-center text-5xl font-bold tracking-tighter text-black">
                                {course[0]?.title || "Course not found"}{" "}
                            </h1>
                            <div className="flex items-center gap-1">
                                <p className="text-sm font-medium">
                                    {sessions.length ||
                                        "Course sessions not found"}{" "}
                                    sessions
                                </p>
                                <span className="text-white">|</span>
                                <p className="text-sm font-medium">
                                    {format(course[0]?.createdAt) || "Unknown"}
                                </p>
                                <span className="text-white">|</span>
                                <p className="text-sm font-medium">
                                    <Tag color="yellow">
                                        {course[0]?.price ||
                                            "Course price not found"}{" "}
                                        EGP
                                    </Tag>
                                </p>
                            </div>
                        </div>
                        <div>
                            <PaymentDialog paymentItem={"Course"} />
                        </div>
                    </Container>
                </Banner>
                <Container className="min-h-screen">
                    <h1 className="my-8 flex items-center gap-2 text-3xl font-bold">
                        <School size={36} /> Sessions
                    </h1>
                    {sessions.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {sessions?.map((session: any, index: number) => (
                                <Card
                                    className="min-h-[150px] gap-2 py-8"
                                    key={index}
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-between gap-2">
                                            {session.title}
                                            {/* <Lock /> */}
                                        </CardTitle>
                                        <CardDescription>
                                            {session.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardFooter className="mt-4 flex gap-2">
                                        <div className="flex items-center gap-2">
                                            <PaymentDialog
                                                paymentItem={"Session"}
                                            />
                                            <p className="text-primary-foreground w-full text-start text-lg font-bold tracking-tighter">
                                                {session.price.toFixed(2)}{" "}
                                                <span className="text-xs font-extrabold text-gray-500">
                                                    EGP
                                                </span>
                                            </p>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <p className="text-lg text-gray-400">
                            No sessions found
                        </p>
                    )}
                </Container>
            </main>
        </>
    );
};

export default Course;
