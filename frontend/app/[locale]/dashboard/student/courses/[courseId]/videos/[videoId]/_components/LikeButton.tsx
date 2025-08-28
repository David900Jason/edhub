"use client";

import { useRef } from "react";
import { ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { likeVideo } from "@/lib/api/video";

const LikeButton = ({ id, likes }: { id: string; likes: number }) => {
    const ref = useRef<boolean>(false);

    const handleClick = () => {
        if (ref.current) return;
        
        if (likes == 50) return;
        ref.current = true;
        likeVideo(id);

        window.location.reload();
    };

    return (
        <Button
            asChild
            variant="outline"
            className="flex cursor-pointer items-center gap-2 hover:!bg-purple-950 hover:!text-white border-primary"
            onClick={handleClick}
        >
            <p className="p-lead flex items-center gap-2">
                <ThumbsUp className={cn("h-4 w-4 text-primary")} />
                {likes}
            </p>
        </Button>
    );
};

export default LikeButton;
