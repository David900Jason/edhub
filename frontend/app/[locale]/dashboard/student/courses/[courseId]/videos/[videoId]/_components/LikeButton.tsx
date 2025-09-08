"use client";

import { ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { likeVideo } from "@/lib/api/video";
import { useState } from "react";
import { toast } from "sonner";

const LikeButton = ({ id, likes }: { id: string; likes: number }) => {
    const [likesCount, setLikesCount] = useState<number>(likes);

    const handleClick = async () => {
        const res = await likeVideo(id);
        setLikesCount((prev) => prev + 1);

        toast.info(res?.message as string, {
            position: "top-center",
        });
    };

    return (
        <Button
            asChild
            variant="outline"
            className="border-primary flex cursor-pointer items-center gap-2 hover:!bg-purple-950 hover:!text-white"
            onClick={() => handleClick()}
        >
            <p className="p-lead flex items-center gap-2">
                <ThumbsUp className={cn("text-primary h-4 w-4")} />
                {likesCount}
            </p>
        </Button>
    );
};

export default LikeButton;
