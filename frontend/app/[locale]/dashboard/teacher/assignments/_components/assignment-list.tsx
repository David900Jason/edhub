"use client";

import {
    getAssignmentsByTeacherId,
    deleteAssignmentById,
} from "@/lib/api/assignment";
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

const AssignmentsList = () => {
    const t = useTranslations("TEACHER_DASHBOARD.ASSIGNMENTS");
    const [user] = useLocalStorage("user", null);
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [courses, setCourses] = useState<CourseType[]>([]);
    const [filteredAssignments, setFilteredAssignments] = useState<
        Assignment[]
    >([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const fetchAssignments = async () => {
            const response: Assignment[] | null =
                await getAssignmentsByTeacherId(user?.id);
            setAssignments(response || []);
            setFilteredAssignments(response || []);
        };
        const fetchCourses = async () => {
            const response: CourseType[] | null = await getAllTeachersCourses(
                user?.id,
            );
            setCourses(response || []);
        };
        fetchAssignments();
        fetchCourses();
    }, []);

    const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        const filtered = assignments.filter((assignment) =>
            assignment.title
                .toLowerCase()
                .includes(e.target.value.toLowerCase()),
        );
        setFilteredAssignments(filtered);
    };

    const handleDeleteAssignment = async (assignmentId: string) => {
        try {
            await deleteAssignmentById(assignmentId);
            setAssignments((prev) =>
                prev.filter((assignment) => assignment.id !== assignmentId),
            );
            setFilteredAssignments((prev) =>
                prev.filter((assignment) => assignment.id !== assignmentId),
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
                            <TableHead className="text-start">{t("assignments_table.head1")}</TableHead>
                            <TableHead className="text-start">{t("assignments_table.head2")}</TableHead>
                            <TableHead className="text-start">{t("assignments_table.head3")}</TableHead>
                            <TableHead className="text-start">{t("assignments_table.head4")}</TableHead>
                            <TableHead className="text-start">{t("assignments_table.head5")}</TableHead>
                            <TableHead className="text-start">{t("assignments_table.head6")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAssignments.map((assignment) => (
                            <TableRow key={assignment.id}>
                                <TableCell>{assignment.title}</TableCell>
                                <TableCell>
                                    {
                                        courses.find(
                                            (c) =>
                                                c.id === assignment.course_id,
                                        )?.title
                                    }
                                </TableCell>
                                <TableCell>{assignment.marks}</TableCell>
                                <TableCell>
                                    {format(assignment.created_at)}
                                </TableCell>
                                <TableCell>
                                    <Button asChild variant="outline">
                                        <Link
                                            href={`/dashboard/teacher/assignments/${assignment.id}/questions`}
                                        >
                                            <FileText /> {t("assignments_table.questions")}
                                        </Link>
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" asChild>
                                        <Link
                                            href={`/dashboard/teacher/assignments/${assignment.id}/edit`}
                                        >
                                            <Pencil />
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={() =>
                                            handleDeleteAssignment(
                                                assignment.id,
                                            )
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

export default AssignmentsList;
