"use client";

import { Button } from "@/components/ui/button";
import { getCourses, togglePublished } from "@/lib/api/course";
import { BookOpen, Trash2 } from "lucide-react";
import { useEffect, useMemo, useDeferredValue, useState } from "react";
import Tag from "@/components/ui/Tag";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { deleteCourse } from "@/lib/api/course";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import EditCourseDialog from "./EditCourseDialog";

type CourseFilters = {
    published: string;
    teacher: string;
    subject: string;
};

const CoursesPage = () => {
    // Get/Set Courses
    const [courses, setCourses] = useState<CourseType[] | null>(null);

    // Filter States
    const [filters, setFilters] = useState<CourseFilters>({
        published: "all",
        teacher: "all",
        subject: "all",
    });

    const searchParams = useSearchParams();
    const search = searchParams.get("search");

    const [searchQuery, setSearchQuery] = useState(search || "");

    useEffect(() => {
        getCourses().then((res) => setCourses(res));
    }, []);

    // Extract unique subjects
    const uniqueSubjects = [
        ...new Set(courses?.map((course) => course.category)),
    ];

    // Extract unique teachers
    const uniqueTeachers = [
        ...new Set(courses?.map((course) => course.teacher?.full_name)),
    ];

    // Defer search query value
    const deferredSearchQuery = useDeferredValue(searchQuery);

    // Filter courses according to filters input
    const filteredCourses = useMemo(() => {
        if (!courses) return [];

        return courses.filter((course) => {
            const publishedStatus = course.is_published ? "published" : "draft";

            const matchesSubject =
                filters.subject === "all" ||
                course.category?.includes(filters.subject);

            const matchesTeacher =
                filters.teacher === "all" ||
                course.teacher?.full_name?.includes(filters.teacher);

            const matchesPublished =
                filters.published === "all" ||
                publishedStatus === filters.published;

            const matchesSearch =
                deferredSearchQuery === "" ||
                course.title
                    ?.toLowerCase()
                    .includes(deferredSearchQuery.toLowerCase());

            return (
                matchesSubject &&
                matchesTeacher &&
                matchesPublished &&
                matchesSearch
            );
        });
    }, [courses, filters, deferredSearchQuery]);

    // Util: Delete course
    const handleDeleteCourse = async (id: string) => {
        toast("Are you sure you want to delete this course?", {
            position: "top-center",
            description: "This action can't be undone",
            action: {
                label: "Yes",
                onClick: async () => {
                    try {
                        const res = await deleteCourse(id);
                        if (res.message) {
                            toast.success(res.message as string);
                            setCourses((prev) =>
                                prev
                                    ? prev.filter((course) => course.id !== id)
                                    : null,
                            );
                        }
                    } catch (error) {
                        toast.error("Failed to delete course");
                        console.log(error);
                    }
                },
            },
            cancel: {
                label: "No",
                onClick: () => {
                    toast.dismiss();
                },
            },
        });
    };

    // Util: Handle Edit course
    const handleEditCourse = async (id: string, data: Partial<CourseType>) => {
        setCourses((prev) =>
            prev
                ? prev.map((course) =>
                      course.id === id
                          ? {
                                ...course,
                                ...data,
                            }
                          : course,
                  )
                : null,
        );
    };

    // Util: Toggle 'is_published' state
    const togglePublishState = async (id: string) => {
        try {
            const res = await togglePublished(id);
            if (res.message) {
                toast.success(res?.message as string);
                setCourses((prev) =>
                    prev
                        ? prev.map((course) =>
                              course.id === id
                                  ? {
                                        ...course,
                                        is_published: !course.is_published,
                                    }
                                  : course,
                          )
                        : null,
                );
            }
        } catch (error) {
            toast.error("Failed to toggle publish state");
            console.log(error);
        }
    };

    return (
        <section>
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold">Courses</h1>
                    <p className="p-lead">
                        Here&apos;s a table containing all courses
                    </p>
                </div>
            </header>
            <main className="space-y-6 rounded-2xl border p-6">
                <aside className="flex flex-col gap-2 md:flex-row">
                    <Input
                        value={searchQuery}
                        placeholder="Search courses..."
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="flex flex-wrap items-center justify-center gap-2 md:flex-nowrap">
                        <Select
                            value={filters.published}
                            onValueChange={(val) => {
                                setFilters((prev) => ({
                                    ...prev,
                                    published: val,
                                }));
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select published" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="published">
                                    <Tag color="green">Published</Tag>
                                </SelectItem>
                                <SelectItem value="draft">
                                    <Tag color="red">Draft</Tag>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            value={filters.teacher}
                            onValueChange={(val) => {
                                setFilters((prev) => ({
                                    ...prev,
                                    teacher: val,
                                }));
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select teacher" />
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
                        <Select
                            value={filters.subject}
                            onValueChange={(val) => {
                                setFilters((prev) => ({
                                    ...prev,
                                    subject: val,
                                }));
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {uniqueSubjects.map((subject) => (
                                    <SelectItem
                                        key={subject}
                                        value={subject || ""}
                                    >
                                        {subject}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </aside>
                <section className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                    {filteredCourses.map((course: CourseType) => (
                        <div
                            key={course.id}
                            className="flex flex-col gap-4 rounded-2xl border bg-white p-6 dark:bg-slate-700/50"
                        >
                            <header>
                                <div className="text-primary mb-2 w-fit rounded-full bg-gray-200 p-4 dark:bg-white">
                                    <BookOpen size={28} />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold dark:text-white">
                                    {course.title}
                                </h3>
                                <p className="!text-muted-foreground text-sm">
                                    {course.teacher?.full_name} •{" "}
                                    <span className="text-primary">
                                        {course.price == 0 ? (
                                            "Free"
                                        ) : (
                                            <>
                                                {course.price}{" "}
                                                <span className="text-[10px] font-extrabold text-gray-500">
                                                    {course.currency}
                                                </span>
                                            </>
                                        )}
                                    </span>
                                </p>
                            </header>
                            <main className="flex-1">
                                <p className="!text-muted-foreground !line-clamp-2 text-sm">
                                    {course.description}
                                </p>
                            </main>
                            <hr />
                            <footer className="flex items-center justify-between">
                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="text-red-500"
                                        onClick={() => {
                                            handleDeleteCourse(course.id);
                                        }}
                                    >
                                        <Trash2 />
                                    </Button>
                                    {/* Edit Course Dialog */}
                                    <EditCourseDialog
                                        course={course}
                                        onEdit={(id, data) =>
                                            handleEditCourse(id, data)
                                        }
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Tag color="blue">{course.category}</Tag>
                                    <span
                                        onClick={() =>
                                            togglePublishState(course.id)
                                        }
                                        className="cursor-pointer transition-all hover:scale-105"
                                    >
                                        <Tag
                                            color={
                                                course.is_published
                                                    ? "green"
                                                    : "red"
                                            }
                                        >
                                            {course.is_published
                                                ? "Published"
                                                : "Draft"}
                                        </Tag>
                                    </span>
                                </div>
                            </footer>
                        </div>
                    ))}
                </section>
            </main>
        </section>
    );
};

export default CoursesPage;

