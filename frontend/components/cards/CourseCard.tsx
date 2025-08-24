// React Icons
import { ShoppingCart } from "lucide-react";

// UI Components
import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import Tag from "@/components/ui/Tag";
import PaymentDialog from "../sublayout/PaymentDialog";

// Next.js Components
import Image from "next/image";
import { Link } from "@/i18n/routing";

const CourseCard = ({ course }: { course: CourseType }) => {
    const { 
        id, 
        title, 
        category, 
        price, 
        teacher,
        currency
    } = course;

    return (
        <Card className="group gap-0 overflow-hidden py-0 hover:cursor-pointer">
            <Image
                src={"https://dummyimage.com/600x400"}
                blurDataURL={"https://dummyimage.com/600x400"}
                width={600}
                height={400}
                alt=""
                priority={true}
            />
            <div className="flex flex-col px-4 py-5">
                <ul className="mb-4 flex items-center gap-2">
                    <li>
                        <Tag color="blue">{category}</Tag>
                    </li>
                </ul>
                <h3 className="text-lg font-bold group-hover:underline">
                    <Link href={`/courses/${id}`}>{title}</Link>
                </h3>
                <span className="text-sm text-gray-500">
                    by: {teacher?.full_name}
                </span>
                <p className="text-primary-foreground mt-2 mb-6 text-start text-lg font-bold tracking-tighter">
                    {price.toFixed(2)}{" "}
                    <span className="text-xs font-extrabold text-gray-500">
                        {currency}
                    </span>
                </p>
                <div>
                    <PaymentDialog paymentItem="course" courseId={id}>
                        <Button
                            className="hover:bg-secondary bg-secondary w-full text-black transition-colors hover:opacity-80"
                            type="button"
                        >
                            <ShoppingCart className="h-4 w-4" /> Buy Course
                        </Button>
                    </PaymentDialog>
                </div>
            </div>
        </Card>
    );
};

export default CourseCard;
