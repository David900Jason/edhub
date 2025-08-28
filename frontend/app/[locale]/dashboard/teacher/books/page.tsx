"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Search, Trash } from "lucide-react";
import { deleteBook, getTeacherBooks } from "@/lib/api/book";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import CreateBookDialog from "./_components/CreateBookDialog";
import EditBookDialog from "./_components/EditBookDialog";
import { getCourses } from "@/lib/api/course";
import { getTeacherVideos } from "@/lib/api/video";

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
        deleteBook(bookId);
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
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

                <section className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Course</TableHead>
                                <TableHead>Video</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredBooks.map((book: Book) => (
                                <TableRow key={book.id}>
                                    <TableCell>
                                        <Link href={`${book.book_url}`}>
                                            {book.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {book.description === ""
                                            ? "N/A"
                                            : book.description}
                                    </TableCell>
                                    <TableCell>{book.course?.title}</TableCell>
                                    <TableCell>
                                        {
                                            (book.video as { title: string })
                                                ?.title
                                        }
                                    </TableCell>
                                    <TableCell className="flex gap-2">
                                        <EditBookDialog
                                            book={book}
                                            courses={courses}
                                            videos={videos}
                                        />
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                handleDeleteBook(
                                                    book.id as number,
                                                )
                                            }
                                        >
                                            <Trash className="text-red-500" />
                                        </Button>
                                        <Button asChild variant="outline">
                                            <Link
                                                target="_blank"
                                                href={book.book_url as string}
                                            >
                                                <Download />
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </section>
            </main>
        </section>
    );
}
