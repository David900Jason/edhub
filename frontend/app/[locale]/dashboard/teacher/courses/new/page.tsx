"use client";

import { useState, useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { createCourse } from "@/lib/api/course";

type CourseFormData = {
    title: string;
    description: string;
    category: string;
    school_year: string;
    price: number;
};

export default function NewCoursePage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [course, setCourse] = useState<CourseFormData>({
        title: "",
        description: "",
        category: "Math",
        school_year: "Grade 10",
        price: 0,
    });

    useEffect(() => {
        // Get user from localStorage on component mount
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            router.push("/auth/login");
        }
    }, [router]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value, type } = e.target as HTMLInputElement;
        setCourse((prev) => ({
            ...prev,
            [name]: type === "number" ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            toast.error("You must be logged in to create a course");
            return;
        }

        try {
            setIsSaving(true);
            const newCourse = await createCourse({
                ...course,
                teacher_id: user.id,
            });

            if (newCourse) {
                toast.success("Course created successfully");
                router.push("/dashboard/teacher/courses");
                router.refresh();
            } else {
                throw new Error("Failed to create course");
            }
        } catch (error) {
            console.error("Error creating course:", error);
            toast.error("Failed to create course");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8">
            <div className="mb-8">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="mb-6 px-0 hover:bg-transparent"
                >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    <span className="text-base">Back to courses</span>
                </Button>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Create New Course
                    </h1>
                    <p className="text-muted-foreground">
                        Fill in the details below to create a new course for
                        your students
                    </p>
                </div>
            </div>

            <div className="bg-card text-card-foreground rounded-lg border shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-8 p-6">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Title */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="title"
                                    className="text-sm font-medium"
                                >
                                    Course Title{" "}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={course.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Introduction to Algebra"
                                    className="h-11"
                                    required
                                />
                                <p className="text-muted-foreground text-xs">
                                    A clear and descriptive title for your
                                    course
                                </p>
                            </div>

                            {/* Category */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="category"
                                    className="text-sm font-medium"
                                >
                                    Category{" "}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Select
                                    name="category"
                                    value={course.category}
                                    onValueChange={(value) => {
                                        setCourse((prev) => ({
                                            ...prev,
                                            category: value,
                                        }));
                                    }}
                                    required
                                >
                                    <SelectTrigger className="h-11">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Math">
                                            Mathematics
                                        </SelectItem>
                                        <SelectItem value="Science">
                                            Science
                                        </SelectItem>
                                        <SelectItem value="English">
                                            English
                                        </SelectItem>
                                        <SelectItem value="History">
                                            History
                                        </SelectItem>
                                        <SelectItem value="Computer Science">
                                            Computer Science
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Grade Level */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="school_year"
                                    className="text-sm font-medium"
                                >
                                    Grade Level{" "}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Select
                                    name="school_year"
                                    value={course.school_year}
                                    onValueChange={(value) => {
                                        setCourse((prev) => ({
                                            ...prev,
                                            school_year: value,
                                        }));
                                    }}
                                    required
                                >
                                    <SelectTrigger className="h-11">
                                        <SelectValue placeholder="Select grade level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Grade 10">
                                            Grade 10
                                        </SelectItem>
                                        <SelectItem value="Grade 11">
                                            Grade 11
                                        </SelectItem>
                                        <SelectItem value="Grade 12">
                                            Grade 12
                                        </SelectItem>
                                        <SelectItem value="University">
                                            University
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Price */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="price"
                                    className="text-sm font-medium"
                                >
                                    Price (EGP){" "}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <div className="relative">
                                    <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                                        EGP
                                    </span>
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={course.price}
                                        onChange={handleChange}
                                        className="h-11 pl-14"
                                        required
                                    />
                                </div>
                                <p className="text-muted-foreground text-xs">
                                    Set 0 for free courses
                                </p>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Description */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="description"
                                    className="text-sm font-medium"
                                >
                                    Course Description{" "}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={course.description}
                                    onChange={handleChange}
                                    placeholder="Provide a detailed description of your course..."
                                    className="min-h-[200px]"
                                    required
                                />
                                <p className="text-muted-foreground text-xs">
                                    Describe what students will learn in this
                                    course
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end space-x-3 border-t pt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                router.push("/dashboard/teacher/courses")
                            }
                            disabled={isSaving}
                            className="h-10"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSaving}
                            className="h-10 min-w-32 btn-primary"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />
                                    Create Course
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

