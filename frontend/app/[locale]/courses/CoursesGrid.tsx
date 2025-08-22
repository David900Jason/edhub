"use client";

import Container from "@/components/containers/Container";
import CourseCard from "@/components/cards/CourseCard";
import SearchBar from "@/components/sublayout/SearchBar";
import FilterSelect from "@/components/sublayout/FilterSelect";
import { Button } from "@/components/ui/button";

const CoursesGrid = ({
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    uniqueSubjects,
    handleFilterChange,
    filteredCourses,
}: {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filters: { school_year: string; category: string };
    setFilters: (filters: { school_year: string; category: string }) => void;
    uniqueSubjects: Set<string>;
    handleFilterChange: (filter: string, value: string) => void;
    filteredCourses: CourseType[] | undefined;
}) => {
    return (
        <>
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

            <Container className="mb-16 grid grid-cols-1 gap-6 min-[630px]:grid-cols-2 lg:grid-cols-3">
                {filteredCourses && filteredCourses?.length > 0 ? (
                    filteredCourses?.map(
                        (course: CourseType, index: number) => (
                            <CourseCard key={index} course={course} />
                        ),
                    )
                ) : (
                    <p className="col-span-10 inline text-center text-sm font-normal text-gray-400">
                        No Courses Found
                    </p>
                )}
            </Container>
        </>
    );
};

export default CoursesGrid;
