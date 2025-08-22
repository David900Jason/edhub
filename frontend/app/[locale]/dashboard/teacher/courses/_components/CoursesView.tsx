"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    Trash2,
    Edit,
    MoreVertical,
    Eye,
    Star,
    FileQuestion,
    FileText,
} from "lucide-react";
import { Table, LayoutGrid } from "lucide-react";
import { CoursesDataTable } from "./CoursesDataTable";
import { deleteCourse } from "@/lib/api/course";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Tag from "../../../../../../components/ui/Tag";
import { useTranslations, useLocale } from "next-intl";

// Course type definition matching the data structure
type CourseType = {
    id: string;
    title: string;
    description: string;
    teacher_id: string;
    price: number;
    school_year: string;
    discount: number;
    currency: string;
    is_paid: boolean;
    is_published: boolean;
    category: string;
    thumbnail: string;
    created_at: string;
    updated_at: string;
    rating?: number;
};

interface CoursesViewProps {
    data: CourseType[];
}

export function CoursesView({ data: initialData }: CoursesViewProps) {
    const [view, setView] = useState<"table" | "grid">("table");
    const [data, setData] = useState(initialData);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const router = useRouter();
    const t = useTranslations("TEACHER_DASHBOARD.COURSES");
    const locale = useLocale();
    const isRTL = locale === 'ar';

    const handleDelete = async (courseId: string) => {
        if (!confirm("Are you sure you want to delete this course?")) return;

        try {
            setIsDeleting(courseId);
            const success = await deleteCourse(courseId);
            if (success) {
                toast.success("Course deleted successfully");
                // Refresh the page to update the UI
                router.refresh();
            } else {
                throw new Error("Failed to delete course");
            }
        } catch (error) {
            console.error("Error deleting course:", error);
            toast.error("Failed to delete course");
        } finally {
            setIsDeleting(null);
            router.refresh();
        }
    };

    const handleEdit = (courseId: string) => {
        router.push(`/dashboard/teacher/courses/${courseId}/edit`);
    };

    return (
        <Tabs
            defaultValue="table"
            className="w-full"
            onValueChange={(value) => setView(value as "table" | "grid")}
        >
            <div className={`flex flex-col justify-between gap-4 pb-4 sm:flex-row sm:items-center ${isRTL ? 'rtl' : ''}`}>
                <TabsList className={`order-2 sm:order-1 ${isRTL ? 'rtl' : ''}`}>
                    <TabsTrigger
                        value="table"
                        className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                        <Table className="h-4 w-4" />
                        <span>{t("courses_table.views.table")}</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="grid"
                        className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                        <LayoutGrid className="h-4 w-4" />
                        <span>{t("courses_table.views.grid")}</span>
                    </TabsTrigger>
                </TabsList>
                <div className="order-1 sm:order-2">
                    <Button
                        variant="outline"
                        onClick={() =>
                            router.push("/dashboard/teacher/assignments")
                        }
                    >
                        <span>{t("link1")}</span>
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() =>
                            router.push("/dashboard/teacher/quizzes")
                        }
                        className="ml-2"
                    >
                        <span>{t("link2")}</span>
                    </Button>
                </div>
            </div>

            <TabsContent value="table">
                <div>
                    <CoursesDataTable data={data} />
                </div>
            </TabsContent>

            <TabsContent value="grid">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((course) => (
                        <div
                            key={course.id}
                            className="flex flex-col gap-6 rounded-lg border p-6 shadow-sm"
                        >
                            <header>
                                <div className="mb-4 flex items-center gap-2">
                                    <Tag color="blue">{course.category}</Tag>
                                    <Tag color="green">
                                        {course.school_year}
                                    </Tag>
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">
                                    {course.title}
                                </h3>
                                <p className="text-muted-foreground flex items-center gap-1 text-sm">
                                    <Star className="h-4 w-4 text-yellow-500" />{" "}
                                    {course.rating?.toFixed(1) || "N/A"}
                                </p>
                            </header>
                            <main className="flex-1">
                                <p className="text-muted-foreground">
                                    {course.description}
                                </p>
                            </main>
                            <footer className="flex gap-2">
                                <Button
                                    onClick={() => handleEdit(course.id)}
                                    variant="outline"
                                    size="sm"
                                >
                                    <Edit className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                    onClick={() => handleDelete(course.id)}
                                    disabled={isDeleting === course.id}
                                    variant="destructive"
                                    size="sm"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                            </footer>
                        </div>
                    ))}
                </div>
            </TabsContent>
        </Tabs>
    );
}
