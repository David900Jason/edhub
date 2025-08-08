"use client";

import { useState, useMemo, useDeferredValue } from "react";
import CoursesGrid from "./CoursesGrid";

const CoursesFilter = ({
    coursesData,
}: {
    coursesData: CourseType[] | undefined;
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        school_year: "",
        category: "",
    });

    const handleFilterChange = (filter: string, value: string) => {
        setFilters((prevFilters: any) => ({
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
                course.school_year
                    .toLowerCase()
                    .includes(filters?.school_year.toLowerCase()) &&
                course.title
                    .toLowerCase()
                    .includes(deferredSearchQuery.toLowerCase())
            );
        });
    }, [deferredSearchQuery, filters]);

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
