import axios from "axios";
import { generateId, convertSchoolYear } from "./utils";

// API Utilities for Frontend
const createUser = async (data: SignupFormType): Promise<object | null> => {
    try {
        const res = await axios.post(`http://localhost:8000/users`, {
            ...data,
            id: generateId(6),
            is_active: false,
            is_verified: false,
            wallet_balance: 0,
            school_year: convertSchoolYear(data.school_year),
        });
        console.log(res.data);
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

const loginUser = async (data: { email: string; password: string }) => {
    try {
        const res = await axios.get(
            `http://localhost:8000/users?email=${data.email}&password=${data.password}`,
        );
        return res.data[0];
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

const findUserByEmail = async (
    email: string | null,
): Promise<string | null | number> => {
    try {
        const res = await axios.get(
            `http://localhost:8000/users?email=${email}`,
        );
        return res.data[0].id;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

const verifyUser = async (
    otp: string,
    email: string | null,
    userId: string | null | number,
) => {
    try {
        // add new element to an existing user
        const res = await axios.patch(`http://localhost:8000/users/${userId}`, {
            is_verified: true,
        });
        console.log(res.data);
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

const fetchCourses = async (): Promise<CourseType[]> => {
    try {
        const res = await axios.get(`http://localhost:8000/courses/`);
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return [];
    }
};

const fetchCourse = async (id: string): Promise<CourseType | undefined> => {
    try {
        const res = await axios.get(`http://localhost:8000/courses?id=${id}`);
        return res.data[0];
    } catch (error: any) {
        console.error(error.message);
        return;
    }
};

const fetchTeacher = async (
    id: string | number | "",
): Promise<UserType | undefined> => {
    try {
        if (id === "") {
            return;
        }
        const res = await axios.get(
            `http://localhost:8000/users?id=${id}&role=teacher`,
        );
        return res.data[0];
    } catch (error: unknown) {
        console.error(error);
        return;
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
    fetchTeacher,
    fetchSession,
    fetchVideos,
    fetchBooks,
    fetchExams,
    fetchEnrollments,
    sendMessage,
    createUser,
    verifyUser,
    findUserByEmail,
    loginUser,
};
