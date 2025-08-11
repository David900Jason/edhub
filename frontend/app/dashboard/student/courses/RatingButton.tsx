"use client";

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RatingButton = ({ id }: { id: string }) => {
    const router = useRouter();
    const [rating, setRating] = useState<string>("");

    const sendRatingById = async (id: string, rating: string) => {
        try {
            await fetch(`/api/ratings/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    rating: rating,
                    enrollmentId: id,
                }),
            });
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Link className="text-blue-500" href="#">
                    Add rating
                </Link>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Rating</DialogTitle>
                    <DialogDescription>
                        Add a rating for this course
                    </DialogDescription>
                    <Label>Rating</Label>
                    <Input
                        type="number"
                        min={1}
                        max={5}
                        step={0.1}
                        onChange={(e) => setRating(e.target.value)}
                    />
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            onClick={() => sendRatingById(id, rating)}
                            className="btn-primary"
                        >
                            Submit
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default RatingButton;
