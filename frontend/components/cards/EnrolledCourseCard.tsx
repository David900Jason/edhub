// UI Components
import { Card } from "@/components/ui/card";
import Tag from "@/components/ui/Tag";

// Next.js Components
import Image from "next/image";
import Link from "next/link";

// Util Function
import { format } from "timeago.js";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";

const EnrolledCourseCard = ({ course }: { course: CourseType }) => {
    const { id, title, schoolYear, subject, createdAt, sessions } = course;

    return (
        <Card className="gap-0 overflow-hidden py-0">
            <Image
                src="https://dummyimage.com/600x400"
                blurDataURL="https://dummyimage.com/600x400"
                width={600}
                height={400}
                alt=""
            />
            <div className="flex h-full flex-col justify-between px-4 py-5">
                <div>
                    <ul className="mb-4 flex items-center gap-2">
                        <li>
                            <Tag color="purple">{schoolYear}</Tag>
                        </li>
                        <li>
                            <Tag color="blue">{subject}</Tag>
                        </li>
                    </ul>
                    <h3 className="text-lg font-bold">{title}</h3>
                    <div className="flex gap-1 text-sm text-gray-400">
                        <p>{sessions} sessions</p>|
                        <p>{format(new Date(createdAt))}</p>
                    </div>
                </div>
                <Button variant="outline" className="mt-4">
                    <Link
                        className="flex items-center gap-2"
                        href={`/user/my-courses/${id}`}
                    >
                        <Eye />
                        View Course
                    </Link>
                </Button>
            </div>
        </Card>
    );
};

export default EnrolledCourseCard;
