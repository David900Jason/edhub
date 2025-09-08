// app/[locale]/dashboard/student/courses/[courseId]/videos/[videoId]/(qna)/Reply.tsx
"use client";

import { format } from "timeago.js";
import Image from "next/image";
import { useSessionStorage } from "@/hooks/useSessionStorage";

interface ReplyProps {
    reply: {
        id: string;
        content: string;
        created_at: string;
        teacher: {
            id: string;
            full_name: string;
            profile_img: string | null;
        };
        likes?: number;
        liked?: boolean;
    };
}

export function Reply({ reply }: ReplyProps) {
    const [user] = useSessionStorage("user_profile", null);
    const isTeacher = user?.role === "teacher";

    return (
        <div className="bg-muted/20 mt-4 rounded-lg border p-4">
            <div className="mb-3 flex items-center gap-2">
                <div className="relative h-8 w-8">
                    <Image
                        src={reply.teacher.profile_img || "/avatar.jpg"}
                        alt={reply.teacher.full_name}
                        fill
                        className="rounded-full object-cover"
                    />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                            {reply.teacher.full_name}
                        </span>
                        {isTeacher && (
                            <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">
                                Teacher
                            </span>
                        )}
                    </div>
                    <p className="text-muted-foreground text-xs">
                        {format(reply.created_at)}
                    </p>
                </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
                <p>{reply.content}</p>
            </div>
        </div>
    );
}
