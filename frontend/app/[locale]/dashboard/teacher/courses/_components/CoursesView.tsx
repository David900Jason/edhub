"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
    Trash2,
    Edit,
    Star,
} from "lucide-react";
import { Table, LayoutGrid } from "lucide-react";
import { CoursesDataTable } from "./CoursesDataTable";
import { useTranslations, useLocale } from "next-intl";
import Tag from "@/components/ui/Tag";
import { useRouter } from "@/i18n/routing";

export function CoursesView({ courses }: { courses: CourseType[] }) {
    const [view, setView] = useState<"table" | "grid">("table");
    const t = useTranslations("TEACHER_DASHBOARD.COURSES");
    const locale = useLocale();
    const isRTL = locale === 'ar';
    const router = useRouter();

    return (
        <Tabs
            defaultValue="table"
            className="w-full"
            onValueChange={(value) => setView(value as "table" | "grid")}
        >
            <div
                className={`flex flex-col justify-between gap-4 pb-4 sm:flex-row sm:items-center ${isRTL ? "rtl" : ""}`}
            >
                <TabsList
                    className={`order-2 sm:order-1 ${isRTL ? "rtl" : ""}`}
                >
                    <TabsTrigger
                        value="table"
                        className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                        <Table className="h-4 w-4" />
                        <span>{view}</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="grid"
                        className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                        <LayoutGrid className="h-4 w-4" />
                        <span>{t("courses_table.views.grid")}</span>
                    </TabsTrigger>
                </TabsList>
                <div className="order-1 sm:order-2">
                    <Button variant="outline" disabled>
                        <span>{t("link1")}</span>
                    </Button>
                    <Button variant="outline" className="ml-2" disabled>
                        <span>{t("link2")}</span>
                    </Button>
                </div>
            </div>

            <TabsContent value="table">
                <div>
                    <CoursesDataTable data={courses} />
                </div>
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
                                    <div className="mb-2 flex items-center gap-2">
                                        <Tag color="blue">{category}</Tag>
                                    </div>
                                    <h3 className="text-lg font-semibold flex justify-between">
                                        {title}{" "}
                                        <span className="flex items-center gap-1 text-sm font-normal">
                                            <Star className="h-4 w-4 text-yellow-500" />{" "}
                                            {rating?.toFixed(1) || "N/A"}
                                        </span>
                                    </h3>
                                </header>
                                <main className="flex-1 justify-start mb-4">
                                    <p className="text-muted-foreground">
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
                                        size="sm"
                                    >
                                        <Edit className="h-3.5 w-3.5" />
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => {}}
                                        variant="destructive"
                                        size="sm"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                        Delete
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
