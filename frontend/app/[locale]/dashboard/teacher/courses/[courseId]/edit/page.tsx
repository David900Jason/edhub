"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link, useRouter } from "@/i18n/routing";
import { getCourse, updateCourse } from "@/lib/api/course";
import { ArrowLeft, FileText, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type EditCourse = Omit<
    CourseType,
    "id" | "created_at" | "updated_at" | "rating" | "is_paid"
>;

const EditCoursePage = () => {
    const [course, setCourse] = useState<CourseType | null>(null);
    const [form, setForm] = useState<EditCourse>({
        title: "",
        description: "",
        category: "",
        price: 0,
        discount: 0,
        currency: "",
        is_published: false,
    });
    const { courseId } = useParams();
    const router = useRouter();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await getCourse(courseId as string);
                setCourse(res);
                setForm({
                    title: res?.title || "",
                    description: res?.description || "",
                    category: res?.category || "",
                    price: res?.price || 0,
                    discount: res?.discount || 0,
                    currency: res?.currency || "",
                    is_published: res?.is_published ?? false,
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchCourse();
    }, [courseId]); // only re-run if courseId changes

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        updateCourse(courseId as string, form as CourseType);
        router.push("/dashboard/teacher/courses");
    };

    return (
        <section>
            <header className="mb-8 flex flex-col gap-6">
                <Button
                    className="w-fit"
                    variant="outline"
                    onClick={() => router.back()}
                >
                    <ArrowLeft /> Back to Courses
                </Button>
                <div>
                    <h1 className="text-3xl font-semibold">Edit Course</h1>
                    <p className="text-muted-foreground">
                        Edit course from the form provided down below
                    </p>
                    <span className="p-lead !text-sm">
                        Last edited: {course?.updated_at}
                    </span>
                </div>
            </header>
            <main className="rounded-2xl border p-8 shadow-sm">
                <form className="flex flex-col gap-6">
                    <div className="input-group">
                        <Label className="mb-2" htmlFor="title">
                            Title
                        </Label>
                        <Input
                            type="text"
                            id="title"
                            defaultValue={course?.title}
                            onChange={(e) =>
                                setForm({ ...form, title: e.target.value })
                            }
                        />
                    </div>
                    <div className="input-group">
                        <Label className="mb-2" htmlFor="description">
                            Description
                        </Label>
                        <Textarea
                            className="min-h-[20vh]"
                            defaultValue={course?.description}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    description: e.target.value || "",
                                })
                            }
                            id="description"
                        />
                    </div>
                    <div className="input-group">
                        <Label className="mb-2" htmlFor="category">
                            Category
                        </Label>
                        <Input
                            type="text"
                            id="category"
                            defaultValue={course?.category}
                            onChange={(e) =>
                                setForm({ ...form, category: e.target.value })
                            }
                        />
                    </div>
                    <div className="input-group">
                        <Label className="mb-2" htmlFor="price">
                            Price
                        </Label>
                        <Input
                            type="number"
                            id="price"
                            defaultValue={course?.price}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    price: Number(e.target.value),
                                })
                            }
                        />
                    </div>
                    <div className="input-group">
                        <Label className="mb-2" htmlFor="discount">
                            Discount
                        </Label>
                        <Input
                            type="number"
                            id="discount"
                            defaultValue={course?.discount}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    discount: Number(e.target.value),
                                })
                            }
                        />
                    </div>
                    <div>
                        <Label className="mb-2" htmlFor="thumbnail">
                            Currency
                        </Label>
                        <Input
                            type="text"
                            id="currency"
                            defaultValue={course?.currency}
                            onChange={(e) =>
                                setForm({ ...form, currency: e.target.value })
                            }
                        />
                    </div>
                    <div className="input-group flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="is_published"
                                checked={form.is_published}
                                onCheckedChange={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        is_published: Boolean(e),
                                    }))
                                }
                            />
                            <Label htmlFor="is_published">Published</Label>
                        </div>
                    </div>
                    <div className="input-group">
                        <Label
                            className="text-muted-foreground mb-2"
                            htmlFor="thumbnail"
                        >
                            Course Poster
                        </Label>
                        <Input type="file" id="thumbnail" disabled />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button asChild variant="outline" type="button">
                            <Link href="/dashboard/teacher/courses">
                                <X /> Cancel
                            </Link>
                        </Button>
                        <Button
                            onClick={handleEdit}
                            className="btn-primary"
                            type="submit"
                        >
                            <FileText /> Save changes
                        </Button>
                    </div>
                </form>
            </main>
        </section>
    );
};

export default EditCoursePage;
