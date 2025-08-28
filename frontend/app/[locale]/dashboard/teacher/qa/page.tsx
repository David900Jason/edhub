"use client";

import { Input } from "@/components/ui/input";
import {
    getTeacherQuestions,
} from "@/lib/api/questions";
import { useEffect, useState } from "react";
import Question from "./_components/Question";

const TeacherQAPage = () => {
    const [questions, setQuestions] = useState<QnA[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getTeacherQuestions().then((res) => setQuestions(res));
    }, [setQuestions]);

    return (
        <section>
            <header className="mb-8">
                <h1 className="text-3xl font-semibold">Students Questions</h1>
                <p className="p-lead">Check out your students questions</p>
            </header>
            {/* Questions List */}
            <main className="rounded-2xl border p-6">
                {/* Search bar */}
                <div className="mb-6">
                    <Input
                        placeholder="Search questions..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Main content */}
                {questions && questions.length > 0 && (
                    <section className="space-y-6">
                        {questions.map((question) => (
                            <Question key={question.id} question={question} />
                        ))}
                    </section>
                )}

                {/* Fallback Content */}
                {!questions ||
                    (questions.length === 0 && (
                        <section className="flex min-h-[40vh] items-center justify-center rounded-2xl border-2 border-dashed bg-slate-100 p-6 dark:bg-black/50">
                            <p className="text-center">No questions found</p>
                        </section>
                    ))}
            </main>
        </section>
    );
};

export default TeacherQAPage;
