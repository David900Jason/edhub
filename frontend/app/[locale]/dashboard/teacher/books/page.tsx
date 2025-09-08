"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Search, Trash } from "lucide-react";
import { deleteBook, getTeacherBooks } from "@/lib/api/book";
import CreateBookDialog from "./_components/CreateBookDialog";
import EditBookDialog from "./_components/EditBookDialog";
import { getCourses } from "@/lib/api/course";
import { getTeacherVideos } from "@/lib/api/video";
import { toast } from "sonner";
import Image from "next/image";

export default function TeacherBooksPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [courses, setCourses] = useState<CourseType[]>([]);
    const [videos, setVideos] = useState<Video[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const t = useTranslations("TEACHER_DASHBOARD.BOOKS");

    useEffect(() => {
        getTeacherBooks().then((res) => setBooks(res || []));
        getCourses().then((res) => setCourses(res));
        getTeacherVideos().then((res) => setVideos(res || []));
    }, [setBooks, setCourses, setVideos]);

    // handle Delete Book
    const handleDeleteBook = (bookId: number) => {
        toast.message("Are you sure you want to delete this book?", {
            position: "top-center",
            action: {
                label: "Yes",
                onClick: () => {
                    deleteBook(bookId).then(() => {
                        toast.success("Book deleted successfully");
                        setBooks((prev) =>
                            prev.filter((book) => book.id !== bookId),
                        );
                    });
                },
            },
        });
    };

    const filteredBooks = books.filter(
        (book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.course?.title
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            (book.video as { title: string })?.title
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()),
    );

    return (
        <section>
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold">{t("title")}</h1>
                    <p className="text-muted-foreground">{t("description")}</p>
                </div>
                <CreateBookDialog courses={courses} videos={videos} />
            </header>

            <main className="rounded-2xl border p-6">
                <div className="relative mb-6">
                    <Search className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <Input
                        placeholder={t("search_placeholder")}
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredBooks.map((book: Book, index: number) => (
                        <div
                            key={book.id}
                            className="overflow-hidden rounded-lg border"
                            aria-label={`Book ${index + 1}`}
                        >
                            <div>
                                <Image
                                    src={book.thumbnail_url as string}
                                    alt={book.title}
                                    width={600}
                                    height={400}
                                />
                            </div>
                            <header className="px-4 py-6">
                                <h3 className="text-xl font-semibold">
                                    {book.title}
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    {book.description}
                                </p>
                            </header>
                            <footer className="flex items-center justify-between p-4">
                                <Button asChild size="icon" variant="outline">
                                    <Link
                                        target="_blank"
                                        href={book.book_url as string}
                                    >
                                        <Download />
                                    </Link>
                                </Button>
                                <div className="flex items-center gap-2">
                                    <EditBookDialog
                                        book={book}
                                        courses={courses}
                                        videos={videos}
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() =>
                                            handleDeleteBook(book.id as number)
                                        }
                                    >
                                        <Trash className="text-red-500" />
                                    </Button>
                                </div>
                            </footer>
                        </div>
                    ))}
                </section>
            </main>
        </section>
    );
}
