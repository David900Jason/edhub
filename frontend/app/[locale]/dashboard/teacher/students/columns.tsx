"use client";

import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Tag from "@/components/ui/Tag";
import Image from "next/image";

export type StudentData = {
    id: string;
    full_name: string;
    paid_amount: number;
    review?: number;
    questions: number;
    average_score: number;
    courses: string[];
    profile_img: string | null;
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
                        Name
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const student = row.original;
                return (
                    <div className="flex items-center gap-2">
                        <div>
                            {student.profile_img == null ? (
                                <Image
                                    src={"/avatar.jpg"}
                                    width={32}
                                    height={32}
                                    alt={student.full_name}
                                    className="rounded-full min-w-8 min-h-8"
                                />
                            ) : (
                                <Image
                                    src={student.profile_img}
                                    width={32}
                                    height={32}
                                    alt={student.full_name}
                                    className="rounded-full min-w-8 min-h-8"
                                />
                            )}
                        </div>
                        {student.full_name}
                    </div>
                );
            },
            filterFn: "includesString",
        },
        {
            accessorKey: "birth_date",
            header: "Birth Date",
            cell: ({ row }) => {
                return (
                    <div className="text-center">
                        {row.getValue("birth_date")}
                    </div>
                );
            },
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => {
                return (
                    <div className="text-center">
                        {row.getValue("email")}
                    </div>
                );
            },
        },
        {
            accessorKey: "city",
            header: "City",
            cell: ({ row }) => {
                return (
                    <div className="text-center">
                        {row.getValue("city")}
                    </div>
                );
            },
        },
        {
            accessorKey: "enrolled_courses",
            header: () => {
                return (
                    <div className="p-0 text-start text-white hover:bg-transparent">
                        Courses
                    </div>
                );
            },
            cell: ({ row }) => {
                const courses = row.getValue("enrolled_courses") as string[];
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
            accessorKey: "created_at",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        className="p-0 text-white hover:bg-transparent"
                    >
                        Created
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const date = new Date(row.getValue("created_at"));
                return (
                    <div className="text-center">
                        {date.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </div>
                );
            },
        },
        {
            accessorKey: "phone_number",
            header: "Phone Number",
            cell: ({ row }) => {
                return (
                    <div className="text-center">
                        {row.getValue("phone_number")}
                    </div>
                );
            },
        },
        {
            accessorKey: "parent_number",
            header: "Parent Number",
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
