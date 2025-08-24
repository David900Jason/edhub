"use client";

import axios from "axios";
import Tag from "@/components/ui/Tag";
import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Check, Plus, Trash } from "lucide-react";
import { cn, generateId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "timeago.js";

interface Task {
    id: string;
    title: string;
    status: string;
    created_at: string;
}

const TasksList = ({ tasks, tasksId }: { tasks: Task[]; tasksId: string }) => {
    const router = useRouter();
    const t = useTranslations("STUDENT_DASHBOARD.TODO_LIST");
    const [newTask, setNewTask] = useState({
        title: "",
        status: "pending",
    });

    // handle adding new task
    const handleAddTask = async () => {
        if (!newTask.title.trim()) return; // Prevent adding empty tasks
        try {
            await axios.patch(`http://localhost:8001/tasks/${tasksId}`, {
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
            // await axios.delete(`http://localhost:8001/tasks/${tasksId}/${taskId}`);
            const updatedTasks = tasks.filter((task) => task.id !== taskId);
            await axios.patch(`http://localhost:8001/tasks/${tasksId}`, {
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
            await axios.patch(`http://localhost:8001/tasks/${tasksId}`, {
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
                    placeholder={t("add_task_placeholder")}
                    value={newTask.title}
                    onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                    }
                />
                <Button variant="outline" onClick={handleAddTask}>
                    <Plus /> {t("cta1")}
                </Button>
            </div>
            <div className="mt-6">
                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <div
                            key={index}
                            className="mb-2 flex flex-col justify-between rounded-lg border p-4 sm:flex-row sm:items-center"
                        >
                            <div className="flex items-start gap-2 sm:items-center">
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
                                            ? "text-gray-500 line-through"
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
                    ))
                ) : (
                    <p className="p-lead my-20 text-center">{t("no_tasks")}</p>
                )}
            </div>
        </>
    );
};

export default TasksList;
