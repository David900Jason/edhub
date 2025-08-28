"use client";

import Image from "next/image";
import { format } from "timeago.js";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, FileText, MessageCircle, Trash, X } from "lucide-react";
import { editQuestion, deleteQuestion } from "@/lib/api/questions";
import { Textarea } from "@/components/ui/textarea";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type Reply = {
    content: string;
    created_at: string;
    id: string;
    question: string;
    teacher: {
        id: string;
        full_name: string;
        profile_img: string;
    };
};

const Question = ({ question }: { question: QnA }) => {
    const [user] = useLocalStorage("user_profile", null);
    const [questionData, setQuestionData] = useState(question.content);
    const [showReply, setShowReply] = useState(false);
    const [editing, setEditing] = useState(false);

    const handleEditQuestion = (content: string) => {
        editQuestion(content, question.id);
        setEditing(false);
    };

    const handleDeleteQuestion = (questionId: string) => {
        deleteQuestion(questionId);
        window.location.reload();
    };

    return (
        <div className="flex flex-col gap-2 rounded-2xl border bg-white p-6 dark:bg-black/50">
            <header className="mb-2 flex items-start justify-between">
                {/* Asker Info */}
                <div className="flex items-center gap-3">
                    <Image
                        className="rounded-full border shadow-sm"
                        src={
                            question.student.profile_img == null
                                ? "/avatar.jpg"
                                : question.student.profile_img
                        }
                        alt="user"
                        width={50}
                        height={50}
                    />
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold">
                            {question.student.full_name}
                        </h2>
                        <p className="p-lead mt-[-8px]">
                            {format(question.created_at)}
                        </p>
                    </div>
                </div>
            </header>
            <main className="mb-4 whitespace-pre-wrap">
                {editing ? (
                    <div className="flex flex-col">
                        <Textarea
                            value={questionData}
                            onChange={(e) => setQuestionData(e.target.value)}
                            className="my-4 min-h-[25vh] p-4"
                        />
                        <div className="flex items-center gap-2">
                            <Button
                                className="btn-primary"
                                onClick={() => handleEditQuestion(questionData)}
                            >
                                <FileText /> Save Changes
                            </Button>
                            <Button
                                variant="outline"
                                className="btn-primary"
                                onClick={() => setEditing(false)}
                            >
                                <X /> Cancel
                            </Button>
                        </div>
                    </div>
                ) : (
                    <p className="p-lead text-xl !text-black dark:!text-white">
                        {questionData}
                    </p>
                )}
            </main>
            <footer className="space-y-6">
                <div className="flex items-center justify-end gap-1">
                    {user.id === question.student.id && (
                        <>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => setEditing((prev) => !prev)}
                            >
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:text-red-600"
                                onClick={() =>
                                    handleDeleteQuestion(question.id)
                                }
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </>
                    )}
                    <Button
                        disabled={question.reply == null ? true : false}
                        className={
                            "flex items-center gap-2 " + question.reply === null
                                ? "pointer-events-none cursor-not-allowed"
                                : ""
                        }
                        variant="outline"
                        onClick={() => setShowReply((prev) => !prev)}
                    >
                        <MessageCircle />
                        <p className="p-lead">{question.reply ? 1 : 0}</p>
                    </Button>
                </div>
                {showReply && <Reply reply={question.reply as Reply} />}
            </footer>
        </div>
    );
};

const Reply = ({ reply }: { reply: Reply }) => {
    const {
        content,
        created_at,
        teacher: { full_name, profile_img },
    } = reply;

    return (
        <div className="flex flex-1 flex-col gap-2 rounded-2xl border bg-white p-6 dark:bg-slate-700/50">
            <header className="mb-2 flex items-center gap-4">
                <Image
                    src={profile_img == null ? "/avatar.jpg" : profile_img}
                    alt="user"
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold">{full_name}</h2>
                    <p className="mt-[-6px] text-sm text-gray-500">
                        {format(created_at)}
                    </p>
                </div>
            </header>
            <main className="whitespace-pre-wrap">
                <p className="p-lead text-base !text-black dark:!text-white">
                    {content}
                </p>
            </main>
        </div>
    );
};

export default Question;
