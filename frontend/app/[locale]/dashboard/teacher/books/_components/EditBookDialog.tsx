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
import { Edit, FileText } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { editBook } from "@/lib/api/book";

type EditBookForm = Omit<Book, "created_at" | "updated_at">;

const EditBookDialog = ({
    book,
    courses,
    videos,
}: {
    book: Book;
    courses: CourseType[];
    videos: Video[];
}) => {
    const [bookData, setBookData] = useState<EditBookForm>({
        id: book.id,
        title: book.title,
        description: book.description,
        book_url: undefined,
        thumbnail_url: undefined,
        course_id: book.course?.id,
        video_id: book.video as string,
    });

    const selectedCourseVideos = videos.filter(
        (video) => video.course?.id === book.course?.id,
    );

    // handle Create Book Click
    const handleEditBook = (book: EditBookForm) => {
        const formData = new FormData();

        formData.append("title", bookData.title);
        formData.append("description", bookData.description);
        if (bookData.book_url)
            formData.append("book_url", bookData.book_url as File);
        if (bookData.thumbnail_url)
            formData.append("thumbnail_url", bookData.thumbnail_url as File);
        if (bookData.course_id) {
            formData.append("course_id", bookData.course_id || "");
        } else {
            formData.append("course_id", book.course?.id as string);
        }
        if (bookData.video_id) formData.append("video_id", bookData.video_id || "");

        editBook(book.id, formData);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Edit className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Book</DialogTitle>
                    <DialogDescription>
                        Edit book to your content
                    </DialogDescription>
                </DialogHeader>
                <aside className="flex flex-col gap-4">
                    <div className="input-group">
                        <Label htmlFor="title" className="mb-2">
                            Title
                        </Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Title"
                            value={bookData.title}
                            onChange={(e) =>
                                setBookData({
                                    ...bookData,
                                    title: e.target.value as string,
                                })
                            }
                        />
                    </div>
                    <div className="input-group">
                        <Label htmlFor="description" className="mb-2">
                            Description
                        </Label>
                        <Input
                            id="description"
                            name="description"
                            placeholder="Description"
                            value={bookData.description}
                            onChange={(e) =>
                                setBookData({
                                    ...bookData,
                                    description: e.target.value as string,
                                })
                            }
                        />
                    </div>
                    <div className="input-group">
                        <Label htmlFor="book_url" className="mb-2">
                            Book File
                        </Label>
                        <Input
                            id="book_url"
                            name="book_url"
                            placeholder="Book File"
                            type="file"
                            accept=".pdf"
                            onChange={(e) =>
                                setBookData({
                                    ...bookData,
                                    book_url: e.target.files?.[0] as File,
                                })
                            }
                        />
                    </div>
                    <div className="input-group">
                        <Label htmlFor="thumbnail_url" className="mb-2">
                            Thumbnail file
                        </Label>
                        <Input
                            id="thumbnail_url"
                            name="thumbnail_url"
                            placeholder="Thumbnail URL"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setBookData({
                                    ...bookData,
                                    thumbnail_url: e.target.files?.[0] as File,
                                })
                            }
                        />
                    </div>
                    <div className="input-group">
                        <Label className="mb-2">Course</Label>
                        <Select
                            value={book.course?.id?.toString()}
                            onValueChange={(e) =>
                                setBookData({
                                    ...bookData,
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
                        <Label className="mb-2">Video</Label>
                        <Select
                            onValueChange={(e) =>
                                setBookData({
                                    ...bookData,
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
                                handleEditBook(bookData);
                                window.location.reload();
                            }}
                        >
                            <FileText /> Save Changes
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditBookDialog;
