// UI Components
import { Card } from "@/components/ui/card";
import Tag from "@/components/ui/Tag";

// Next.js Components
import Image from "next/image";

// Util Function
import { format } from "timeago.js";

const CourseCard = ({ course }: { course: CourseType }) => {

    const { title, image, schoolYear, subject, createdAt, sessions } = course;

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
            </div>
        </Card>
    );
};

export default CourseCard;
