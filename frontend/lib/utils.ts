import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]) {
    const result = { ...obj };
    keys.forEach((key) => delete result[key]);
    return result;
}

export function parseDateOnly(dateStr: string) {
    return dateStr.split("T")[0];
}