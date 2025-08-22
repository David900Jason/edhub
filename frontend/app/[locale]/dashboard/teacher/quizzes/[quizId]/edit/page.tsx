"use client";

import QuizzesEditForm from "../../_components/quizzes-edit-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";

const QuizzesEditPage = () => {
    return (
        <section className="mx-auto max-w-3xl">
            <header className="mb-8 flex flex-col items-start justify-between gap-4">
                <Button asChild variant="outline">
                    <Link href="/dashboard/teacher/quizzes">
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-semibold">Edit Quiz</h1>
                    <p className="p-lead">Edit quiz details.</p>
                </div>
            </header>
            <QuizzesEditForm />
        </section>
    );
};

export default QuizzesEditPage;
