"use client";

import { Quote } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface TestimonialCardProps {
    studentKey: string;
    index: number;
}

const TestimonialCard = ({ studentKey, index }: TestimonialCardProps) => {
    const t = useTranslations("HOME.TESTIMONIALS");
    
    // Get the translation for the current student
    const name = t(`${studentKey}.name`);
    const description = t(`${studentKey}.description`);

    return (
        <Card 
            className={cn("flex max-w-2xl flex-col gap-6")} 
            style={{
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
        >
            <CardHeader className="flex items-center gap-4">
                <div className="bg-gradient-colourful h-16 w-16 rounded-full"></div>
                <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold">{name}</h3>
                    <p className="p-lead !text-[14px]">{t("job")}</p>
                </div>
            </CardHeader>
            <CardContent dir="ltr">
                <Quote className="text-primary mr-2 h-12 w-12 -scale-x-100" />
                <p className="p-lead p-4 text-center">{description}</p>
                <Quote className="text-primary ml-auto h-12 w-12" />
            </CardContent>
        </Card>
    );
};

export default TestimonialCard;
