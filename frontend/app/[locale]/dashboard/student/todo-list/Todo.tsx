"use client";

import { Button } from "@/components/ui/button";
import Tag from "@/components/ui/Tag";
import { cn } from "@/lib/utils";
import { Check, Trash } from "lucide-react";
import { format } from "timeago.js";

const statusMap: { [key: string]: string } = {
    completed: "green",
    pending: "blue",
    "in-progress": "yellow",
};

type TodoStatus = 'completed' | 'in-progress' | 'pending';

const Todo = ({
    todo,
    onDelete,
    onStatusChange,
}: {
    todo: Task;
    onDelete: (taskId: string) => void;
    onStatusChange: (taskId: string, status: string) => void;
}) => {
    const { id, task, status, created_at } = todo;
    const todoStatus = status as TodoStatus;

    return (
        <>
            <div className="flex flex-col justify-between rounded-2xl border p-4 lg:flex-row">
                <div className="flex items-center justify-between gap-2 max-md:flex-1">
                    <div className="flex items-center gap-2 max-md:flex-1">
                        <div
                            onClick={() => onStatusChange(id, todoStatus)}
                            className={cn(
                                "checkbox h-4 w-4 cursor-pointer",
                                todoStatus === "completed" && "!bg-green-200",
                            )}
                        >
                            {todoStatus === "completed" && (
                                <Check className="h-4 w-4 text-green-500" />
                            )}
                        </div>
                        <h3
                            onClick={() => onStatusChange(id, todoStatus)}
                            className={cn(
                                "cursor-pointer text-lg",
                                todoStatus === "completed" &&
                                    "text-gray-500 line-through",
                            )}
                        >
                            {task}
                        </h3>
                    </div>
                    <Tag color={statusMap[todoStatus]}>{todoStatus}</Tag>
                </div>
                <div className="flex items-center justify-end gap-3">
                    <p className="p-lead text-sm">{format(created_at)}</p>
                    <Button variant="outline" onClick={() => onDelete(id)}>
                        <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Todo;
