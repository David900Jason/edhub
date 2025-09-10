"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Star } from "lucide-react";
import { Table, LayoutGrid } from "lucide-react";
import { CoursesDataTable } from "./CoursesDataTable";
import { useTranslations, useLocale } from "next-intl";
import Tag from "@/components/ui/Tag";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";
import { deleteCourse } from "@/lib/api/course";

export function CoursesView({ courses }: { courses: CourseType[] }) {
    const t = useTranslations("TEACHER_DASHBOARD.COURSES");
    const locale = useLocale();
    const isRTL = locale === "ar";
    const router = useRouter();

    const handleDelete = (id: string) => {
        toast.info("Are you sure you want to delete this course?", {
            duration: 5000,
            position: "top-center",
            action: {
                label: "Yes",
                onClick: () => {
                    deleteCourse(id);
                    window.location.reload();
                },
            },
        });
    };

    return (
        <Tabs defaultValue="table" className="w-full">
            <div
                className={`flex flex-col justify-between gap-4 pb-4 md:flex-row md:items-center ${isRTL ? "rtl" : ""}`}
            >
                <TabsList
                    className={`order-2 md:order-1 ${isRTL ? "rtl" : ""}`}
                >
                    <TabsTrigger
                        value="table"
                        className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                        <Table className="h-4 w-4" />
                        <span>Table view</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="grid"
                        className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                        <LayoutGrid className="h-4 w-4" />
                        <span>Grid view</span>
                    </TabsTrigger>
                </TabsList>
                <div className="order-1 md:order-2">
                    <Button variant="outline" disabled>
                        <span>{t("link1")}</span>
                    </Button>
                    <Button variant="outline" className="ml-2" disabled>
                        <span>{t("link2")}</span>
                    </Button>
                </div>
            </div>

            <TabsContent value="table">
                <CoursesDataTable data={courses} />
            </TabsContent>

            <TabsContent value="grid">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {courses?.map(
                        ({ id, title, rating, category, description }) => (
                            <div
                                key={id}
                                className="flex flex-col gap-2 rounded-lg border p-6"
                            >
                                <header>
                                    <Tag color="blue">{category}</Tag>
                                    <div className="mt-4 flex items-center justify-between">
                                        <h3 className="text-lg font-semibold">
                                            {title}
                                        </h3>
                                        <span className="flex w-fit items-start gap-1 text-sm font-normal">
                                            <Star className="h-4 w-4 text-yellow-500" />{" "}
                                            {rating?.toFixed(1) || "N/A"}
                                        </span>
                                    </div>
                                </header>
                                <main className="mb-6 flex-1 justify-start">
                                    <p className="text-muted-foreground max-w-[35ch] line-clamp-2 text-sm">
                                        {description}
                                    </p>
                                </main>
                                <footer className="flex gap-2">
                                    <Button
                                        onClick={() =>
                                            router.push(
                                                `/dashboard/teacher/courses/${id}/edit`,
                                            )
                                        }
                                        variant="outline"
                                        aria-label="Edit"
                                        size="icon"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(id)}
                                        variant="outline"
                                        aria-label="Delete"
                                        size="icon"
                                    >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </footer>
                            </div>
                        ),
                    )}
                </div>
            </TabsContent>
        </Tabs>
    );
}
