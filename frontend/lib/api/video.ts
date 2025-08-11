import axios from "axios";

export const getVideosByCourseId = async (courseId: string): Promise<Video[]> => {
    try {
        const response = await axios.get(
            `http://localhost:8000/videos?course_id=${courseId}`,
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};