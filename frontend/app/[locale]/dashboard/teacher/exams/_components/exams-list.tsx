"use client";

import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState, useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { getExamsByTeacherId, deleteExamById } from "@/lib/api/exam";
import { format } from "timeago.js";
import { Button } from "@/components/ui/button";
import { Award, Edit, FileText, Trash2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const ExamsList = () => {
    const t = useTranslations("TEACHER_DASHBOARD.EXAMS");
    const [user] = useLocalStorage("user", null);
    const [search, setSearch] = useState("");
    const [exams, setExams] = useState<Exam[]>([]);
    const [filteredExams, setFilteredExams] = useState<Exam[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchExams = async () => {
            const response = await getExamsByTeacherId(user?.id);
            setExams(response || []);
            setFilteredExams(response || []);
        };
        fetchExams();
    }, [setExams]);

    const deleteExam = async (examId: string) => {
        await deleteExamById(examId);
        toast.success("Exam deleted successfully");
        setExams(exams.filter((exam) => exam.id !== examId));
        setFilteredExams(filteredExams.filter((exam) => exam.id !== examId));
        router.refresh();
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        if (e.target.value === "") {
            setFilteredExams(exams);
            return;
        }
        setFilteredExams(
            exams.filter((exam) =>
                exam.title.toLowerCase().includes(e.target.value.toLowerCase()),
            ),
        );
    };

    return (
        <div className="flex flex-col gap-6 rounded-lg border p-6">
            <div className="flex w-1/2 items-center justify-between">
                <Input
                    value={search}
                    onChange={handleSearch}
                    placeholder={t("search_placeholder")}
                    type="search"
                />
            </div>
            <div className="overflow-hidden rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-start">{t("exams_table.head1")}</TableHead>
                            <TableHead className="text-start">{t("exams_table.head2")}</TableHead>
                            <TableHead className="text-start">{t("exams_table.head3")}</TableHead>
                            <TableHead className="text-start">{t("exams_table.head4")}</TableHead>
                            <TableHead className="text-start">{t("exams_table.head5")}</TableHead>
                            <TableHead className="text-start">{t("exams_table.head6")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredExams.length > 0 ? (
                            filteredExams.map((exam: Exam) => (
                                <TableRow key={exam.id}>
                                    <TableCell className="flex items-center gap-2">
                                        <Award /> {exam.title}
                                    </TableCell>
                                    <TableCell>{exam.duration}</TableCell>
                                    <TableCell>
                                        {format(exam.created_at)}
                                    </TableCell>
                                    <TableCell>{exam.marks}</TableCell>
                                    <TableCell>
                                        <Button variant="outline" asChild>
                                            <Link
                                                className="hover:!text-decoration-none"
                                                href={`/dashboard/teacher/exams/${exam.id}/questions`}
                                            >
                                                <FileText />
                                                {t("exams_table.questions")}
                                            </Link>
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost">
                                            <Link
                                                href={`/dashboard/teacher/exams/${exam.id}/edit`}
                                            >
                                                <Edit />
                                            </Link>
                                        </Button>
                                        <Button
                                            onClick={() => deleteExam(exam.id)}
                                            variant="ghost"
                                            className="text-red-500"
                                        >
                                            <Trash2 />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell className="flex-1 justify-center">
                                    No exams found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ExamsList;
