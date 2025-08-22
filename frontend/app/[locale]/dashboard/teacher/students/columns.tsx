"use client";

import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Tag from "@/components/ui/Tag";
import { useTranslations } from "next-intl";

export type StudentData = {
    id: string;
    full_name: string;
    paid_amount: number;
    review?: number;
    questions: number;
    average_score: number;
    courses: string[];
    videos: number;
    exams: number;
    joined_at: string;
    phone_number: string;
    parent_number: string;
};

// Custom filter function for course tags
const courseFilterFn: FilterFn<StudentData> = (row, columnId, filterValue) => {
    if (!filterValue) return true;
    const courses = row.getValue(columnId) as string[];
    return courses.some((course) =>
        course.toLowerCase().includes(filterValue.toLowerCase()),
    );
};

export const getColumns = (): ColumnDef<StudentData>[] => {
    const t = useTranslations("TEACHER_DASHBOARD.STUDENTS.students_table");

    return [
        {
            accessorKey: "full_name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        className="p-0 text-white hover:bg-transparent"
                    >
                        {t("head1")}
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const student = row.original;
                return (
                    <div className="font-medium">
                        {student.full_name}
                        <div className="text-muted-foreground text-xs">
                            {student.phone_number}
                        </div>
                    </div>
                );
            },
            filterFn: "includesString",
        },
        {
            accessorKey: "paid_amount",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        className="p-0 text-white hover:bg-transparent"
                    >
                        {t("head2")}
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("paid_amount"));
                const formatted = new Intl.NumberFormat("ar-EG", {
                    style: "currency",
                    currency: "EGP",
                }).format(amount);
                return (
                    <div className="text-center font-bold">{formatted}</div>
                );
            },
        },
        {
            accessorKey: "average_score",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        className="p-0 text-white hover:bg-transparent"
                    >
                        {t("head4")}
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const score = parseFloat(row.getValue("average_score"));
                return (
                    <div className="text-center">
                        <Tag color={score >= 70 ? "green" : "red"}>
                            {score}%
                        </Tag>
                    </div>
                );
            },
        },
        {
            accessorKey: "courses",
            header: ({ column }) => {
                return (
                    <div className="p-0 text-start text-white hover:bg-transparent">
                        {t("head5")}
                    </div>
                );
            },
            cell: ({ row }) => {
                const courses = row.getValue("courses") as string[];
                return (
                    <div className="flex max-w-[200px] flex-wrap gap-1">
                        {courses.map((course, i) => (
                            <Tag key={i} color="yellow">
                                {course}
                            </Tag>
                        ))}
                    </div>
                );
            },
            filterFn: courseFilterFn,
        },
        {
            accessorKey: "videos",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        className="p-0 text-white hover:bg-transparent"
                    >
                        {t("head6")}
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const videos = row.getValue("videos");
                return (
                    <div className="text-center font-medium">
                        {videos as number}
                    </div>
                );
            },
        },

        {
            accessorKey: "questions",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        className="p-0 text-white hover:bg-transparent"
                    >
                        {t("head3")}
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const questions = row.getValue("questions");
                return (
                    <div className="text-center font-medium">
                        {questions as number}
                    </div>
                );
            },
        },
        {
            accessorKey: "exams",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        className="p-0 text-white hover:bg-transparent"
                    >
                        {t("head7")}
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const exams = row.getValue("exams");
                return (
                    <div className="text-center font-medium">
                        {exams as number}
                    </div>
                );
            },
        },
        {
            accessorKey: "joined_at",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        className="p-0 text-white hover:bg-transparent"
                    >
                        {t("head8")}
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const date = new Date(row.getValue("joined_at"));
                return (
                    <div className="text-center">
                        {date.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })}
                    </div>
                );
            },
        },
        {
            accessorKey: "parent_number",
            header: t("head9"),
            cell: ({ row }) => {
                return (
                    <div className="text-center">
                        {row.getValue("parent_number")}
                    </div>
                );
            },
        },
    ];
};




