import api from ".";

export const getAllNotes = async (): Promise<NotesType[]> => {
    try {
        const response = await api.get("/notes/");
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const createNote = async (note: NotesType): Promise<NotesType[]> => {
    try {
        const response = await api.post("/notes/", note);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const editNote = async (note: NotesType): Promise<NotesType[]> => {
    try {
        const response = await api.put(`/notes/${note.id}/`, note);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const deleteNote = async (id: string): Promise<NotesType[]> => {
    try {
        const response = await api.delete(`/notes/${id}/`);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}