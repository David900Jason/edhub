import {
    Question,
    QuestionType,
    QuestionOption,
    EssayQuestion,
    MCQQuestion,
} from "@/types/index";

const API_BASE_URL = "http://localhost:3000";

export interface CreateQuestionDto {
    question_text: string;
    type: QuestionType;
    mark: number;
    answers?: Array<{
        answer_text: string;
        is_correct: boolean;
    }>;
    guide_answer?: string;
}

export interface UpdateQuestionDto extends Partial<CreateQuestionDto> {}

export const questionApi = {
    // Get all questions (with optional filtering)
    async getQuestions(
        examId?: string,
        type?: QuestionType,
    ): Promise<Question[]> {
        try {
            let url = `${API_BASE_URL}/exams`;
            if (examId) {
                url += `/${examId}`;
            }

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Failed to fetch questions");
            }

            const data = await response.json();

            // If we're getting questions for a specific exam, they're nested in the exam object
            if (examId && data.questions) {
                return data.questions.map((q: any, index: number) => ({
                    id: `temp-${index}`, // Since questions in exam don't have IDs in the current structure
                    text: q.question_text,
                    type: q.type === "multiple_choice" ? "mcq" : "essay",
                    points: q.mark,
                    options: q.answers?.map((a: any) => ({
                        id: `opt-${Math.random().toString(36).substr(2, 9)}`,
                        text: a.answer_text,
                        isCorrect: a.is_correct,
                    })),
                    modelAnswer: q.answers?.[0]?.guide_answer,
                    maxLength: q.type === "essay" ? 500 : undefined,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }));
            }

            // For the question bank, we'll need to implement a separate endpoint
            // This is a placeholder that returns an empty array for now
            return [];
        } catch (error) {
            console.error("Error fetching questions:", error);
            throw error;
        }
    },

    // Get a single question
    async getQuestion(examId: string, questionId: string): Promise<Question> {
        try {
            const response = await fetch(`${API_BASE_URL}/exams/${examId}`);

            if (!response.ok) {
                throw new Error("Failed to fetch question");
            }

            const exam = await response.json();
            const questionData = exam.questions[parseInt(questionId)]; // Using array index as ID for now

            if (!questionData) {
                throw new Error("Question not found");
            }

            return {
                id: questionId,
                text: questionData.question_text,
                type: questionData.type === "multiple_choice" ? "mcq" : "essay",
                points: questionData.mark,
                options: questionData.answers?.map((a: any, i: number) => ({
                    id: `opt-${i}`,
                    text: a.answer_text,
                    isCorrect: a.is_correct,
                })),
                modelAnswer: questionData.answers?.[0]?.guide_answer,
                maxLength: questionData.type === "essay" ? 500 : undefined,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
        } catch (error) {
            console.error("Error fetching question:", error);
            throw error;
        }
    },

    // Create a new question in an exam
    async createQuestion(
        examId: string,
        data: CreateQuestionDto,
    ): Promise<Question> {
        try {
            // First, get the current exam
            const examResponse = await fetch(`${API_BASE_URL}/exams/${examId}`);
            if (!examResponse.ok) {
                throw new Error("Failed to fetch exam");
            }

            const exam = await examResponse.json();

            // Add the new question to the exam's questions array
            const newQuestion = {
                question_text: data.question_text,
                type: data.type === "mcq" ? "multiple_choice" : "essay",
                mark: data.mark,
                answers:
                    data.type === "mcq"
                        ? data.answers?.map((a) => ({
                              answer_text: a.answer_text,
                              is_correct: a.is_correct,
                          }))
                        : [{ guide_answer: data.guide_answer }],
            };

            exam.questions = [...(exam.questions || []), newQuestion];

            // Update the exam with the new question
            const updateResponse = await fetch(
                `${API_BASE_URL}/exams/${examId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(exam),
                },
            );

            if (!updateResponse.ok) {
                throw new Error("Failed to create question");
            }

            // Return the created question with a temporary ID
            return {
                id: `temp-${Date.now()}`,
                text: newQuestion.question_text,
                type: data.type,
                points: newQuestion.mark,
                options:
                    newQuestion.type === "multiple_choice"
                        ? newQuestion.answers?.map((a, i) => ({
                              id: `opt-${i}`,
                              text: a.answer_text,
                              isCorrect: a.is_correct,
                          }))
                        : [],
                modelAnswer:
                    newQuestion.type === "essay"
                        ? newQuestion.answers?.[0]?.guide_answer
                        : undefined,
                maxLength: newQuestion.type === "essay" ? 500 : undefined,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
        } catch (error) {
            console.error("Error creating question:", error);
            throw error;
        }
    },

    // Update a question
    async updateQuestion(
        examId: string,
        questionId: string,
        data: UpdateQuestionDto,
    ): Promise<Question> {
        try {
            // First, get the current exam
            const examResponse = await fetch(`${API_BASE_URL}/exams/${examId}`);
            if (!examResponse.ok) {
                throw new Error("Failed to fetch exam");
            }

            const exam = await examResponse.json();
            const questionIndex = parseInt(questionId);

            if (!exam.questions || !exam.questions[questionIndex]) {
                throw new Error("Question not found");
            }

            // Update the question
            const updatedQuestion = {
                ...exam.questions[questionIndex],
                question_text:
                    data.question_text ||
                    exam.questions[questionIndex].question_text,
                type: data.type === "mcq" ? "multiple_choice" : "essay",
                mark: data.mark || exam.questions[questionIndex].mark,
                answers:
                    data.type === "mcq" && data.answers
                        ? data.answers.map((a) => ({
                              answer_text: a.answer_text,
                              is_correct: a.is_correct,
                          }))
                        : data.guide_answer
                          ? [{ guide_answer: data.guide_answer }]
                          : exam.questions[questionIndex].answers,
            };

            exam.questions[questionIndex] = updatedQuestion;

            // Update the exam with the updated question
            const updateResponse = await fetch(
                `${API_BASE_URL}/exams/${examId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(exam),
                },
            );

            if (!updateResponse.ok) {
                throw new Error("Failed to update question");
            }

            // Return the updated question
            return {
                id: questionId,
                text: updatedQuestion.question_text,
                type:
                    updatedQuestion.type === "multiple_choice"
                        ? "mcq"
                        : "essay",
                points: updatedQuestion.mark,
                options:
                    updatedQuestion.type === "multiple_choice"
                        ? updatedQuestion.answers?.map((a: any, i: number) => ({
                              id: `opt-${i}`,
                              text: a.answer_text,
                              isCorrect: a.is_correct,
                          }))
                        : [],
                modelAnswer:
                    updatedQuestion.type === "essay"
                        ? updatedQuestion.answers?.[0]?.guide_answer
                        : undefined,
                maxLength: updatedQuestion.type === "essay" ? 500 : undefined,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
        } catch (error) {
            console.error("Error updating question:", error);
            throw error;
        }
    },

    // Delete a question
    async deleteQuestion(examId: string, questionId: string): Promise<void> {
        try {
            // First, get the current exam
            const examResponse = await fetch(`${API_BASE_URL}/exams/${examId}`);
            if (!examResponse.ok) {
                throw new Error("Failed to fetch exam");
            }

            const exam = await examResponse.json();
            const questionIndex = parseInt(questionId);

            if (!exam.questions || !exam.questions[questionIndex]) {
                throw new Error("Question not found");
            }

            // Remove the question from the array
            exam.questions = exam.questions.filter(
                (_: any, index: number) => index !== questionIndex,
            );

            // Update the exam with the question removed
            const updateResponse = await fetch(
                `${API_BASE_URL}/exams/${examId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(exam),
                },
            );

            if (!updateResponse.ok) {
                throw new Error("Failed to delete question");
            }
        } catch (error) {
            console.error("Error deleting question:", error);
            throw error;
        }
    },

    // Add question to exam (from question bank)
    async addQuestionToExam(examId: string, questionId: string): Promise<void> {
        // In our current structure, questions are stored directly in the exam
        // So this would be similar to creating a new question with the same data
        // For now, we'll just log this action
        console.log(`Adding question ${questionId} to exam ${examId}`);

        // In a real implementation, we would:
        // 1. Get the question from the question bank
        // 2. Add it to the exam's questions array
        // 3. Update the exam

        // For now, we'll simulate a successful operation
        return Promise.resolve();
    },
};

export default questionApi;

