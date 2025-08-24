"use client";

import { useState, useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Loader2, Edit, Trash2, FileText } from "lucide-react";
import { toast } from "sonner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Book {
    id: string;
    title: string;
    src: string;
    course_id: string;
    video_id: string;
    course_title: string;
    video_title: string;
    created_at: string;
    updated_at: string;
}

export default function TeacherBooksPage() {
    const router = useRouter();
    const t = useTranslations("TEACHER_DASHBOARD.BOOKS");
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentBook, setCurrentBook] = useState<Partial<Book> | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [allCourses, setAllCourses] = useState<
        { id: string; title: string; teacher_id: string }[]
    >([]);
    const [videos, setVideos] = useState<
        { id: string; title: string; course_id: string }[]
    >([]);
    const [currentTeacherId, setCurrentTeacherId] = useState<string>("u3"); // TODO: Get from auth context

    // Filter courses to only show those belonging to the current teacher
    const courses = allCourses.filter(
        (course) => course.teacher_id === currentTeacherId,
    );

    // Fetch books
    const fetchBooks = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/teacher/books");
            if (!response.ok) throw new Error("Failed to fetch books");
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error("Error fetching books:", error);
            toast.error("Failed to load books");
        } finally {
            setLoading(false);
        }
    };

    // Fetch courses and videos for dropdowns
    const fetchDropdownData = async () => {
        try {
            // Fetch courses directly from json-server
            const coursesRes = await fetch("http://localhost:8001/courses");
            if (coursesRes.ok) {
                const coursesData = await coursesRes.json();
                // Filter courses for the current teacher
                const teacherCourses = coursesData.filter(
                    (course: any) => course.teacher_id === currentTeacherId,
                );
                setAllCourses(teacherCourses);
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
            toast.error("Failed to load courses");
        }
    };

    // Fetch videos for a specific course
    const fetchVideosForCourse = async (courseId: string) => {
        try {
            const videosRes = await fetch(
                `http://localhost:8001/videos?course_id=${courseId}`,
            );
            if (videosRes.ok) {
                const videosData = await videosRes.json();
                setVideos(videosData);
            }
        } catch (error) {
            console.error("Error fetching videos:", error);
            toast.error("Failed to load videos");
        }
    };

    // Handle course selection change
    const handleCourseChange = async (courseId: string) => {
        setCurrentBook((prev) => ({
            ...prev!,
            course_id: courseId,
        }));
    };

    useEffect(() => {
        if (currentBook?.course_id) {
            fetchVideosForCourse(currentBook.course_id);
        } else {
            setVideos([]);
        }
    }, [currentBook?.course_id]);

    useEffect(() => {
        if (isDialogOpen && currentBook?.id) {
            // This will be handled by handleEditBook
        } else if (isDialogOpen && !currentBook?.id) {
            // Reset form for new book
            setCurrentBook({
                title: "",
                src: "",
                course_id: "",
                video_id: "",
            });
            setVideos([]);
        }
    }, [isDialogOpen]);

    useEffect(() => {
        fetchBooks();
        fetchDropdownData();
    }, []);

    const handleAddBook = () => {
        setCurrentBook({
            title: "",
            src: "",
            course_id: "",
            video_id: "",
        });
        setIsDialogOpen(true);
    };

    const handleEditBook = async (book: Book) => {
        try {
            // Fetch the book with full details including course and video info
            const response = await fetch(
                `http://localhost:8001/books/${book.id}?_expand=course&_expand=video`,
            );
            const bookWithDetails = await response.json();

            // Set the current book with all details
            setCurrentBook(bookWithDetails);

            // Fetch videos for the selected course
            if (bookWithDetails.course_id) {
                const videosRes = await fetch(
                    `http://localhost:8001/videos?course_id=${bookWithDetails.course_id}`,
                );
                if (videosRes.ok) {
                    const videosData = await videosRes.json();
                    setVideos(videosData);
                }
            }

            setIsDialogOpen(true);
        } catch (error) {
            console.error("Error fetching book details:", error);
            toast.error("Failed to load book details");
        }
    };

    const handleDeleteClick = (book: Book) => {
        setCurrentBook(book);
        setIsDeleteDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentBook) return;

        const { title, src, course_id, video_id } = currentBook;
        if (!title || !src || !course_id) {
            toast.error("Please fill in all required fields");
            return;
        }

        try {
            setIsSubmitting(true);
            const url = currentBook.id
                ? `http://localhost:8001/books/${currentBook.id}`
                : "http://localhost:8001/books";

            const method = currentBook.id ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    src,
                    course_id,
                    video_id: video_id || null, // Make video_id optional
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to save book");
            }

            toast.success(
                `Book ${currentBook.id ? "updated" : "created"} successfully`,
            );
            setIsDialogOpen(false);
            await fetchBooks(); // Wait for books to refresh
        } catch (error) {
            console.error("Error saving book:", error);
            toast.error("Failed to save book");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!currentBook?.id) return;

        try {
            setIsSubmitting(true);
            const response = await fetch(
                `/api/teacher/books/${currentBook.id}`,
                {
                    method: "DELETE",
                },
            );

            if (!response.ok) throw new Error("Failed to delete book");

            toast.success("Book deleted successfully");
            setIsDeleteDialogOpen(false);
            fetchBooks();
        } catch (error) {
            console.error("Error deleting book:", error);
            toast.error("Failed to delete book");
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredBooks = books.filter(
        (book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.course_title
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            book.video_title?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="text-primary h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <section>
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold">{t("title")}</h1>
                    <p className="text-muted-foreground">{t("description")}</p>
                </div>
                <Button variant="outline" onClick={handleAddBook}>
                    <Plus className="mr-2 h-4 w-4" />
                    {t("cta1")}
                </Button>
            </header>

            <aside className="mb-6">
                <div className="relative">
                    <Search className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <Input
                        placeholder={t("search_placeholder")}
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </aside>

            <section className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-start">
                                {t("books_table.head1")}
                            </TableHead>
                            <TableHead className="text-start">
                                {t("books_table.head2")}
                            </TableHead>
                            <TableHead className="text-start">
                                {t("books_table.head3")}
                            </TableHead>
                            <TableHead className="text-start">
                                {t("books_table.head4")}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredBooks.length > 0 ? (
                            filteredBooks.map((book) => (
                                <TableRow key={book.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <FileText className="text-muted-foreground h-5 w-5" />
                                            {book.title}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {book.course_title || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        {book.video_title || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleEditBook(book)
                                                }
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleDeleteClick(book)
                                                }
                                            >
                                                <Trash2 className="text-destructive h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="text-muted-foreground py-8 text-center"
                                >
                                    {t("books_table.no_books")}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </section>

            {/* Add/Edit Book Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {currentBook?.id ? "Edit Book" : "Add New Book"}
                        </DialogTitle>
                        <DialogDescription>
                            {currentBook?.id
                                ? "Update the book details below."
                                : "Fill in the details to add a new book."}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={currentBook?.title || ""}
                                    onChange={(e) =>
                                        setCurrentBook({
                                            ...currentBook!,
                                            title: e.target.value,
                                        })
                                    }
                                    placeholder="Enter book title"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="src">File URL</Label>
                                <Input
                                    id="src"
                                    value={currentBook?.src || ""}
                                    onChange={(e) =>
                                        setCurrentBook({
                                            ...currentBook!,
                                            src: e.target.value,
                                        })
                                    }
                                    placeholder="Enter file URL"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="course_id">Course</Label>
                                <select
                                    id="course_id"
                                    className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                    value={currentBook?.course_id || ""}
                                    onChange={(e) =>
                                        handleCourseChange(e.target.value)
                                    }
                                    required
                                >
                                    <option value="">Select a course</option>
                                    {courses.map((course) => (
                                        <option
                                            key={course.id}
                                            value={course.id}
                                        >
                                            {course.title}
                                        </option>
                                    ))}
                                </select>
                                {courses.length === 0 && (
                                    <p className="text-muted-foreground mt-1 text-sm">
                                        No courses found. Please create a course
                                        first.
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="video_id">
                                    Related Video (Optional)
                                </Label>
                                <select
                                    id="video_id"
                                    className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                    value={currentBook?.video_id || ""}
                                    onChange={(e) =>
                                        setCurrentBook({
                                            ...currentBook!,
                                            video_id: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">
                                        Select a video (optional)
                                    </option>
                                    {videos.map((video) => (
                                        <option key={video.id} value={video.id}>
                                            {video.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save Book"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Book</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete "
                            {currentBook?.title}"? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                "Delete Book"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}
