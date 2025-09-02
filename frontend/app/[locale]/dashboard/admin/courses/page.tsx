"use client";

import { Button } from "@/components/ui/button";
import { getCourses } from "@/lib/api/course";
import { BookOpen, Edit, Trash2 } from "lucide-react";
import { useEffect, useMemo, useDeferredValue, useState } from "react";
import { format } from "timeago.js";
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

const CoursesPage = () => {
    const [courses, setCourses] = useState<CourseType[] | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPublished, setSelectedPublished] = useState("all");
    const [selectedTeacher, setSelectedTeacher] = useState("all");
    const [selectedSubject, setSelectedSubject] = useState("all");

    useEffect(() => {
        getCourses().then((res) => setCourses(res));
    }, []);

    const uniqueSubjects = [
        ...new Set(courses?.map((course) => course.category)),
    ];

    const uniqueTeachers = [
        ...new Set(courses?.map((course) => course.teacher?.full_name)),
    ];

    const deferredSearchQuery = useDeferredValue(searchQuery);

    const filteredCourses = useMemo(() => {
        if (!courses) return [];

        return courses.filter((course) => {
            const publishedStatus = course.is_published ? "published" : "draft";

            const matchesSubject =
                selectedSubject === "all" ||
                course.category?.includes(selectedSubject);

            const matchesTeacher =
                selectedTeacher === "all" ||
                course.teacher?.full_name?.includes(selectedTeacher);

            const matchesPublished =
                selectedPublished === "all" ||
                publishedStatus === selectedPublished;

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
    }, [
        courses,
        selectedSubject,
        selectedTeacher,
        selectedPublished,
        deferredSearchQuery,
    ]);

    const handleDeleteCourse = async (id: string) => {
        try {
            const res = await deleteCourse(id);
            if (res.message) {
                toast.success(res.message as string);
                setCourses((prev) =>
                    prev ? prev.filter((course) => course.id !== id) : null,
                );
            }
        } catch (error) {
            toast.error("Failed to delete course");
            console.log(error);
        }
    };

    return (
        <section>
            <header className="mb-8">
                <h1 className="text-3xl font-semibold">Courses</h1>
                <p className="p-lead">
                    Here&apos;s a table containing all courses
                </p>
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
                            value={selectedPublished}
                            onValueChange={(val) => {
                                setSelectedPublished(val);
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
                            value={selectedTeacher}
                            onValueChange={(val) => {
                                setSelectedTeacher(val);
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
                            value={selectedSubject}
                            onValueChange={(val) => {
                                setSelectedSubject(val);
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
                    {filteredCourses.map((course) => (
                        <div
                            key={course.id}
                            className="flex flex-col gap-4 rounded-2xl border bg-white p-6 dark:bg-slate-700/50"
                        >
                            <header>
                                <div className="text-primary mb-2 w-fit rounded-full bg-gray-200 p-4 dark:bg-white">
                                    <BookOpen size={28} />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold dark:text-black">
                                    {course.title}
                                </h3>
                                <p className="!text-muted-foreground text-sm">
                                    {course.teacher?.full_name} •{" "}
                                    {format(course.created_at)}
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
                                        disabled
                                    >
                                        <Edit />
                                    </Button>
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
                                </div>
                                <div className="flex items-center gap-2">
                                    <Tag color="blue">{course.category}</Tag>
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
