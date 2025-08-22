"use client";

import { useState, useEffect, useMemo } from "react";

// Build a useLocalStorage hook that respects SSR
export const useLocalStorage = (key: string, initialValue: any) => {
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Error reading from localStorage:", error);
            return initialValue;
        }
    });

    const setValue = useMemo(() => {
        if (typeof window === "undefined") {
            return () => {};
        }
        return (value: any) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                setStoredValue(value);
            } catch (error) {
                console.error("Error writing to localStorage:", error);
            }
        };
    }, [key]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const listener = (event: StorageEvent) => {
                if (event.key === key) {
                    setStoredValue(JSON.parse(event.newValue || ""));
                }
            };
            window.addEventListener("storage", listener);
            return () => window.removeEventListener("storage", listener);
        }
    }, [key]);

    return [storedValue, setValue];
};
