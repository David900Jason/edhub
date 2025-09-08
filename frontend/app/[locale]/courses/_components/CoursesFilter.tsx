"use client";

import { useState, useMemo, useDeferredValue } from "react";
import CoursesGrid from "./CoursesGrid";

const CoursesFilter = ({
    coursesData,
    searchParam,
}: {
    coursesData: CourseType[];
    searchParam?: string;
}) => {
    const [searchQuery, setSearchQuery] = useState(searchParam || "");
    const [filters, setFilters] = useState({
        category: "",
        teacher: "",
    });

    const handleFilterChange = (filter: string, value: string) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filter]: value,
        }));
    };

    const deferredSearchQuery = useDeferredValue(searchQuery);

    const filteredCourses = useMemo(() => {
        return coursesData?.filter((course: CourseType) => {
            const matchesCategory =
                !filters.category ||
                course.category
                    ?.toLowerCase()
                    .includes(filters.category.toLowerCase());

            const matchesSearch =
                !deferredSearchQuery ||
                course.title
                    ?.toLowerCase()
                    .includes(deferredSearchQuery.toLowerCase()) ||
                course.teacher?.full_name
                    ?.toLowerCase()
                    .includes(deferredSearchQuery.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [deferredSearchQuery, filters, coursesData]);

    const subjects = coursesData?.map((course: CourseType) => course?.category);
    const uniqueSubjects = new Set(subjects?.filter(Boolean) || []);

    return (
        <CoursesGrid
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filters={filters}
            setFilters={setFilters}
            uniqueSubjects={uniqueSubjects as Set<string>}
            handleFilterChange={handleFilterChange}
            filteredCourses={filteredCourses}
        />
    );
};

export default CoursesFilter;
