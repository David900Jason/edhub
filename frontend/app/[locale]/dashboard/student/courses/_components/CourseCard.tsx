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
// import { Star } from "lucide-react";
import Image from "next/image";
import Tag from "@/components/ui/Tag";
// import RatingButton from "./RatingButton";

const CourseCard = ({ course }: { course: CourseType }) => {
    const t = useTranslations("STUDENT_DASHBOARD.COURSES");
    const locale = useLocale();
    const isRTL = locale === 'ar';

    return (
        <Card className="gap-8 overflow-hidden p-0">
            <CardHeader className="flex flex-1 flex-col justify-start p-0">
                <Image
                    src={"https://dummyimage.com/600x400"}
                    alt={course?.title || t("thumbnail_alt")}
                    width={600}
                    height={400}
                />
                <div className="gap-2 px-6 pt-4">
                    <div className={`mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Tag color="green">{course?.category}</Tag>
                    </div>
                    <CardTitle className="mb-1 text-lg font-semibold">
                        {course?.title}
                    </CardTitle>
                    <CardDescription className={`mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {t("by")}: {course.teacher?.full_name || t("unknown_teacher")}
                    </CardDescription>
                    {/* <CardDescription className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {Number(course?.rating) === 0 ? (
                            <RatingButton id={course.id || ""} />
                        ) : (
                            <>
                                <Star className={`inline h-4 w-4 text-yellow-300 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                                {Number(course?.rating)?.toFixed(1)}
                            </>
                        )}
                    </CardDescription> */}
                </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
                <Button variant="outline" asChild className="w-full">
                    <Link href={`/dashboard/student/courses/${course?.id}`}>
                        {t("cta1")}
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
};

export default CourseCard;
