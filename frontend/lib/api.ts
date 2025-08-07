import axios from "axios";

// API Utilities for Frontend
const fetchCourses = async (): Promise<object | null> => {
    try {
        const res = await axios.get(`http://localhost:8000/courses`);
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

const fetchCourse = async (id: number): Promise<object | null> => {
    try {
        const res = await axios.get(`http://localhost:8000/courses?id=${id}`);
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

const fetchSessions = async (id: number): Promise<object | null> => {
    try {
        const res = await axios.get(
            `http://localhost:8000/sessions?course_id=${id}`,
        );
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

const fetchSession = async (id: number): Promise<object | null> => {
    try {
        const res = await axios.get(`http://localhost:8000/sessions?id=${id}`);
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

const fetchVideos = async (id: number): Promise<object | null> => {
    try {
        const res = await axios.get(
            `http://localhost:8000/videos?course_id=${id}`,
        );
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

const fetchBooks = async (id: number): Promise<object | null> => {
    try {
        const res = await axios.get(
            `http://localhost:8000/books?course_id=${id}`,
        );
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

const fetchExams = async (id: number): Promise<object | null> => {
    try {
        const res = await axios.get(
            `http://localhost:8000/exams?course_id=${id}`,
        );
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

const fetchEnrollments = async (): Promise<object | null> => {
    try {
        const res = await axios.get(`http://localhost:8000/enrollments`);
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

const sendMessage = async (data: object): Promise<object | null> => {
    try {
        const res = await axios.post(`http://localhost:8000/messages`, data);
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

export {
    fetchCourses,
    fetchCourse,
    fetchSessions,
    fetchSession,
    fetchVideos,
    fetchBooks,
    fetchExams,
    fetchEnrollments,
    sendMessage
};
