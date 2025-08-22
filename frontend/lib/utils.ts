import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Return a random value out of an array length
export function getRandomValue(length: number): number {
    return Math.floor(Math.random() * length);
}

// Generate a time 00:00 string
export function generateTime(time: number): string {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
}

// Convert School Year to string
export function convertSchoolYear(schoolYear: string): string {
    switch (schoolYear) {
        case "1":
            return "Grade 10";
        case "2":
            return "Grade 11";
        case "3":
            return "Grade 12";
        default:
            return "";
    }
}

// Generate random unique id [numbers and letters] from length
export function generateId(length: number): string {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
        );
    }
    return result;
}

/**
 * Formats time in seconds to HH:MM:SS or MM:SS format
 * @param totalSeconds - Total seconds to format
 * @returns Formatted time string
 */
export function formatTime(seconds: number) {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
}

export function startCountdown(minutes: number, onTick: (time: string) => void, onComplete?: () => void) {
    let totalSeconds = minutes * 60;

    function formatTime(seconds: number) {
        const m = String(Math.floor(seconds / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        return `${m}:${s}`;
    }

    // Send initial time immediately
    onTick(formatTime(totalSeconds));

    const interval = setInterval(() => {
        totalSeconds--;

        if (totalSeconds <= 0) {
            clearInterval(interval);
            onTick("00:00");
            if (onComplete) onComplete();
            return;
        }

        onTick(formatTime(totalSeconds));
    }, 1000);

    // Return a function to stop the timer manually
    return () => clearInterval(interval);
}