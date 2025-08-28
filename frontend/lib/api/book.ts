import api from ".";

export const getTeacherBooks = async (): Promise<Book[]> => {
    try {
        const response = await api.get("/courses/books/");
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getTeacherBook = async (bookId: number): Promise<Book | undefined> => {
    try {
        const response = await api.get(`/courses/books/${bookId}/`);
        return response.data;
    } catch (error) {
        console.error(error);
        return;
    }
};

export const editBook = async (bookId: number, book: FormData) => {
    try {
        const response = await api.patch(`/courses/books/${bookId}/replace/`, book, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const createBook = async (book: FormData) => {
    try {
        const response = await api.post("/courses/books/upload/", book, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const deleteBook = async (bookId: number): Promise<Book[]> => {
    try {
        const response = await api.delete(`/courses/books/${bookId}/`);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};