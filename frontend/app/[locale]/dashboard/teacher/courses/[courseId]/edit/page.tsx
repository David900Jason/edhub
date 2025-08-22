"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
import { getCourse, updateCourse } from "@/lib/api/course";
import { useTranslations } from "next-intl";

export default function EditCoursePage() {
    const router = useRouter();
    const t = useTranslations("TEACHER_DASHBOARD.COURSES.EDIT_COURSE");
    const { courseId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [course, setCourse] = useState<CourseType | null>(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const data = await getCourse(courseId as string);
                if (data) {
                    setCourse(data);
                } else {
                    toast.error("Course not found");
                    router.push("/dashboard/teacher/courses");
                }
            } catch (error) {
                console.error("Error fetching course:", error);
                toast.error("Failed to load course data");
                router.push("/dashboard/teacher/courses");
            } finally {
                setIsLoading(false);
            }
        };

        if (courseId) {
            fetchCourse();
        }
    }, [courseId, router]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value, type } = e.target as HTMLInputElement;

        setCourse((prev) => {
            if (!prev) return null;
            return {
                ...prev,
                [name]: type === "number" ? parseFloat(value) : value,
            };
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setCourse((prev) => {
            if (!prev) return null;
            return {
                ...prev,
                [name]: checked,
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!course) return;

        try {
            setIsSaving(true);
            const success = await updateCourse(course.id, course);

            if (success) {
                toast.success("Course updated successfully");
                // Redirect to the courses page instead of course details
                router.push("/dashboard/teacher/courses");
                router.refresh(); // Ensure the courses list is refreshed
            } else {
                throw new Error("Failed to update course");
            }
        } catch (error) {
            console.error("Error updating course:", error);
            toast.error("Failed to update course");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">{t("title")}</h1>
                    <p className="text-muted-foreground">
                        {t("description")}
                    </p>
                </div>
                <Button
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    {t("cta3")}
                </Button>
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 rounded-md border p-6"
            >
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="input-group">
                            <Label className="mb-2" htmlFor="title">{t("label1")}</Label>
                            <Input
                                id="title"
                                name="title"
                                value={course.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <Label className="mb-2" htmlFor="category">{t("label2")}</Label>
                            <Select
                                name="category"
                                value={course.category}
                                onValueChange={(value) => {
                                    setCourse(prev => prev ? { ...prev, category: value } : null);
                                }}
                                required
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Math">Math</SelectItem>
                                    <SelectItem value="Science">Science</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="input-group">
                            <Label className="mb-2" htmlFor="school_year">{t("label3")}</Label>
                            <Select
                                name="school_year"
                                value={course.school_year}
                                onValueChange={(value) => {
                                    setCourse(prev => prev ? { ...prev, school_year: value } : null);
                                }}
                                required
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select your grade" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Grade 10">Grade 10</SelectItem>
                                    <SelectItem value="Grade 11">Grade 11</SelectItem>
                                    <SelectItem value="Grade 12">Grade 12</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="input-group">
                            <Label className="mb-2" htmlFor="price">
                                {t("label4")}
                            </Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                min="0"
                                step="0.01"
                                value={course.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <Label className="mb-2" htmlFor="description">{t("label5")}</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={course.description}
                            onChange={handleChange}
                            rows={5}
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                            router.push(
                                `/dashboard/teacher/courses/`,
                            )
                        }
                        disabled={isSaving}
                    >
                        {t("cta2")}
                    </Button>
                    <Button className="btn-primary" type="submit" disabled={isSaving}>
                        {isSaving ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                {t("cta1")}
                            </>
                        ) : (
                            <>
                                <Save className="h-4 w-4" />
                                {t("cta1")}
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
