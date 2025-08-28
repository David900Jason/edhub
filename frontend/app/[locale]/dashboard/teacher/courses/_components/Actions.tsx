"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { deleteCourse } from "@/lib/api/course";

const Actions = ({ id }: { id: string }) => {
    const router = useRouter();
    const handleDelete = (id: string) => {
        deleteCourse(id);
        window.location.reload();
    }
    return (
        <div className="flex items-center gap-1">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() =>
                            router.push(
                                "/dashboard/teacher/courses/" + id + "/edit",
                            )
                        }
                        asChild
                    >
                        <span>
                            <Edit className="h-4 w-4" />
                            Edit
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-destructive hover:text-destructive/90 cursor-pointer"
                        onClick={() => handleDelete(id)}
                        asChild
                    >
                        <span>
                            <Trash2 className="text-destructive h-4 w-4" />
                            Delete
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default Actions;