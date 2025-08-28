import api from ".";

type CreateTodo = Omit<Task, "id" | "created_at">;

export const getAllTodos = async (): Promise<Task[]> => {
    try {
        const response = await api.get("/todos/");
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const createTodo = async (todo: CreateTodo): Promise<Task[]> => {
    try {
        const response = await api.post("/todos/", todo);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const updateTodo = async (
    id: string,
    status: string,
): Promise<Task[]> => {
    try {
        const response = await api.put(`/todos/${id}/`, {
            status,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const deleteTodo = async (id: string): Promise<Task[]> => {
    try {
        const response = await api.delete(`/todos/${id}/`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
