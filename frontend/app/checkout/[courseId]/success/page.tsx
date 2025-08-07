"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const SuccessPage = () => {
    const { courseId } = useParams();
    const router = useRouter();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <Card className="min-w-[450px] gap-0">
                <CheckCircle
                    size={100}
                    className="mx-auto mb-6 text-green-500"
                />
                <h1 className="mb-2 text-center text-3xl font-bold">
                    Payment Successful
                </h1>
                <p className="text-center text-gray-400">
                    Thank you for your purchase!
                </p>
                <Button
                    className="mt-6 w-56 mx-auto"
                    onClick={() => router.push("/courses")}
                    variant="outline"
                >
                    Go to Courses
                </Button>
            </Card>
        </main>
    );
};

export default SuccessPage;
