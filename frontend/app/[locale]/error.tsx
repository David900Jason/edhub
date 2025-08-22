"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <AlertCircle size={64} className="text-red-500 mb-5" />
            <h1 className="text-3xl font-bold text-red-500 mb-5">
                Error Occured
            </h1>
            <p className="text-lg max-w-[65ch] text-center">
                {error.message}
            </p>
            <Button
                variant="destructive"
                onClick={() => reset()}
                className="mt-6 text-white"
            >
                Try again
            </Button>
        </div>
    );
};

export default Error;
