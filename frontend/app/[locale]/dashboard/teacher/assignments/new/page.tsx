"use client";

import AssignmentNewForm from "../_components/assignment-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const NewAssignmentPage = () => {
    const t = useTranslations("TEACHER_DASHBOARD.ASSIGNMENTS.NEW_ASSIGNMENT");

    return (
        <section className="mx-auto max-w-3xl">
            <header className="mb-8 flex flex-col items-start justify-between gap-4">
                <Button asChild variant="outline">
                    <Link href="/dashboard/teacher/assignments">
                        <ArrowLeft className="h-4 w-4" />
                        {t("back")}
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-semibold">
                        {t("title")}
                    </h1>
                    <p className="p-lead">
                        {t("description")}
                    </p>
                </div>
            </header>
            <AssignmentNewForm />
        </section>
    );
};

export default NewAssignmentPage;
