import axios from "axios";
import api from ".";
import { refreshUser } from "./auth";
import { TeacherType } from "@/app/[locale]/dashboard/student/teachers/page";

export const updateUser = async (
    id: string | number,
    userData: UpdateUserData,
): Promise<UserType | undefined> => {
    try {
        const res = await axios.patch(
            `http://localhost:8001/users/${id}`,
            userData,
        );
        return res.data;
    } catch (error: unknown) {
        console.error("Error updating user:", error);
        throw error; // Re-throw to handle in the component
    }
};

export const getTeacherById = async (teacherId: string): Promise<TeacherType | null> => {
    const access = localStorage.getItem("access");
    if (!teacherId) return null;

    try {
        const res = await api.get(`/users/teacher/${teacherId}`, {
            headers: {
                Authorization: `Bearer ${access}`,
            },
        });
        return res.data;
    } catch (error: any) {
        if (error.status === 401) {
            refreshUser();
            getTeacherById(teacherId);
        }
        console.error(error);
        return null;
    }
};

export const getAllTeachers = async (): Promise<UserType[]> => {
    try {
        const res = await axios.get("http://localhost:8001/users?role=teacher");
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return [];
    }
};

export const getUserById = async (
    id: string | number | "",
): Promise<UserType | undefined> => {
    try {
        const res = await axios.get(`http://localhost:8001/users/${id}`);
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return;
    }
};
