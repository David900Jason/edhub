import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createReply, deleteReply, editReply } from "@/lib/api/questions";
import { Edit, FileText, Send, Trash, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { format } from "timeago.js";

const Question = ({ question }: { question: QnA }) => {
    const [teacherReply, setTeacherReply] = useState(
        question.reply?.content || ""
    );
    const [isEditing, setIsEditing] = useState(false);

    // Student
    const { full_name, profile_img } = question.student;
    // Teacher
    const { full_name: teacherFullName, profile_img: teacherProfileImg } =
        question.reply?.teacher || {};
    // Question
    const { id, content, created_at, reply, video } = question;
    // Reply
    const {
        id: replyId,
        content: replyContent,
        created_at: replyCreatedAt,
    } = question.reply || {};

    // Handle Create Reply
    const handleCreateReply = () => {
        createReply(teacherReply, id).then(() => {
            setIsEditing(false);
            setTeacherReply("");
            window.location.reload();
        });
    };

    // Handle Edit Reply
    const handleEditReply = () => {
        editReply(teacherReply, replyId as string).then(() => {
            setIsEditing(false);
            setTeacherReply("");
            window.location.reload();
        });
    };

    // Handle Delete Reply
    const handleDeleteReply = () => {
        deleteReply(replyId as string).then(() => {
            setIsEditing(false);
            window.location.reload();
        });
    };

    return (
        <div role="card" className="space-y-6 rounded-2xl border p-6">
            {/* Student */}
            <header className="flex items-center gap-3">
                <Image
                    src={profile_img == null ? "/avatar.jpg" : profile_img}
                    alt="user"
                    width={65}
                    height={65}
                    className="rounded-full"
                />
                <div>
                    <h2 className="text-lg font-semibold">{full_name}</h2>
                    <div className="flex items-center gap-1">
                        <span className="text-sm text-gray-500">
                            {video.title}
                        </span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">
                            {format(created_at)}
                        </span>
                    </div>
                </div>
            </header>
            {/* Question */}
            <main>
                <p className="text-xl text-white">{content}</p>
            </main>
            {/* Reply */}
            {reply && !isEditing && (
                <footer className="border-s-primary border-s-8 bg-black/50 p-6">
                    <div className="mb-4 flex items-center gap-3">
                        <Image
                            src={teacherProfileImg || "/avatar.jpg"}
                            alt="teacher"
                            width={50}
                            height={50}
                            className="rounded-full"
                        />
                        <div className="space-y-[-5px]">
                            <h2 className="text-base font-semibold">
                                {teacherFullName}
                            </h2>
                            <span className="text-sm text-gray-500">
                                {format(replyCreatedAt as string)}
                            </span>
                        </div>
                    </div>
                    <p className="text-base text-white">{replyContent}</p>
                </footer>
            )}
            {/* Actions */}
            <footer>
                {reply && !isEditing && (
                    <div className="flex items-center justify-end gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setIsEditing(true)}
                        >
                            <Edit />
                        </Button>
                        <Button
                            onClick={handleDeleteReply}
                            variant="outline"
                            size="icon"
                        >
                            <Trash className="text-red-500" />
                        </Button>
                    </div>
                )}
                {reply && isEditing && (
                    <div className="w-full space-y-4">
                        <Textarea
                            placeholder="Write your reply here..."
                            className="min-h-[150px]"
                            value={teacherReply}
                            onChange={(e) => setTeacherReply(e.target.value)}
                        />
                        <div className="space-x-2">
                            <Button
                                className="btn-primary"
                                onClick={handleEditReply}
                            >
                                <FileText /> Save Changes
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setIsEditing(false)}
                            >
                                <X /> Cancel
                            </Button>
                        </div>
                    </div>
                )}
                {!reply && !isEditing && (
                    <div className="flex flex-col items-end gap-4">
                        <div className="flex min-h-[150px] w-full items-center justify-center rounded-2xl border bg-black/50 p-6">
                            <p className="text-center text-sm">No reply yet</p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => setIsEditing(true)}
                        >
                            <Send /> Reply
                        </Button>
                    </div>
                )}
                {!reply && isEditing && (
                    <div className="w-full space-y-4">
                        <Textarea
                            placeholder="Write your reply here..."
                            className="min-h-[150px]"
                            value={teacherReply}
                            onChange={(e) => setTeacherReply(e.target.value)}
                        />
                        <div className="space-x-2">
                            <Button
                                className="btn-primary"
                                onClick={handleCreateReply}
                            >
                                <Send /> Send Reply
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setIsEditing(false)}
                            >
                                <X /> Cancel
                            </Button>
                        </div>
                    </div>
                )}
            </footer>
        </div>
    );
};

export default Question;
