"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Tag from "@/components/ui/Tag";
import { format } from "timeago.js";
import { useMemo, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const SubscriptionsList = ({ courses }: { courses: EnrollmentType[] }) => {
    const [category, setCategory] = useState("All");
    const [search, setSearch] = useState("");

    const categoriesList = useMemo(() => {
        const categories = [
            "All",
            courses.map((course) => course.course.category),
        ];
        return [...new Set(categories.flat())];
    }, [courses]);

    const filteredCourses = useMemo(() => {
        let result = [...courses];

        if (category !== "All") {
            result = result.filter((course) =>
                course.course.category
                    ?.toLowerCase()
                    .includes(category.toLowerCase()),
            );
        }

        if (search) {
            result = result.filter((course) =>
                course.course.title
                    ?.toLowerCase()
                    .includes(search.toLowerCase()),
            );
        }

        return result;
    }, [category, courses, search]);

    return (
        <main className="mt-4 rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">My Subscriptions</h2>
            <p className="p-lead mb-6">Check out your subscriptions with us</p>
            <div className="mb-6 flex items-center justify-between gap-2">
                <Input
                    placeholder="Search your subscriptions ..."
                    value={search || ""}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                        <SelectValue
                            placeholder="Select a course"
                            defaultValue="All"
                        />
                    </SelectTrigger>
                    <SelectContent>
                        {categoriesList.map((category) => (
                            <SelectItem
                                key={category as string}
                                value={category as string}
                            >
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Teacher</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Total Paid</TableHead>
                            <TableHead>Enrolled At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCourses.map((course, index) => (
                            <TableRow key={index}>
                                <TableCell className="py-4">
                                    #{index + 1}
                                </TableCell>
                                <TableCell className="py-4">
                                    {course.course.title}
                                </TableCell>
                                <TableCell className="py-4">
                                    {course.course.teacher?.full_name}
                                </TableCell>
                                <TableCell className="py-4">
                                    <Tag color="yellow">
                                        {course.course.category}
                                    </Tag>
                                </TableCell>
                                <TableCell className="py-4">
                                    <span>
                                        {course.course.price == 0
                                            ? "Free"
                                            : `${course.course.price} ${course.course.currency}`}
                                    </span>
                                </TableCell>
                                <TableCell className="py-4">
                                    <span>
                                        {(course.amount_paid ?? 0) == 0
                                            ? "Free"
                                            : `${course.amount_paid} ${course.course.currency}`}
                                    </span>
                                </TableCell>
                                <TableCell className="py-4">
                                    {format(course.timestamp)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableCaption className="mb-4">
                        {filteredCourses.length > 0
                            ? "List of your subscriptions"
                            : "No subscriptions yet"}
                    </TableCaption>
                </Table>
            </div>
        </main>
    );
};

export default SubscriptionsList;
