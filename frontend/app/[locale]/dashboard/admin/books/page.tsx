"use client";

import { deleteBook, getBooks } from "@/lib/api/book";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import EditBookDialog from "../../teacher/books/_components/EditBookDialog";
import { Download, Trash } from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getCourses } from "@/lib/api/course";
import { getVideos } from "@/lib/api/video";
import Tag from "@/components/ui/Tag";

const AdminBooksPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [courses, setCourses] = useState<CourseType[]>([]);
    const [videos, setVideos] = useState<Video[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getBooks().then((res) => {
            setBooks(res);
        });

        getCourses().then((res) => {
            setCourses(res);
        });

        getVideos().then((res) => {
            setVideos(res || []);
        });
    }, [setBooks]);

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

    return (
        <section>
            <header className="mb-8">
                <h1 className="text-3xl font-semibold">Books</h1>
                <p className="p-lead">
                    Here&apos;s a table containing all books
                </p>
            </header>
            <main className="rounded-2xl border p-6">
                <div className="relative mb-6">
                    <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                    <Input
                        placeholder="Search books..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {filteredBooks.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredBooks.map((book: Book, index: number) => (
                            <div
                                key={book.id}
                                className="flex flex-col overflow-hidden rounded-lg border"
                                aria-label={`Book ${index + 1}`}
                            >
                                <div>
                                    <Image
                                        src={book.thumbnail_url as string}
                                        alt={book.title}
                                        width={600}
                                        height={400}
                                        className="h-48 w-full object-cover"
                                    />
                                </div>
                                <header className="flex-1 px-4 py-6">
                                    <div className="mb-2">
                                        <Tag color="green">
                                            <Link
                                                href={`/dashboard/admin/courses?search=${book.course?.title}`}
                                            >
                                                {book.course?.title}
                                            </Link>
                                        </Tag>
                                    </div>
                                    <h3 className="text-xl font-semibold">
                                        {book.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        {book.description}
                                    </p>
                                </header>
                                <footer className="flex items-center justify-between p-4">
                                    <Button
                                        asChild
                                        size="icon"
                                        variant="outline"
                                    >
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
                                                handleDeleteBook(
                                                    book.id as number,
                                                )
                                            }
                                        >
                                            <Trash className="text-red-500" />
                                        </Button>
                                    </div>
                                </footer>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex min-h-[40vh] items-center justify-center">
                        <p className="text-center">Books not found</p>
                    </div>
                )}

                {!books && (
                    <div className="flex min-h-[40vh] items-center justify-center">
                        <p className="text-center">Books not found</p>
                    </div>
                )}
            </main>
        </section>
    );
};

export default AdminBooksPage;
