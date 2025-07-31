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
export function convertSchoolYear(schoolYear: number): string {
    switch (schoolYear) {
        case 1:
            return "Grade 10";
        case 2:
            return "Grade 11";
        case 3:
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
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
