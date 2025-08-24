import api from ".";
import { refreshUser } from "./auth";

export const getAllNotes = async (): Promise<NotesType[]> => {
    const access = localStorage.getItem("access");
    if (!access) return [];

    try {
        const response = await api.get("/notes/", {
            headers: {
                Authorization: `Bearer ${access}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error: any) {
        // Unauthorized Access 401
        if (error.status === 401) {
            refreshUser();
            getAllNotes();
            return [];
        }
        console.error(error);
        return [];
    }
};
