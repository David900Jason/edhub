"use client";

import { Input } from "@/components/ui/input";
import { getAllTodos, createTodo, deleteTodo, updateTodo } from "@/lib/api/todo";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Todo from "./Todo";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const TodoList = () => {
    const [todos, setTodos] = useState<Task[]>([]);
    const [status, setStatus] = useState("all");
    const taskRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            const tasks = await getAllTodos();
            setTodos(tasks);
        };
        fetchTasks();
    }, [setTodos]);

    // Filter Todos by status
    const filteredTodos = useMemo(() => {
        if (status === "all") return todos;
        return todos.filter((todo) => todo.status === status);
    }, [todos, status]);

    // handle adding new task
    const handleAddTodo = async (task: string) => {
        const newTodo = {
            id: "",
            task,
            created_at: "",
            status: "pending",
        };
        await createTodo(newTodo);
        setTodos((prevTodos) => [newTodo, ...prevTodos]);
        window.location.reload();
        return;
    };

    // handle deleting task
    const handleDeleteTodo = async (taskId: string) => {
        await deleteTodo(taskId);
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== taskId));
        return;
    };

    // Toggle todo status between completed and in-progress
    const handleStatusChangeTodo = async (taskId: string, status: string) => {
        const newStatus = status === "completed" ? "in-progress" : "completed";
        
        try {
            await updateTodo(taskId, newStatus);
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === taskId ? { ...todo, status: newStatus } : todo
                )
            );
        } catch (error) {
            console.error('Failed to update todo status:', error);
            // Optionally show an error toast to the user
            // toast.error('Failed to update todo status');
        }
    };

    return (
        <section>
            <header className="mb-8">
                <h1 className="text-3xl font-semibold">Todo List</h1>
            </header>
            <main className="rounded-2xl border p-6">
                <div className="flex flex-col items-center gap-2 md:flex-row">
                    <div className="flex w-full items-center gap-2">
                        <Input
                            ref={taskRef}
                            placeholder="Add Task"
                            type="text"
                        />
                        <Button
                            variant="outline"
                            onClick={() =>
                                handleAddTodo(taskRef.current?.value || "")
                            }
                        >
                            <Plus />
                        </Button>
                    </div>
                    <Select
                        value={status}
                        onValueChange={(value) => setStatus(value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-progress">
                                In Progress
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="mt-6 space-y-4">
                    {filteredTodos.length > 0 ? (
                        filteredTodos.map((todo: Task) => (
                            <Todo
                                key={todo.id}
                                todo={todo}
                                onDelete={handleDeleteTodo}
                                onStatusChange={handleStatusChangeTodo}
                            />
                        ))
                    ) : (
                        <p className="p-lead my-20 text-center">No Tasks</p>
                    )}
                </div>
            </main>
        </section>
    );
};

export default TodoList;
