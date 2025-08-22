import { getQuizById } from "@/lib/api/quiz";
import Quiz from "../../_components/Quiz";

const QuizPage = async ({
    params,
}: {
    params: Promise<{ quizId: string }>;
}) => {
    const { quizId } = await params;
    const quiz: Quiz | null = await getQuizById(quizId);

    return (
        <section className="p-8">
            <header className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold">{quiz?.title}</h1>
                    <p className="p-lead">{quiz?.description}</p>
                </div>
            </header>
            <Quiz quiz={quiz || null} />
        </section>
    );
};

export default QuizPage;
