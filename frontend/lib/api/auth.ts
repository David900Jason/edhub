// API Utilities for Frontend
import axios from "axios";
import { generateId, convertSchoolYear } from "../utils";

const createUser = async (data: UserType): Promise<object | null> => {
    try {
        const res = await axios.post(`http://localhost:8000/users`, {
            ...data,
            id: generateId(6),
            is_active: false,
            is_verified: false,
            wallet_balance: 0,
            school_year: convertSchoolYear(data.school_year),
            created_at: new Date().toISOString(),
            notes_id: generateId(4),
            tasks_id: generateId(4),
        });
        const notesRes = await axios.post(`http://localhost:8000/notes`, {
            id: generateId(4),
            user_id: res.data.id,
            notes: [],
        });
        const tasksRes = await axios.post(`http://localhost:8000/tasks`, {
            id: generateId(4),
            user_id: res.data.id,
            tasks: [],
        });
        console.log(res.data);
        console.log(notesRes.data);
        console.log(tasksRes.data);
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

const updateUserActivation = async (userId: string) => {
    try {
        const res = await axios.patch(`http://localhost:8000/users/${userId}`, {
            is_active: true,
        });
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

const getUserByEmailAndPassword = async (data: { email: string; password: string }) => {
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

const getUserIdByEmail = async (
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

const updateUserVerification = async (
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

const updateUserPassword = async (
    userId: string | number | null,
    password: string,
) => {
    try {
        const res = await axios.patch(`http://localhost:8000/users/${userId}`, {
            password: password,
        });
        console.log(res.data);
    } catch (error: unknown) {
        console.error(error);
        return;
    }
};

const createMessage = async (data: object): Promise<object | null> => {
    try {
        const res = await axios.post(`http://localhost:8000/messages`, data);
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

export {
    createUser,
    createMessage,
    getUserByEmailAndPassword,
    getUserIdByEmail,
    updateUserActivation,
    updateUserVerification,
    updateUserPassword,
};
