// app/[locale]/dashboard/student/courses/[courseId]/videos/[videoId]/(qna)/Question.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "timeago.js";
import { Button } from "@/components/ui/button";
import {
    Edit,
    MessageCircle,
    Trash,
    MoreVertical,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { editQuestion, deleteQuestion } from "@/lib/api/questions";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Reply } from "./Reply";
import type { QnA, User } from "./types";

// Lazy load markdown editor
const MDEditor = dynamic<{
    value?: string;
    onChange?: (value?: string) => void;
    height?: number | string;
    className?: string;
}>(() => import("@uiw/react-md-editor"), { ssr: false });

interface QuestionProps {
    question: QnA;
    onUpdate?: (updatedQuestion: QnA) => void;
    onDelete?: (questionId: string) => void;
}

export function Question({ question, onUpdate, onDelete }: QuestionProps) {
    const [user] = useSessionStorage("user_profile", null) as [
        User | null,
        (value: User | null) => void,
    ];
    const [isEditing, setIsEditing] = useState(false);
    const [showReply, setShowReply] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [content, setContent] = useState(question.content);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleEdit = async () => {
        try {
            const updatedQuestion = await editQuestion(question.id, content);
            setIsEditing(false);

            // Actions done after editing
            toast.success("Question updated successfully");

            // Fast UI Updates
            onUpdate?.(updatedQuestion);
        } catch (error) {
            toast.error("Failed to update question");
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await deleteQuestion(question.id);
            onDelete?.(question.id);

            // Actions after deleting
            toast.success("Question deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete question");
        } finally {
            setIsDeleting(false);
        }
    };

    const isOwner = user?.id === question.student.id;
    const hasReply = !!question.reply;

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-card relative rounded-2xl border p-6 shadow-sm"
        >
            <header className="mb-4 flex items-start justify-between">
                <div className="flex items-start gap-3">
                    <Image
                        src={question.student.profile_img || "/avatar.jpg"}
                        alt={question.student.full_name}
                        width={48}
                        height={48}
                        className="border-background h-12 w-12 rounded-full border-2"
                    />
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-medium">
                                {question.student.full_name}
                            </h3>
                            {isOwner && (
                                <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">
                                    You
                                </span>
                            )}
                        </div>
                        <p className="text-muted-foreground text-sm">
                            {format(question.created_at)}
                            {question.updated_at !== question.created_at &&
                                " • Edited"}
                        </p>
                    </div>
                </div>

                {isOwner && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                            >
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem
                                onClick={() => {
                                    setIsEditing(true);
                                    setContent(question.content);
                                }}
                                className="cursor-pointer"
                            >
                                <Edit className="h-4 w-4" />
                                <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.preventDefault();
                                    setIsDeleteDialogOpen(true);
                                }}
                                className="text-destructive focus:text-destructive"
                            >
                                <Trash className="text-destructive h-4 w-4" />
                                <span>Delete</span>
                            </DropdownMenuItem>
                            <ConfirmDialog
                                title="Delete Question"
                                description="Are you sure you want to delete this question? This action cannot be undone."
                                isOpen={isDeleteDialogOpen}
                                onClose={() => setIsDeleteDialogOpen(false)}
                                onConfirm={handleDelete}
                            />
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </header>

            <main className="mb-4">
                {isEditing ? (
                    <div className="space-y-4">
                        <MDEditor
                            value={content}
                            onChange={(val: string | undefined) =>
                                setContent(val || "")
                            }
                            height={200}
                            className="min-h-[200px] rounded-lg"
                        />
                        <div className="flex justify-end gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsEditing(false)}
                                disabled={isDeleting}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="btn-primary"
                                onClick={handleEdit}
                                disabled={isDeleting || !content.trim()}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="prose dark:prose-invert max-w-none">
                        <p>{content}</p>
                    </div>
                )}
            </main>

            <footer className="mt-4 flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-2">
                    {hasReply ? (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowReply(!showReply)}
                        >
                            <MessageCircle className="mr-1 h-4 w-4" />
                            {showReply ? "Hide reply" : "Show reply"}
                        </Button>
                    ) : (
                        <Button
                            variant="ghost"
                            disabled
                            size="sm"
                            onClick={() => setShowReply(!showReply)}
                        >
                            <MessageCircle className="mr-1 h-4 w-4" />
                            No replies yet
                        </Button>
                    )}
                </div>
            </footer>

            <AnimatePresence>
                {showReply && question.reply && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 overflow-hidden"
                    >
                        <Reply reply={question.reply} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.article>
    );
}

