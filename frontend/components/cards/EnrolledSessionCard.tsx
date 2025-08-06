import Link from "next/link";
import { Button } from "../ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Eye } from "lucide-react";
import { fetchCourse } from "@/lib/api";
import Tag from "../ui/Tag";

interface SessionType {
    id: number;
    title: string;
    description: string;
    course_id: number;
    teacher_id: string;
    start_time: string;
    end_time: string;
    duration: string;
    price: number;
    isFinished: boolean;
}

const EnrolledSessionCard = async ({ session }: { session: SessionType }) => {
    const { id, title, description } = session;
    let course = await fetchCourse(session.course_id);
    course = course[0];

    console.log(course);

    return (
        <Card>
            <CardHeader>
                <ul className="mb-4 flex items-center gap-2">
                    <li>
                        <Tag color="purple">{course.schoolYear}</Tag>
                    </li>
                    <li>
                        <Tag color="blue">{course.subject}</Tag>
                    </li>
                </ul>
                <CardTitle className="text-lg font-bold">
                    {course.title}
                </CardTitle>
                <CardDescription>Session: {title}</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button variant="outline" className="w-full">
                    <Link
                        className="flex items-center gap-2"
                        href={`/user/my-sessions/${id}`}
                    >
                        <Eye />
                        View Session
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default EnrolledSessionCard;
