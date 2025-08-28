"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Tag from "@/components/ui/Tag";
import { createTodo, deleteTodo, updateTodo } from "@/lib/api/todo";
import { Check, Plus, Trash } from "lucide-react";
import { useRef } from "react";
import { format } from "timeago.js";

const statusMap: { [key: string]: string } = {
    completed: "green",
    pending: "blue",
    "in-progress": "yellow",
};

const TasksList = ({ todos }: { todos: Task[] }) => {
    const taskRef = useRef<HTMLInputElement | null>(null);

    // handle adding new task
    const handleAddTodo = async (task: string) => {
        createTodo({ task, status: "pending" });
        window.location.reload();
        return;
    };

    // handle deleting task
    const handleDeleteTodo = async (taskId: string) => {
        deleteTodo(taskId);
        window.location.reload();
        return;
    };

    // handle state change
    const handleStatusChangeTodo = async (taskId: string, status: string) => {
        updateTodo(
            taskId,
            status === "completed" ? "in-progress" : "completed",
        );
        window.location.reload();
        return;
    };

    return (
        <>
            <div className="flex items-center gap-2">
                <Input ref={taskRef} placeholder="Add Task" type="text" />
                <Button
                    variant="outline"
                    onClick={() =>
                        handleAddTodo(taskRef.current?.value as string)
                    }
                >
                    <Plus /> Create new Task
                </Button>
            </div>
            <div className="mt-6">
                {todos.length > 0 ? (
                    todos.map(
                        ({ id, task, status, created_at }: Task, index) => (
                            <div
                                key={index}
                                className={
                                    "mb-2 flex flex-col justify-between rounded-lg border p-4 sm:flex-row sm:items-center"
                                }
                            >
                                <div className="flex items-start gap-2 sm:items-center">
                                    <div
                                        onClick={() =>
                                            handleStatusChangeTodo(id, status)
                                        }
                                        className={
                                            "checkbox cursor-pointer " +
                                            ( status === "completed" && "!bg-green-200" )
                                        }
                                    >
                                        {status === "completed" && (
                                            <Check className="h-4 w-4 text-green-500" />
                                        )}
                                    </div>
                                    <h3
                                        onClick={() =>
                                            handleStatusChangeTodo(id, status)
                                        }
                                        className="cursor-pointer text-lg"
                                    >
                                        {task}
                                    </h3>
                                    <Tag color={statusMap[status]}>
                                        {status}
                                    </Tag>
                                </div>
                                <div className="flex items-center gap-3">
                                    <p className="p-lead text-sm">
                                        {format(created_at)}
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={() => handleDeleteTodo(id)}
                                    >
                                        <Trash className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            </div>
                        ),
                    )
                ) : (
                    <p className="p-lead my-20 text-center">No Tasks</p>
                )}
            </div>
        </>
    );
};

export default TasksList;
