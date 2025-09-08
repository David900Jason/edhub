"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { updateCourse } from "@/lib/api/course";
import { toast } from "sonner";
import { Label } from "recharts";

const EditCourseDialog = ({
    course,
    onEdit,
}: {
    course: Partial<CourseType>;
    onEdit?: (id: string, data: Partial<CourseType>) => void;
}) => {
    const [courseData, setCourseData] = useState<Partial<CourseType>>(course);

    // Handle Edit Course
    const handleEditCourse = async (id: string) => {
        try {
            const res = await updateCourse(id, courseData);
            if (res.title) {
                toast.success("Course updated successfully");
                onEdit?.(id, courseData);
            }
        } catch (error) {
            toast.error("Failed to edit course");
            console.log(error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" variant="outline">
                    <Edit />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Course</DialogTitle>
                    <DialogDescription>Edit course details</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="input-group">
                        <Label className="mb-2">Title</Label>
                        <Input
                            placeholder="Course Title"
                            value={courseData.title}
                            onChange={(e) =>
                                setCourseData({
                                    ...courseData,
                                    title: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="input-group">
                        <Label className="mb-2">Description</Label>
                        <Input
                            placeholder="Course Description"
                            value={courseData.description}
                            onChange={(e) =>
                                setCourseData({
                                    ...courseData,
                                    description: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="input-group">
                        <Label className="mb-2">Category</Label>
                        <Input
                            placeholder="Course Category"
                            value={courseData.category}
                            onChange={(e) =>
                                setCourseData({
                                    ...courseData,
                                    category: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="input-group">
                        <Label className="mb-2">Price</Label>
                        <Input
                            placeholder="Course Price"
                            value={courseData.price}
                            onChange={(e) =>
                                setCourseData({
                                    ...courseData,
                                    price: Number(e.target.value),
                                })
                            }
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" className="mr-2">
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            className="btn-primary"
                            onClick={() => handleEditCourse(course.id || "")}
                        >
                            Save changes
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditCourseDialog;
