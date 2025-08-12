"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateLikes } from "@/lib/api/video";
import { cn } from "@/lib/utils";

const LikeButton = ({ id, likes }: { id: string | number; likes: number }) => {
    const router = useRouter();
    const ref = useRef<boolean>(false);

    const handleClick = () => {
        if (ref.current) return;
        ref.current = true;

        if (likes == 50) return;

        updateLikes(id, likes + 1);
        router.refresh();
    };

    return (
        <Button
            asChild
            variant="outline"
            className="flex cursor-pointer items-center gap-2 hover:!bg-purple-950 hover:!text-white"
            onClick={handleClick}
        >
            <p className="p-lead">
                <ThumbsUp className={cn("h-4 w-4", ref.current && "text-primary")} />
                {likes}
            </p>
        </Button>
    );
};

export default LikeButton;
