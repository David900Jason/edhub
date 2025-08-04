// UI Components
import { Card } from "@/components/ui/card";
import Tag from "@/components/ui/Tag";

// Next.js Components
import Image from "next/image";
import Link from "next/link";

// Util Function
import { format } from "timeago.js";
import { Button } from "../ui/button";

const CourseCard = ({ course }: { course: CourseType }) => {
    const { id, title, image, schoolYear, subject, createdAt, sessions } =
        course;

    return (
        <Card className="group gap-0 overflow-hidden py-0 hover:cursor-pointer">
            <Image
                src="https://dummyimage.com/600x400"
                blurDataURL="https://dummyimage.com/600x400"
                width={600}
                height={400}
                alt=""
            />
            <div className="flex flex-col px-4 py-5">
                <ul className="mb-4 flex items-center gap-2">
                    <li>
                        <Tag color="purple">{schoolYear}</Tag>
                    </li>
                    <li>
                        <Tag color="blue">{subject}</Tag>
                    </li>
                </ul>
                <h3 className="mb-1 text-lg font-bold group-hover:underline">
                    {title}
                </h3>
                <div className="flex gap-1 text-sm text-gray-400">
                    <p>{sessions} sessions</p>.
                    <p>{format(new Date(createdAt))}</p>
                </div>
                <div className="flex gap-2 mt-4">
                    <Button
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary cursor-pointer font-bold hover:text-white flex-1"
                    >
                        <Link href={`/courses/${id}`}>View Course</Link>
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default CourseCard;
