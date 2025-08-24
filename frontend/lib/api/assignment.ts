import axios from "axios";

export const getTeacherAssignments = async (
    teacherId: string,
): Promise<Assignment[]> => {
    try {
        const response = await axios.get(
            `http://localhost:8001/assignments?teacher_id=${teacherId}`,
        );
        return response.data || [];
    } catch (error) {
        console.error("Error fetching teacher assignments:", error);
        return [];
    }
};

export const getAssignmentsByTeacherId = async (
    teacherId: string,
): Promise<Assignment[] | null> => {
    try {
        const res = await axios.get(
            `http://localhost:8001/assignments?teacher_id=${teacherId}`,
        );
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

export const getAssignmentsByCourseId = async (
    courseId: string,
): Promise<Assignment[]> => {
    try {
        const res = await axios.get(
            `http://localhost:8001/assignments?course_id=${courseId}`,
        );
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return [];
    }
};

export const getAssignmentById = async (
    assignmentId: string,
): Promise<Assignment | null> => {
    try {
        const res = await axios.get(
            `http://localhost:8001/assignments/${assignmentId}`,
        );
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

export const createAssignment = async (
    assignment: Assignment,
): Promise<Assignment | null> => {
    try {
        const res = await axios.post(
            "http://localhost:8001/assignments",
            assignment,
        );
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

export const updateAssignment = async (
    id: string,
    data: Partial<Assignment>,
): Promise<Assignment | null> => {
    try {
        const res = await axios.patch(
            `http://localhost:8001/assignments/${id}`,
            data,
        );
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

export const deleteAssignmentById = async (
    assignmentId: string,
): Promise<boolean> => {
    try {
        await axios.delete(`http://localhost:8001/assignments/${assignmentId}`);
        return true;
    } catch (error: unknown) {
        console.error(error);
        return false;
    }
};

// Question CRUD Operations
export const addQuestionToAssignment = async (
    assignmentId: string,
    question: QuestionBase,
): Promise<QuestionBase | null> => {
    try {
        const currentAssignment = await getAssignmentById(assignmentId);
        if (!currentAssignment) return null;

        const updatedQuestions = [
            ...(currentAssignment.questions || []),
            question,
        ];

        const res = await axios.patch(
            `http://localhost:8001/assignments/${assignmentId}`,
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

export const updateQuestionInAssignment = async (
    assignmentId: string,
    questionIndex: number,
    question: QuestionBase,
): Promise<QuestionBase | null> => {
    try {
        const currentAssignment = await getAssignmentById(assignmentId);
        if (!currentAssignment?.questions) return null;

        const updatedQuestions = [...currentAssignment.questions];
        updatedQuestions[questionIndex] = question;

        await axios.patch(`http://localhost:8001/assignments/${assignmentId}`, {
            questions: updatedQuestions,
        });

        return question;
    } catch (error) {
        console.error("Failed to update question:", error);
        return null;
    }
};

export const deleteQuestionFromAssignment = async (
    assignmentId: string,
    questionIndex: number,
): Promise<boolean> => {
    try {
        const currentAssignment = await getAssignmentById(assignmentId);
        if (!currentAssignment?.questions) return false;

        const updatedQuestions = currentAssignment.questions.filter(
            (_, index) => index !== questionIndex,
        );

        await axios.patch(`http://localhost:8001/assignments/${assignmentId}`, {
            questions: updatedQuestions,
        });

        return true;
    } catch (error) {
        console.error("Failed to delete question:", error);
        return false;
    }
};
