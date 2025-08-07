import { Quote } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";

const TestimonialCard = ({ review }: { review: ReviewType }) => {
    const { name, message, year } = review;

    return (
        <Card className={cn("flex max-w-xl flex-col gap-6")} style={{
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}>
            <CardHeader className="flex items-center gap-4">
                <div className="bg-primary h-16 w-16 rounded-full"></div>
                <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold">{name}</h3>
                    <p className="p-lead !text-[14px]">{year}</p>
                </div>
            </CardHeader>
            <CardContent>
                <Quote className="text-primary mr-2 h-12 w-12 rotate-y-180" />
                <p className="p-lead p-4 text-center">{message}</p>
                <Quote className="text-primary ml-auto h-12 w-12" />
            </CardContent>
        </Card>
    );
};

export default TestimonialCard;
