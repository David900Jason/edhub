import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Return a random value out of an array length
export function getRandomValue(length: number): number {
    return Math.floor(Math.random() * length);
}