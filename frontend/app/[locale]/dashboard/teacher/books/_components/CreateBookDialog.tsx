"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createBook } from "@/lib/api/book";

type CreateBookForm = Omit<Book, "id" | "created_at" | "updated_at">;

const CreateBookDialog = ({ courses, videos }: { courses: CourseType[]; videos: Video[]; }) => {
    const t = useTranslations("TEACHER_DASHBOARD.BOOKS");
    const [book, setBook] = useState<CreateBookForm>({
        title: "",
        description: "",
        book_url: undefined,
        thumbnail_url: undefined,
        course_id: "",
        video_id: "",
    });

    const selectedCourseVideos = videos.filter(
        (video) => video.course?.id === book.course_id,
    );

    // handle Create Book Click
    const handleCreateBook = (book: CreateBookForm) => {
        const formData = new FormData();
        formData.append("title", book.title);
        formData.append("description", book.description);
        formData.append("book_url", book.book_url as File);
        formData.append("thumbnail_url", book.thumbnail_url as File);
        formData.append("course_id", book.course_id || "");
        formData.append("video_id", book.video_id || "");

        createBook(formData);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="btn-primary">
                    <Plus className="h-4 w-4" />
                    {t("cta1")}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Book</DialogTitle>
                    <DialogDescription>
                        Add a new book to your content
                    </DialogDescription>
                </DialogHeader>
                <aside className="flex flex-col gap-4">
                    <div className="input-group">
                        <Label htmlFor="title" className="mb-2">Title</Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Title"
                            value={book.title}
                            onChange={(e) =>
                                setBook({
                                    ...book,
                                    title: e.target.value as string,
                                })
                            }
                        />
                    </div>
                    <div className="input-group">
                        <Label htmlFor="description" className="mb-2">Description</Label>
                        <Input
                            id="description"
                            name="description"
                            placeholder="Description"
                            value={book.description}
                            onChange={(e) =>
                                setBook({
                                    ...book,
                                    description: e.target.value as string,
                                })
                            }
                        />
                    </div>
                    <div className="input-group">
                        <Label htmlFor="book_url" className="mb-2">Book URL</Label>
                        <Input
                            id="book_url"
                            name="book_url"
                            placeholder="Book URL"
                            type="file"
                            accept=".pdf"
                            onChange={(e) =>
                                setBook({
                                    ...book,
                                    book_url: e.target.files?.[0] as File,
                                })
                            }
                        />
                    </div>
                    <div className="input-group">
                        <Label htmlFor="thumbnail_url" className="mb-2">Thumbnail URL</Label>
                        <Input
                            id="thumbnail_url"
                            name="thumbnail_url"
                            placeholder="Thumbnail URL"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setBook({
                                    ...book,
                                    thumbnail_url: e.target.files?.[0] as File,
                                })
                            }
                        />
                    </div>
                    <div className="input-group">
                        <Label htmlFor="course_id" className="mb-2">Course</Label>
                        <Select
                            value={book.course_id}
                            onValueChange={(e) =>
                                setBook({
                                    ...book,
                                    course_id: e,
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                            <SelectContent>
                                {courses.map((course) => (
                                    <SelectItem
                                        key={course.id}
                                        value={course.id.toString()}
                                    >
                                        {course.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="input-group">
                        <Label htmlFor="video_id" className="mb-2">Video</Label>
                        <Select
                            value={book.video_id}
                            onValueChange={(e) =>
                                setBook({
                                    ...book,
                                    video_id: e,
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a video" />
                            </SelectTrigger>
                            <SelectContent>
                                {selectedCourseVideos.map((video) => {
                                    return (
                                        <SelectItem
                                            key={video.id}
                                            value={video.id.toString()}
                                        >
                                            {video.title}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </div>
                </aside>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            className="btn-primary"
                            onClick={() => {
                                handleCreateBook(book);
                                // window.location.reload();
                            }}
                        >
                            <Plus /> Create
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateBookDialog;
