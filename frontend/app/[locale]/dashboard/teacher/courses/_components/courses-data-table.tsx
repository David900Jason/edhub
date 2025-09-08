"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Tag from "@/components/ui/Tag";
import Actions from "./Actions";
import Price from "./Price";
import TimeAgo from "@/components/ui/time-ago";

// Apply translation to this table here

export const columns: ColumnDef<CourseType>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="w-full justify-start p-0 hover:bg-transparent"
                >
                    Courses
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
            return <div className="text-start">Category</div>;
        },
        cell: ({ row }) => <Tag color="blue">{row.getValue("category")}</Tag>,
    },
    {
        accessorKey: "rating",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="w-full justify-start hover:bg-transparent"
                >
                    Rating
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
            return <div className="text-start">Price</div>;
        },
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"));
            return (
                <div className="text-start font-medium">
                    <Price price={price} />
                </div>
            );
        },
    },
    {
        accessorKey: "created_at",
        header: () => {
            return <div className="text-start">Created</div>;
        },
        cell: ({ row }) => {
            return <TimeAgo date={row.getValue("created_at")} />;
        },
    },
    {
        accessorKey: "is_published",
        header: () => {
            return <div className="text-start">Status</div>;
        },
        cell: ({ row }) => {
            const isPublished = row.getValue("is_published");
            return (
                <div className="text-start">
                    {isPublished ? (
                        <Tag color="green">Published</Tag>
                    ) : (
                        <Tag color="red">Not Published</Tag>
                    )}
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { id } = row.original;
            return <Actions id={id} />;
        },
    },
];
