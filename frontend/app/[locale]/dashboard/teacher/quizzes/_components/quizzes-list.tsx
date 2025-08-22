"use client";

import { getQuizzesByTeacherId, deleteQuizById } from "@/lib/api/quiz";
import { getAllTeachersCourses } from "@/lib/api/course";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "timeago.js";
import { Link } from "@/i18n/routing";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { FileText, Pencil, Trash } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const QuizzesList = () => {
    const t = useTranslations("TEACHER_DASHBOARD.QUIZZES");
    const [user] = useLocalStorage("user", null);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [courses, setCourses] = useState<CourseType[]>([]);
    const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const fetchQuizzes = async () => {
            const response: Quiz[] | null = await getQuizzesByTeacherId(
                user?.id,
            );
            setQuizzes(response || []);
            setFilteredQuizzes(response || []);
        };
        const fetchCourses = async () => {
            const response: CourseType[] | null = await getAllTeachersCourses(
                user?.id,
            );
            setCourses(response || []);
        };
        fetchQuizzes();
        fetchCourses();
    }, []);

    const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        const filtered = quizzes.filter((quiz) =>
            quiz.title.toLowerCase().includes(e.target.value.toLowerCase()),
        );
        setFilteredQuizzes(filtered);
    };

    const handleQuizDelete = async (quizId: string) => {
        try {
            await deleteQuizById(quizId);
            setQuizzes((prev) => prev.filter((quiz) => quiz.id !== quizId));
            setFilteredQuizzes((prev) =>
                prev.filter((quiz) => quiz.id !== quizId),
            );
            router.refresh();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="rounded-xl border p-6">
            {/* Search Bar Input */}
            <div className="mb-4 flex items-center justify-between">
                <Input
                    placeholder={t("search_placeholder")}
                    value={searchQuery}
                    onChange={handleSearchQuery}
                />
            </div>

            {/* Assignments List */}
            <div className="space-y-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-start">{t("quizzes_table.head1")}</TableHead>
                            <TableHead className="text-start">{t("quizzes_table.head2")}</TableHead>
                            <TableHead className="text-start">{t("quizzes_table.head3")}</TableHead>
                            <TableHead className="text-start">{t("quizzes_table.head4")}</TableHead>
                            <TableHead className="text-start">{t("quizzes_table.head5")}</TableHead>
                            <TableHead className="text-start">{t("quizzes_table.head6")}</TableHead>
                            <TableHead className="text-start">{t("quizzes_table.head7")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredQuizzes.map((quiz) => (
                            <TableRow key={quiz.id}>
                                <TableCell>{quiz.title}</TableCell>
                                <TableCell>
                                    {
                                        courses.find(
                                            (c) => c.id === quiz.course_id,
                                        )?.title
                                    }
                                </TableCell>
                                <TableCell>{quiz.duration}</TableCell>
                                <TableCell>{quiz.marks}</TableCell>
                                <TableCell>{format(quiz.created_at)}</TableCell>
                                <TableCell>
                                    <Button asChild variant="outline">
                                        <Link
                                            href={`/dashboard/teacher/quizzes/${quiz.id}/questions`}
                                        >
                                            <FileText /> {t("quizzes_table.questions")}
                                        </Link>
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" asChild>
                                        <Link
                                            href={`/dashboard/teacher/quizzes/${quiz.id}/edit`}
                                        >
                                            <Pencil />
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={() =>
                                            handleQuizDelete(quiz.id)
                                        }
                                    >
                                        <Trash className="text-red-500" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default QuizzesList;
