"use client";

import { Suspense } from "react";
import VerifyForm from "./VerifyForm";

const VerifyAccountPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
            <Suspense fallback={<div>Loading...</div>}>
                <VerifyForm />
            </Suspense>
        </div>
    );
};

export default VerifyAccountPage;
