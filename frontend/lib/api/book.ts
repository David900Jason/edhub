import axios from "axios";

export const getBooksByCourseId = async (courseId: string): Promise<Book[]> => {
    try {
        const response = await axios.get(
            `http://localhost:8000/books?course_id=${courseId}`,
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};