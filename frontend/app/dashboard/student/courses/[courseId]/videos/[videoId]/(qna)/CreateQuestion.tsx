"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CreateQuestion = ({
    videoId,
    currentUser,
}: {
    videoId: string | number;
    currentUser: UserType | null;
}) => {
    const [question, setQuestion] = useState<string>("");
    const router = useRouter();

    const handleSubmit = async () => {
        await axios.post("/api/questions", {
            question_text: question,
            video_id: videoId,
            user_id: currentUser?.id,
        });
        setQuestion("");
        window.location.reload();
    };

    return (
        <div className="flex items-center gap-2">
            <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question"
                className="my-4 p-4"
            />
            <Button variant="outline" className="w-fit" onClick={handleSubmit}>
                Ask a question
            </Button>
        </div>
    );
};

export default CreateQuestion;
