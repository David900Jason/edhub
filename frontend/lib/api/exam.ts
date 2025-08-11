import axios from "axios";

export const getAssignmentsByCourseId = async (courseId: string): Promise<Exam[]> => {
    try {
        const response = await axios.get(
            `http://localhost:8000/assignments?course_id=${courseId}`,
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getExamsByCourseId = async (courseId: string): Promise<Exam[]> => {
    try {
        const response = await axios.get(
            `http://localhost:8000/exams?course_id=${courseId}`,
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
