// API Utilities for Frontend
import api from ".";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const signUpUser = async (data: SignupFormType) => {
    try {
        const res = await api.post("/auth/signup/", data);
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            toast.error(error.response?.data?.non_field_errors[0]);
        }
        return null;
    }
};

export const loginUser = async (data: { email: string; password: string }) => {
    try {
        const res = await api.post("/auth/login/", data);
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            error.response?.data?.non_field_error?.map((err: string) => {
                toast.error(err);
            });
        }
        return;
    }
};

export const logoutUser = async () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user_profile");
};

export const refreshUser = async () => {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) return;

    try {
        const res = await api.post("/auth/refresh/", {
            refresh: refresh,
        });
        const data = await res.data;
        if (data?.access) {
            localStorage.setItem("access", data.access);
        }
        return data?.access;
    } catch (error) {
        console.error(error);
        return;
    }
};
