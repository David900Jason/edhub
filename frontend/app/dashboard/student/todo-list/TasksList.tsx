"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Check, Plus, Trash } from "lucide-react";
import { cn, generateId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Tag from "@/components/ui/Tag";
import { format } from "timeago.js";

interface Task {
    id: string;
    title: string;
    status: string;
    created_at: string;
}

const TasksList = ({ tasks, tasksId }: { tasks: Task[]; tasksId: string }) => {
    const router = useRouter();
    const [newTask, setNewTask] = useState({
        title: "",
        status: "pending",
    });

    // handle adding new task
    const handleAddTask = async () => {
        if (!newTask.title.trim()) return; // Prevent adding empty tasks
        try {
            await axios.patch(`http://localhost:8000/tasks/${tasksId}`, {
                tasks: [
                    ...tasks,
                    {
                        id: generateId(4),
                        title: newTask.title,
                        status: newTask.status,
                    },
                ],
            });

            // Reset New Task
            setNewTask({
                title: "",
                status: "pending",
            });
            router.refresh();
        } catch (error) {
            console.error("Failed to add task:", error);
        }
    };

    // handle deleting task
    const handleDeleteTask = async (taskId: string) => {
        try {
            // await axios.delete(`http://localhost:8000/tasks/${tasksId}/${taskId}`);
            const updatedTasks = tasks.filter((task) => task.id !== taskId);
            await axios.patch(`http://localhost:8000/tasks/${tasksId}`, {
                tasks: [...updatedTasks],
            });
            router.refresh();
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    };

    // handle state change
    const handleStateChange = async (taskId: string) => {
        try {
            // Toggle Completed state
            const updatedTasks = tasks.map((task) =>
                task.id === taskId
                    ? {
                          ...task,
                          status:
                              task.status === "Completed"
                                  ? "Pending"
                                  : "Completed",
                      }
                    : task,
            );
            await axios.patch(`http://localhost:8000/tasks/${tasksId}`, {
                tasks: [...updatedTasks],
            });
            router.refresh();
        } catch (error) {
            console.error("Failed to update task state:", error);
        }
    };

    return (
        <>
            <div className="flex items-center gap-2">
                <Input
                    placeholder="Add new task"
                    value={newTask.title}
                    onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                    }
                />
                <Button variant="outline" onClick={handleAddTask}>
                    <Plus /> Create task
                </Button>
            </div>
            <div className="mt-6">
                {tasks.length > 0 ? tasks.map((task, index) => (
                    <div
                        key={index}
                        className="mb-2 flex items-center justify-between rounded-lg border p-4"
                    >
                        <div className="flex items-center gap-2">
                            <div
                                onClick={() => handleStateChange(task.id)}
                                className={cn(
                                    "checkbox cursor-pointer",
                                    task.status === "Completed" &&
                                        "!bg-green-300",
                                )}
                            >
                                {task.status === "Completed" && (
                                    <Check className="h-4 w-4" />
                                )}
                            </div>
                            <h3
                                onClick={() => handleStateChange(task.id)}
                                className={`cursor-pointer text-lg ${
                                    task.status === "Completed"
                                        ? "line-through text-gray-500"
                                        : ""
                                }`}
                            >
                                {task.title}
                            </h3>
                            <Tag
                                color={
                                    task.status === "Completed"
                                        ? "green"
                                        : task.status === "Pending"
                                          ? "blue"
                                          : "red"
                                }
                            >
                                {task.status}
                            </Tag>
                        </div>
                        <div className="flex items-center gap-3">
                            <p className="p-lead text-sm">
                                {format(task.created_at)}
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => handleDeleteTask(task.id)}
                            >
                                <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                        </div>
                    </div>
                )) : <p className="text-center p-lead my-20">No tasks found</p>}
            </div>
        </>
    );
};

export default TasksList;
