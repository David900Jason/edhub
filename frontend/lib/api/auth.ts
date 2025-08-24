// API Utilities for Frontend
import axios from "axios";
import { generateId, convertSchoolYear } from "../utils";
import api from ".";

const createUser = async (data: UserType): Promise<object | null> => {
    try {
        const res = await axios.post(`http://localhost:8001/users`, {
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
        const notesRes = await axios.post(`http://localhost:8001/notes`, {
            id: generateId(4),
            user_id: res.data.id,
            notes: [],
        });
        const tasksRes = await axios.post(`http://localhost:8001/tasks`, {
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

const updateUserActivation = async (userId: string | number) => {
    try {
        const res = await axios.patch(`http://localhost:8001/users/${userId}`, {
            is_active: true,
        });
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

export const loginUser = async (data: { email: string; password: string }) => {
    try {
        const res = await api.post("/auth/login/", data);
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

export const logoutUser = async () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user_profile");
};

export const refreshUser = async () => {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) return;

    try {
        const res = await api.post("/auth/refresh/", {
            refresh: refresh,
        });
        const data = await res.data;
        if (data) {
            localStorage.setItem("access", data.access);
            location.reload();
        };
    } catch (error: any) {
        console.error(error);
        return;
    }
};

export const getUserProfile = async (userToken: string) => {
    if (!userToken) return;

    try {
        const res = await api.get("/users/me", {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
        return res.data;
    } catch (error: any) {
        if (error.status === 401) {
            refreshUser();
            getUserProfile(userToken);
        }
        console.log(error);
    }
};

const getUserByEmail = async (email: string): Promise<UserType | null> => {
    try {
        const res = await axios.get(
            `http://localhost:8001/users?email=${email}`,
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
            `http://localhost:8001/users?email=${email}`,
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
        const res = await axios.patch(`http://localhost:8001/users/${userId}`, {
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
        const res = await axios.patch(`http://localhost:8001/users/${userId}`, {
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
        const res = await axios.post(`http://localhost:8001/messages`, data);
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

export {
    createUser,
    createMessage,
    getUserByEmail,
    getUserIdByEmail,
    updateUserActivation,
    updateUserVerification,
    updateUserPassword,
};
