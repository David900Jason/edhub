"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";
import { createCourse } from "@/lib/api/course";

export default function NewCoursePage() {
    const router = useRouter();
    const [course, setCourse] = useState<
        Omit<CourseType, "id" | "created_at" | "updated_at" | "rating">
    >({
        title: "",
        description: "",
        category: "",
        price: 0,
        discount: 0,
        currency: "",
        is_published: false,
        is_paid: false,
    });

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

        try {
            const newCourse = await createCourse(course);

            if (newCourse) {
                toast.success("Course created successfully");
                router.push("/dashboard/teacher/courses");
            } else {
                throw new Error("Failed to create course");
            }
        } catch (error) {
            console.error("Error creating course:", error);
            toast.error("Failed to create course");
        }
    };

    return (
        <div className="container mx-auto max-w-4xl">
            <div className="mb-8">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="mb-6 px-0 hover:bg-transparent"
                    asChild
                >
                    <span className="text-base">
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Back to courses
                    </span>
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
                                <Input
                                    id="category"
                                    name="category"
                                    value={course.category}
                                    onChange={handleChange}
                                    placeholder="e.g. Mathematics"
                                    className="h-11"
                                    required
                                />
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

                            {/* Discount */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="discount"
                                    className="text-sm font-medium"
                                >
                                    Discount{" "}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="discount"
                                    name="discount"
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={course.discount}
                                    onChange={handleChange}
                                    className="h-11"
                                    required
                                />
                                <p className="text-muted-foreground text-xs">
                                    Enter a number to be subtracted from the
                                    price. Must be Smaller than Price Value
                                </p>
                            </div>

                            {/* Currency */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="currency"
                                    className="text-sm font-medium"
                                >
                                    Currency{" "}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="currency"
                                    name="currency"
                                    value={course.currency}
                                    onChange={handleChange}
                                    placeholder="e.g. EGP"
                                    className="h-11"
                                    required
                                />
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
                            className="h-10"
                        >
                            Cancel
                        </Button>
                        <Button className="btn-primary" type="submit">
                            <Save className="h-4 w-4" />
                            Create Course
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
