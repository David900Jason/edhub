import axios from "axios";

export const getTeacherQuizzes = async (teacherId: string): Promise<Quiz[]> => {
    try {
        const response = await axios.get(
            `http://localhost:8001/quizzes?teacher_id=${teacherId}`,
        );
        return response.data || [];
    } catch (error) {
        console.error("Error fetching teacher quizzes:", error);
        return [];
    }
};

export const getQuizzesByTeacherId = async (
    teacherId: string,
): Promise<Quiz[] | null> => {
    try {
        const res = await axios.get(
            `http://localhost:8001/quizzes?teacher_id=${teacherId}`,
        );
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

export const getQuizById = async (quizId: string): Promise<Quiz | null> => {
    try {
        const res = await axios.get(`http://localhost:8001/quizzes/${quizId}`);
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

export const getQuizSessionByUserId = async (
    userId: string | number,
    quizId: string | number,
): Promise<QuizSession | null> => {
    try {
        const res = await axios.get(
            `http://localhost:8001/quiz_sessions?user_id=${userId}&quiz_id=${quizId}`,
        );
        return res.data[0];
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

export const getQuizByVideoId = async (
    videoId: string | number,
): Promise<Quiz[]> => {
    try {
        const res = await axios.get(
            `http://localhost:8001/quizzes?video_id=${videoId}`,
        );
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return [];
    }
};

export const createQuiz = async (quiz: Quiz): Promise<Quiz | null> => {
    try {
        const res = await axios.post("http://localhost:8001/quizzes", quiz);
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

export const createQuizSession = async (
    quizSession: QuizSession | null,
): Promise<QuizSession | null> => {
    try {
        const res = await axios.post(
            "http://localhost:8001/quiz_sessions",
            quizSession,
        );
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

export const updateQuiz = async (
    id: string,
    data: Partial<Quiz>,
): Promise<Quiz | null> => {
    try {
        const res = await axios.patch(
            `http://localhost:8001/quizzes/${id}`,
            data,
        );
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

export const updateQuizSession = async (
    id: string,
    data: QuizSession,
): Promise<QuizSession | null> => {
    try {
        const res = await axios.put(
            `http://localhost:8001/quiz_sessions/${id}`,
            data,
        );
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

export const deleteQuizById = async (quizId: string): Promise<boolean> => {
    try {
        await axios.delete(`http://localhost:8001/quizzes/${quizId}`);
        return true;
    } catch (error: unknown) {
        console.error(error);
        return false;
    }
};

// Question CRUD Operations
export const addQuestionToQuiz = async (
    quizId: string,
    question: QuestionBase,
): Promise<QuestionBase | null> => {
    try {
        const currentQuiz = await getQuizById(quizId);
        if (!currentQuiz) return null;

        const updatedQuestions = [...(currentQuiz.questions || []), question];

        const res = await axios.patch(
            `http://localhost:8001/quizzes/${quizId}`,
            {
                questions: updatedQuestions,
            },
        );

        return question;
    } catch (error) {
        console.error("Failed to add question:", error);
        return null;
    }
};

export const updateQuestionInQuiz = async (
    quizId: string,
    questionIndex: number,
    question: QuestionBase,
): Promise<QuestionBase | null> => {
    try {
        const currentQuiz = await getQuizById(quizId);
        if (!currentQuiz?.questions) return null;

        const updatedQuestions = [...currentQuiz.questions];
        updatedQuestions[questionIndex] = question;

        await axios.patch(`http://localhost:8001/quizzes/${quizId}`, {
            questions: updatedQuestions,
        });

        return question;
    } catch (error) {
        console.error("Failed to update question:", error);
        return null;
    }
};

export const deleteQuestionFromQuiz = async (
    quizId: string,
    questionIndex: number,
): Promise<boolean> => {
    try {
        const currentQuiz = await getQuizById(quizId);
        if (!currentQuiz?.questions) return false;

        const updatedQuestions = currentQuiz.questions.filter(
            (_, index) => index !== questionIndex,
        );

        await axios.patch(`http://localhost:8001/quizzes/${quizId}`, {
            questions: updatedQuestions,
        });

        return true;
    } catch (error) {
        console.error("Failed to delete question:", error);
        return false;
    }
};
