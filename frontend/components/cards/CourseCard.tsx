// React Icons
import { Book, ShoppingCart, Verified } from "lucide-react";

// UI Components
import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import Tag from "@/components/ui/Tag";
import PaymentDialog from "../sublayout/PaymentDialog";

// Next.js Components
import { Link } from "@/i18n/routing";

const CourseCard = ({ course }: { course: CourseType }) => {
    const { id, title, category, price, is_paid, teacher, currency } = course;

    return (
        <Card className="gap-0 overflow-hidden py-0">
            <div className="flex aspect-[6/4] items-center justify-center bg-gray-300 dark:bg-black">
                <Book size={64} className="opacity-50" />
            </div>
            <div className="flex flex-col px-4 py-5">
                <ul className="mb-4 flex items-center gap-2">
                    <li>
                        <Tag color="blue">{category}</Tag>
                    </li>
                </ul>
                <h3 className="text-lg font-bold">
                    <Link href={`/courses/${id}`}>{title}</Link>
                </h3>
                <span className="text-sm text-gray-500">
                    by: {teacher?.full_name}{" "}
                    {teacher?.is_verified && (
                        <Verified size={16} className="inline text-green-500" />
                    )}
                </span>
                <p className="text-primary-foreground mt-2 mb-6 text-start text-lg font-bold tracking-tighter">
                    {
                        is_paid ? (
                            <>
                                {price.toFixed(2)}{" "}
                                <span className="text-xs font-extrabold text-gray-500">
                                    {currency}
                                </span>
                            </>
                        ) : (
                            "Free"
                        )
                    }
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
