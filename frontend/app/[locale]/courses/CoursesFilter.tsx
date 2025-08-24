"use client";

import { useState, useMemo, useDeferredValue } from "react";
import CoursesGrid from "./CoursesGrid";

const CoursesFilter = ({ coursesData }: { coursesData: CourseType[] }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        category: "",
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
            return (
                course.category
                    .toLowerCase()
                    .includes(filters?.category.toLowerCase()) &&
                course.title
                    .toLowerCase()
                    .includes(deferredSearchQuery.toLowerCase())
            );
        });
    }, [deferredSearchQuery, filters, coursesData]);

    const subjects = coursesData?.map((course: CourseType) => course.category);
    const uniqueSubjects = new Set(subjects);

    return (
        <CoursesGrid
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filters={filters}
            setFilters={setFilters}
            uniqueSubjects={uniqueSubjects}
            handleFilterChange={handleFilterChange}
            filteredCourses={filteredCourses}
        />
    );
};

export default CoursesFilter;
