import axios from "axios";

// API Utilities for Frontend
const fetchCourses = async (): Promise<any | null> => {
    try {
        const res = await axios.get(`http://localhost:8000/courses`);
        return res.data;
    } catch (error: any) {
        console.error(error);
        return null;
    }
};

const fetchCourse = async (id: number): Promise<any | null> => {
    try {
        const res = await axios.get(`http://localhost:8000/courses?id=${id}`);
        return res.data;
    } catch (error: any) {
        console.error(error);
        return null;
    }
};

const fetchSessions = async (id: number): Promise<any | null> => {
    try {
        const res = await axios.get(
            `http://localhost:8000/sessions?course_id=${id}`,
        );
        return res.data;
    } catch (error: any) {
        console.error(error);
        return null;
    }
};

const fetchVideos = async (id: number): Promise<any | null> => {
    try {
        const res = await axios.get(
            `http://localhost:8000/videos?course_id=${id}`,
        );
        return res.data;
    } catch (error: any) {
        console.error(error);
        return null;
    }
};

const fetchBooks = async (id: number): Promise<any | null> => {
    try {
        const res = await axios.get(
            `http://localhost:8000/books?course_id=${id}`,
        );
        return res.data;
    } catch (error: any) {
        console.error(error);
        return null;
    }
};

const fetchExams = async (id: number): Promise<any | null> => {
    try {
        const res = await axios.get(
            `http://localhost:8000/exams?course_id=${id}`,
        );
        return res.data;
    } catch (error: any) {
        console.error(error);
        return null;
    }
};

export { fetchCourses, fetchCourse, fetchSessions, fetchVideos, fetchBooks, fetchExams };
