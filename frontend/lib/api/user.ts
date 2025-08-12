import axios from "axios";

export const getTeacherById = async (
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

export const getAllTeachers = async (): Promise<UserType[]> => {
    try {
        const res = await axios.get("http://localhost:8000/users?role=teacher");
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
        const res = await axios.get(`http://localhost:8000/users/${id}`);
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return;
    }
};
