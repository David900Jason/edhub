"use client";

import { Button } from "@/components/ui/button";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
    return (
        <div className="error">
            <p className="text-red-500">{error.message}</p>
            <Button onClick={() => reset()}>Try again</Button>
        </div>
    );
};

export default Error;
