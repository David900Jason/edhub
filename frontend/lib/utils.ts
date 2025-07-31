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

// Timer function