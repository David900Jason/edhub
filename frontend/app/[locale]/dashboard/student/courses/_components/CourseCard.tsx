"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import Tag from "@/components/ui/Tag";
import { Book } from "lucide-react";

const CourseCard = ({ course }: { course: EnrollmentType }) => {
    const t = useTranslations("STUDENT_DASHBOARD.COURSES");
    const locale = useLocale();
    const isRTL = locale === "ar";

    const { id: enrollmentId } = course;
    const { title, category, teacher } = course.course;

    return (
        <Card className="gap-8 overflow-hidden p-0">
            <CardHeader className="flex flex-1 flex-col justify-start p-0">
                <div className="flex aspect-[6/4] w-full items-center justify-center bg-gray-300 dark:bg-black">
                    <Book size={64} className="opacity-50" />
                </div>
                <div className="gap-2 px-6 pt-4">
                    <div
                        className={`mb-4 flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                        <Tag color="green">{category}</Tag>
                    </div>
                    <CardTitle className="mb-1 text-lg font-semibold">
                        {title}
                    </CardTitle>
                    <CardDescription
                        className={`mb-1 ${isRTL ? "text-right" : "text-left"}`}
                    >
                        {t("by")}: {teacher?.full_name || t("unknown_teacher")}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
                <Button variant="outline" asChild className="w-full">
                    <Link href={`/dashboard/student/courses/${enrollmentId}`}>
                        {t("cta1")}
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
};

export default CourseCard;
