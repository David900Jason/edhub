import axios from "axios";

export const getVideosById = async (courseId: string): Promise<Video[]> => {
    try {
        const response = await axios.get(
            `http://localhost:8001/videos?course_id=${courseId}`,
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getVideoById = async (videoId: string): Promise<Video | null> => {
    try {
        const response = await axios.get(
            `http://localhost:8001/videos/${videoId}`,
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getVideoBooks = async (
    videoId: string | number,
): Promise<Book[]> => {
    try {
        const response = await axios.get(
            `http://localhost:8001/books?video_id=${videoId}`,
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getVideoQuestions = async (
    videoId: string | number,
): Promise<QnA[]> => {
    try {
        const response = await axios.get(
            `http://localhost:8001/questions?video_id=${videoId}`,
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getVideoQuestionsByUserId = async (
    userId: string | number,
): Promise<QnA[]> => {
    try {
        const response = await axios.get(
            `http://localhost:8001/questions?user_id=${userId}`,
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const updateLikes = async (
    videoId: string | number,
    likes: number,
): Promise<Video | null> => {
    try {
        const response = await axios.patch(
            `http://localhost:8001/videos/${videoId}`,
            {
                likes: likes,
            },
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const updateViews = async (
    videoId: string | number,
    views: number,
): Promise<Video | null> => {
    try {
        const response = await axios.patch(
            `http://localhost:8001/videos/${videoId}`,
            {
                views: views,
            },
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
