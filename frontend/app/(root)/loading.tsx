"use client";

import React from "react";

const Loading = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="space-y-4 text-center">
                <div className="border-primary mx-auto h-16 w-16 animate-spin rounded-full border-4 border-t-transparent"></div>
                <p className="text-lg font-medium text-gray-600">Loading...</p>
            </div>
        </div>
    );
};

export default Loading;
