"use client";

import TasksList from "./TasksList";
import { getAllTodos } from "@/lib/api/todo";
import { useEffect, useState } from "react";

const TodoList = () => {
    const [todos, setTodos] = useState<Task[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const tasks = await getAllTodos();
            setTodos(tasks);
        };
        fetchTasks();
    }, [setTodos]);

    return (
        <section>
            <header className="mb-8">
                <h1 className="text-3xl font-semibold">Todo List</h1>
            </header>
            <main className="rounded-2xl border p-6">
                <TasksList todos={todos} />
            </main>
        </section>
    );
};

export default TodoList;
