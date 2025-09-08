"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import CourseCard from "./CourseCard";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const CoursesView = ({
    courses = [],
    searchQuery = "",
}: {
    courses?: EnrollmentType[];
    searchQuery?: string;
}) => {
    const [searchInput, setSearchInput] = useState(searchQuery || "");
    const [filters, setFilters] = useState({
        category: "all",
        teacher: "all",
    });

    const deferredSearchInput = useDeferredValue(searchInput);

    const filteredCourses = useMemo(() => {
        return courses.filter((course) => {
            const isCategoryMatch =
                filters.category === "all" ||
                course.course?.category
                    ?.toLowerCase()
                    .includes(filters.category.toLowerCase());

            const isTeacherMatch =
                filters.teacher === "all" ||
                course.course?.teacher?.full_name
                    ?.toLowerCase()
                    .includes(filters.teacher.toLowerCase());

            return (
                course?.course?.title
                    ?.toLowerCase()
                    .includes(deferredSearchInput.toLowerCase()) &&
                course?.course?.description
                    ?.toLowerCase()
                    .includes(deferredSearchInput.toLowerCase()) &&
                isCategoryMatch &&
                isTeacherMatch
            );
        });
    }, [courses, deferredSearchInput, filters]);

    const uniqueCategories = useMemo(() => {
        return [
            ...new Set(
                courses
                    ?.map((course) => course.course?.category)
                    .filter(Boolean), // remove undefined/null
            ),
        ];
    }, [courses]);

    const uniqueTeachers = useMemo(() => {
        return [
            ...new Set(
                courses
                    ?.map((course) => course.course?.teacher?.full_name)
                    .filter(Boolean), // remove undefined/null
            ),
        ];
    }, [courses]);

    return (
        <>
            <main className="mb-20 rounded-2xl border p-6">
                <div className="mb-8 flex w-full flex-col justify-between gap-2 md:flex-row md:items-center">
                    <Input
                        placeholder={"Search your courses"}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="text-left md:max-w-sm"
                    />
                    <div className="flex items-center gap-2">
                        <Select
                            value={filters.category}
                            onValueChange={(value) =>
                                setFilters({ ...filters, category: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {uniqueCategories.map((category) => (
                                    <SelectItem
                                        key={category}
                                        value={category || ""}
                                    >
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select
                            value={filters.teacher}
                            onValueChange={(value) =>
                                setFilters({ ...filters, teacher: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by Teacher" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {uniqueTeachers.map((teacher) => (
                                    <SelectItem
                                        key={teacher}
                                        value={teacher || ""}
                                    >
                                        {teacher}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {filteredCourses && filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                        {filteredCourses.map((course) => (
                            <CourseCard key={course?.id} course={course} />
                        ))}
                    </div>
                ) : (
                    <div className="text-muted-foreground flex h-40 items-center justify-center">
                        <p>No Courses Found</p>
                    </div>
                )}
            </main>
        </>
    );
};

export default CoursesView;
