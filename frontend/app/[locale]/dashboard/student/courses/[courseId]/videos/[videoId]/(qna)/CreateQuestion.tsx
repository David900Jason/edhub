"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createQuestion } from "@/lib/api/questions";

const CreateQuestion = ({ videoId }: { videoId: string }) => {
    const [question, setQuestion] = useState<string>("");
    const t = useTranslations("STUDENT_DASHBOARD.COURSES.content.videos_tabs");

    const handleSubmit = async () => {
        createQuestion(question, videoId);
        window.location.reload();
    };

    return (
        <div className="flex items-center gap-2">
            <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={t("qa_placeholder")}
                className="my-4 p-4"
            />
            <Button variant="outline" className="w-fit" onClick={handleSubmit}>
                {t("qa_cta")}
            </Button>
        </div>
    );
};

export default CreateQuestion;
