"use client";

import { useState, useMemo, useDeferredValue } from "react";

import { Loader2, School } from "lucide-react";

import Container from "@/components/containers/Container";
import Banner from "@/components/containers/Banner";
import CourseCard from "@/components/cards/CourseCard";
import SearchBar from "@/components/sublayout/SearchBar";
import FilterSelect from "@/components/sublayout/FilterSelect";
import { Button } from "@/components/ui/button";

import { useQuery } from "@tanstack/react-query";
import { fetchCourses } from "@/lib/api";

const Courses = () => {
    const { data: coursesData, isLoading } = useQuery({
        queryKey: ["courses"],
        queryFn: () => fetchCourses(),
    });

    // State for search and filters
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
        <>
            {/* Banner */}
            <Banner className="mb-6 grid min-h-[40vh] place-content-center">
                <h1 className="mx-auto mb-4 flex items-center gap-4 text-center text-5xl font-bold tracking-tighter">
                    <School size={64} className="inline-block" /> Courses
                </h1>
                <p className="p-lead mx-auto max-w-[45ch] text-center !text-white">
                    Explore a wide range of courses tailored to your learning
                    goals, Check them out below!
                </p>
            </Banner>

            {/* Search and Filters */}
            <Container className="space-y-4">
                <SearchBar
                    value={searchQuery}
                    onSearch={(e) => setSearchQuery(e)}
                    placeholder="Search courses..."
                />

                <div className="flex flex-wrap items-center gap-4">
                    <FilterSelect
                        placeholder="School year"
                        options={["Grade 10", "Grade 11", "Grade 12"]}
                        value={filters?.school_year}
                        onValueChange={(value) =>
                            handleFilterChange("school_year", value)
                        }
                    />
                    <FilterSelect
                        placeholder="Subject"
                        options={Array.from(uniqueSubjects) as string[]}
                        value={filters?.category}
                        onValueChange={(value) =>
                            handleFilterChange("category", value)
                        }
                    />
                    <Button
                        variant="outline"
                        onClick={() => {
                            setSearchQuery("");
                            setFilters({
                                school_year: "",
                                category: "",
                            });
                        }}
                    >
                        Clear Filters
                    </Button>
                </div>
            </Container>

            {/* Courses Grid */}
            <Container className="mb-16 grid grid-cols-1 gap-6 min-[630px]:grid-cols-2 lg:grid-cols-3">
                {filteredCourses && filteredCourses?.length > 0 ? (
                    filteredCourses?.map(
                        (course: CourseType, index: number) => (
                            <CourseCard key={index} course={course} />
                        ),
                    )
                ) : isLoading ? (
                    <p className="col-span-10 inline text-center text-sm font-normal text-gray-400">
                        <Loader2 className="inline animate-spin" /> Loading
                    </p>
                ) : (
                    <p className="col-span-10 inline text-center text-sm font-normal text-gray-400">
                        No Courses Found
                    </p>
                )}
            </Container>
        </>
    );
};

export default Courses;
