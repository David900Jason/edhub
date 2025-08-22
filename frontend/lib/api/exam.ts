import axios from "axios";

// Define EditExamFormType if not available
interface EditExamFormType {
    title: string;
    description: string;
    duration: number;
    questions: QuestionBase[];
    marks: number;
    passing_score?: number;
}

export const getExamsByTeacherId = async (
    teacherId: string | number,
): Promise<Exam[] | null> => {
    try {
        const res = await axios.get(
            `http://localhost:8000/exams?teacher_id=${teacherId}`,
        );
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

export const getExamsByCourseId = async (courseId: string | number): Promise<Exam[]> => {
    try {
        const res = await axios.get(
            `http://localhost:8000/exams?course_id=${courseId}`,
        );
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return [];
    }
};

export const getExamById = async (examId: string | number): Promise<Exam | null> => {
    try {
        const res = await axios.get(`http://localhost:8000/exams/${examId}`);
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

export const updateExam = async (id: string | number, data: EditExamFormType): Promise<EditExamFormType | null> => {
    try {
        const res = await axios.patch(
            `http://localhost:8000/exams/${id}`,
            data,
        );
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

export const createExam = async (exam: Exam): Promise<Exam | null> => {
    try {
        const res = await axios.post("http://localhost:8000/exams", exam);
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

export const deleteExamById = async (examId: string | number): Promise<boolean> => {
    try {
        await axios.delete(`http://localhost:8000/exams/${examId}`);
        return true;
    } catch (error: unknown) {
        console.error(error);
        return false;
    }
};

// Question CRUD Operations
export const addQuestionToExam = async (
    examId: string | number, 
    question: QuestionBase
): Promise<QuestionBase | null> => {
    try {
        // First get the current exam
        const currentExam = await getExamById(examId);
        if (!currentExam) return null;
        
        // Create updated questions array
        const currentQuestions = Array.isArray(currentExam.questions) 
            ? currentExam.questions 
            : [];
            
        const updatedQuestions = [...currentQuestions, question];
        
        // Update the exam with new questions array
        await axios.patch(`http://localhost:8000/exams/${examId}`, {
            questions: updatedQuestions
        });
        
        return question;
    } catch (error) {
        console.error('Failed to add question:', error);
        return null;
    }
};

export const updateQuestionInExam = async (
    examId: string | number, 
    questionIndex: number, 
    question: QuestionBase
): Promise<QuestionBase | null> => {
    try {
        // First get the current exam
        const currentExam = await getExamById(examId);
        if (!currentExam || !Array.isArray(currentExam.questions)) return null;
        
        // Create updated questions array
        const updatedQuestions = [...currentExam.questions];
        if (questionIndex >= 0 && questionIndex < updatedQuestions.length) {
            updatedQuestions[questionIndex] = question;
        } else {
            return null; // Invalid index
        }
        
        // Update the exam with updated questions array
        await axios.patch(`http://localhost:8000/exams/${examId}`, {
            questions: updatedQuestions
        });
        
        return question;
    } catch (error) {
        console.error('Failed to update question:', error);
        return null;
    }
};

export const deleteQuestionFromExam = async (
    examId: string | number, 
    questionIndex: number
): Promise<boolean> => {
    try {
        // First get the current exam
        const currentExam = await getExamById(examId);
        if (!currentExam || !Array.isArray(currentExam.questions)) return false;
        
        // Create updated questions array without the deleted question
        const updatedQuestions = currentExam.questions.filter(
            (_: unknown, index: number) => index !== questionIndex
        );
        
        // Update the exam with updated questions array
        await axios.patch(`http://localhost:8000/exams/${examId}`, {
            questions: updatedQuestions
        });
        
        return true;
    } catch (error) {
        console.error('Failed to delete question:', error);
        return false;
    }
};