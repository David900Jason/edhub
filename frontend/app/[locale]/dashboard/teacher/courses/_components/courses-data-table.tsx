"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "timeago.js";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import {
    ArrowUpDown,
    MoreHorizontal,
    Star,
    Edit,
    Trash2,
    Eye,
    FileText,
    FileQuestion,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/i18n/routing";
import Tag from "../../../../../../components/ui/Tag";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";
import { deleteCourse } from "@/lib/api/course";

// Define CourseType to match the data structure
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

// Apply translation to this table here

export const columns: ColumnDef<CourseType>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            const t = useTranslations("TEACHER_DASHBOARD.COURSES");
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="w-full justify-start p-0 hover:bg-transparent"
                >
                    {t("courses_table.columns.title")}
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="text-start font-medium">
                {row.getValue("title")}
            </div>
        ),
    },
    {
        accessorKey: "category",
        header: () => {
            const t = useTranslations("TEACHER_DASHBOARD.COURSES");
            return <div className="text-start">{t("courses_table.columns.category")}</div>;
        },
        cell: ({ row }) => <Tag color="green">{row.getValue("category")}</Tag>,
    },
    {
        accessorKey: "school_year",
        header: () => {
            const t = useTranslations("TEACHER_DASHBOARD.COURSES");
            return <div className="text-start">{t("courses_table.columns.grade")}</div>;
        },
        cell: ({ row }) => (
            <Tag color="blue">{row.getValue("school_year")}</Tag>
        ),
    },
    {
        accessorKey: "rating",
        header: ({ column }) => {
            const t = useTranslations("TEACHER_DASHBOARD.COURSES");
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="w-full justify-start hover:bg-transparent"
                >
                    {t("courses_table.columns.rating")}
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const rating = parseFloat(row.getValue("rating"));
            return (
                <div className="ml-4 flex items-center gap-2 text-start">
                    <Star className="inline h-4 w-4 text-yellow-300" />
                    {isNaN(rating) ? "N/A" : rating.toFixed(1)}
                </div>
            );
        },
    },
    {
        accessorKey: "price",
        header: () => {
            const t = useTranslations("TEACHER_DASHBOARD.COURSES");
            return (
                <div className="text-start">
                    {t("courses_table.columns.price")}
                </div>
            );
        },
        cell: ({ row }) => {
            const t = useTranslations("COMMON");
            const locale = useLocale();
            const price = parseFloat(row.getValue("price"));
            const currency = row.original.currency || t("currency.egp");
            const formatted = new Intl.NumberFormat(
                locale === "ar" ? "ar-EG" : "en-US",
                {
                    style: "currency",
                    currency: currency,
                    currencyDisplay: "symbol",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                },
            ).format(price);

            return <div className="text-start font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "created_at",
        header: () => {
            const t = useTranslations("TEACHER_DASHBOARD.COURSES");
            return <div className="text-start">{t("courses_table.columns.created")}</div>;
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue("created_at"));
            const currentLocale = useLocale();
            // Format the date using the locale
            return (
                <div className="text-start">{format(date, currentLocale)}</div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const course = row.original;
            const router = useRouter();

            const handleEdit = () => {
                router.push(`/dashboard/teacher/courses/${course.id}/edit`);
            };

            const handleDelete = async () => {
                if (!confirm("Are you sure you want to delete this course?"))
                    return;

                try {
                    const success = await deleteCourse(course.id);
                    if (success) {
                        toast.success("Course deleted successfully");
                        // Refresh the page to update the table
                        router.refresh();
                    } else {
                        throw new Error("Failed to delete course");
                    }
                } catch (error) {
                    console.error("Error deleting course:", error);
                    toast.error("Failed to delete course");
                } finally {
                    router.refresh();
                }
            };

            return (
                <div className="flex items-center gap-1">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>
                                {useTranslations("COMMON")("actions")}
                            </DropdownMenuLabel>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={handleEdit}
                                asChild
                            >
                                <span>
                                    <Edit className="h-4 w-4" />
                                    {useTranslations("COMMON")("edit")}
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-destructive hover:text-destructive/90 cursor-pointer"
                                onClick={handleDelete}
                                asChild
                            >
                                <span>
                                    <Trash2 className="text-destructive h-4 w-4" />
                                    {useTranslations("COMMON")("delete")}
                                </span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];


