"use client";

import { useState, useDeferredValue, useMemo } from "react";
import { getMonth } from "date-fns";
import { School } from "lucide-react";
import { courses } from "@/constants";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/";
import {
    Banner,
    CourseCard,
    Footer,
    Navbar,
    SearchBar,
    FilterSelect,
} from "@/components/";
import { navLinks } from "@/constants";

const Courses = () => {
    // State for search and filters
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        schoolYear: "",
        subject: "",
    });

    // Use deferred value for search query to prevent UI blocking
    const deferredSearchQuery = useDeferredValue(searchQuery);

    // Filter courses based on search and filters
    const filteredCourses = useMemo(() => {
        return courses.filter((course) => {
            // Search query filter
            const matchesSearch =
                course.title
                    .toLowerCase()
                    .includes(deferredSearchQuery.toLowerCase()) ||
                course.subject
                    .toLowerCase()
                    .includes(deferredSearchQuery.toLowerCase());

            // Apply filters
            const matchesSchoolYear =
                !filters.schoolYear || course.schoolYear === filters.schoolYear;
            const matchesSubject =
                !filters.subject || course.subject === filters.subject;

            return matchesSearch && matchesSchoolYear && matchesSubject;
        });
    }, [deferredSearchQuery, filters]);

    // Handle filter changes
    const handleFilterChange = (filterName: string, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [filterName]: value,
        }));
    };

    // Get unique subjects for filter options
    const subjects = useMemo(() => {
        const uniqueSubjects = new Set(courses.map((course) => course.subject));
        return Array.from(uniqueSubjects);
    }, []);

    const months = useMemo(() => {
        const uniqueMonths = new Set(
            courses.map((course) => getMonth(new Date(course.createdAt))),
        );
        return Array.from(uniqueMonths);
    }, []);

    return (
        <>
            <header className="header-sticky">
                <Navbar navLinks={navLinks} />
            </header>

            {/* Banner */}
            <Banner className="mb-6 grid place-content-center">
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
                        value={filters.schoolYear}
                        onValueChange={(value) =>
                            handleFilterChange("schoolYear", value)
                        }
                    />
                    <FilterSelect
                        placeholder="Subject"
                        options={subjects}
                        value={filters.subject}
                        onValueChange={(value) =>
                            handleFilterChange("subject", value)
                        }
                    />
                    <Button
                        variant="outline"
                        onClick={() => {
                            setSearchQuery("");
                            setFilters({
                                schoolYear: "",
                                subject: "",
                            });
                        }}
                    >
                        Clear Filters
                    </Button>
                </div>
            </Container>

            {/* Courses Grid */}
            <Container className="mb-16 grid grid-cols-1 gap-6 min-[630px]:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))
                ) : (
                    <p className="col-span-10 inline text-center text-lg font-normal text-gray-400">
                        No Courses Found
                    </p>
                )}
            </Container>

            <Footer />
        </>
    );
};

export default Courses;
