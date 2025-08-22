"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import NewExamForm from "../_components/new-exam-form";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const CreateExamPage = () => {
    const router = useRouter();
    const t = useTranslations("TEACHER_DASHBOARD.EXAMS.NEW_EXAM");
    return (
        <section>
            <header className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-3xl font-semibold">{t("title")}</h1>
                <Button onClick={() => router.back()} className="btn-primary"><ArrowLeft /> {t("back")}</Button>
            </header>
            <main>
                <NewExamForm />
            </main>
        </section>
    ); 
};

export default CreateExamPage;
