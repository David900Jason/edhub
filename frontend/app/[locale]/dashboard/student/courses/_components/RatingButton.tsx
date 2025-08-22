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
import { Link } from "@/i18n/routing";
import { useRouter } from "@/i18n/routing";
import { useState } from "react";
import { toast } from "sonner";

const RatingButton = ({ id }: { id: string }) => {
    const router = useRouter();
    const [rating, setRating] = useState<string>("");

    const sendRatingById = async (id: string, rating: string) => {
        if (rating === "") {
            toast("Rating can't be empty", {
                duration: 5000,
                style: {
                    background: "#333",
                    color: "#fff",
                },
            });
            return;
        }

        if (Number(rating) < 1 || Number(rating) > 5) {
            toast("Rating must be between 1 and 5", {
                duration: 5000,
                style: {
                    background: "#333",
                    color: "#fff",
                },
            });
            return;
        }

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
            toast("Something went wrong", {
                duration: 5000,
                style: {
                    background: "#333",
                    color: "#fff",
                },
            });
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
