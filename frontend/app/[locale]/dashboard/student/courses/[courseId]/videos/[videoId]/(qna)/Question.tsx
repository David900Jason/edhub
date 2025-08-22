"use client";

import axios from "axios";
import Image from "next/image";
import { format } from "timeago.js";
import { getUserById } from "@/lib/api/user";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, MessageCircle, Trash, Save, X } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";

const Question = ({
    question,
    currentUser,
}: {
    question: QnA;
    currentUser: UserType | null;
}) => {
    const {
        id,
        question_text,
        created_at,
        user_id,
        reply: { answer_text, teacher_id, created_at: reply_created_at },
    } = question;
    const [user, setUser] = useState<UserType | undefined>(undefined);
    const [showReplies, setShowReplies] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(question_text);
    const router = useRouter();
    const t = useTranslations("STUDENT_DASHBOARD.COURSES.content.videos_tabs");

    useEffect(() => {
        const getUser = async () => {
            const user: UserType | undefined = await getUserById(user_id);
            setUser(user);
        };
        getUser();
    }, [user_id]);

    const handleShowReplies = () => {
        setShowReplies(!showReplies);
    };

    const handleEditCancel = () => {
        setIsEditing(false);
        setEditedText("");
        return;
    };

    const handleEditSave = () => {
        if (!user) return;
        if (user.id !== currentUser?.id) return;

        try {
            axios.patch(`/api/questions/${id}`, {
                question_text: editedText,
            });
            setIsEditing(false);
            setEditedText("");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
        return;
    };

    const handleEdit = () => {
        setIsEditing(true);
        setEditedText(question_text);
        return;
    };

    const handleDelete = async () => {
        if (!user) return;
        if (user.id !== currentUser?.id) return;

        if (window.confirm("Are you sure you want to delete this question?")) {
            try {
                await axios.delete(`/api/questions/${id}`);
                window.location.reload();
            } catch (error) {
                console.error(error);
            }
        }
    };

    if (isEditing) {
        return (
            <div className="flex flex-col gap-4 rounded-2xl border bg-white p-6 shadow-lg dark:bg-black/50">
                <Textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="min-h-[100px]"
                    placeholder="Edit your question..."
                />
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={handleEditCancel}>
                        <X className="h-4 w-4" />
                        {t("cancel")}
                    </Button>
                    <Button
                        className="btn btn-primary"
                        onClick={handleEditSave}
                    >
                        <Save className="h-4 w-4" />
                        {t("save_changes")}
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 rounded-2xl border bg-white p-6 dark:bg-black/50">
            <header className="mb-4 flex items-start justify-between">
                {/* Asker Info */}
                <div className="flex items-center gap-3">
                    <Image
                        className="rounded-full border shadow-sm"
                        src="/user.jpg"
                        alt="user"
                        width={70}
                        height={70}
                    />
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold">
                            {user?.full_name}
                        </h2>
                        <span className="p-lead mt-[-5px] text-sm">
                            {user?.school_year}
                        </span>
                    </div>
                </div>
                {/* Timestamp */}
                <div className="flex items-center gap-2">
                    <p className="p-lead">{format(created_at || "")}</p>
                </div>
            </header>
            <main className="whitespace-pre-wrap">
                <p className="p-lead text-xl !text-black dark:!text-white">
                    {question_text}
                </p>
            </main>
            <footer className="flex items-center justify-end">
                <div className="flex items-center gap-2">
                    {user?.id === currentUser?.id && (
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={handleEdit}
                            >
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:text-red-600"
                                onClick={handleDelete}
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                    <Button
                        variant="outline"
                        asChild
                        disabled={user?.role === "student"}
                        className="disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={() => handleShowReplies()}
                    >
                        <span>
                            <MessageCircle />
                            {answer_text === "" ? "0" : "1"}
                        </span>
                    </Button>
                </div>
            </footer>
            {showReplies && (
                <RepliesForm reply={{ answer_text, teacher_id, created_at }} />
            )}
        </div>
    );
};

const RepliesForm = ({
    reply,
}: {
    reply: { answer_text: string; teacher_id: string; created_at: string };
}) => {
    // Fetch Teacher data
    const [teacher, setTeacher] = useState<UserType | undefined>(undefined);

    const t = useTranslations("STUDENT_DASHBOARD.COURSES.content.videos_tabs");

    useEffect(() => {
        const getTeacher = async () => {
            const teacher: UserType | undefined = await getUserById(
                reply.teacher_id,
            );
            setTeacher(teacher);
        };
        getTeacher();
    }, [reply.teacher_id]);

    if (reply.answer_text === "")
        return <p className="p-lead text-center">{t("no_reply")}</p>;

    return (
        <div className="mt-4 flex flex-col gap-4 rounded-2xl border bg-gray-200 dark:bg-gray-800 p-4">
            <header className="flex items-center gap-4">
                <Image
                    className="rounded-full border shadow-sm"
                    src="/user.jpg"
                    alt="user"
                    width={50}
                    height={50}
                />
                <div aria-roledescription="teacher" className="flex flex-col">
                    <h2 className="text-[16px] font-semibold">
                        {teacher?.full_name}
                    </h2>
                    <p className="p-lead mt-[-5px] !text-[14px]">
                        {format(reply.created_at || "")}
                    </p>
                </div>
            </header>
            <main className="whitespace-pre-wrap pb-5">
                <p className="p-lead ml-16 !text-base !text-black dark:!text-white">
                    {reply.answer_text}
                </p>
            </main>
        </div>
    );
};

export default Question;
