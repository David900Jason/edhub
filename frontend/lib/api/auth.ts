// API Utilities for Frontend
import api from ".";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { redirect } from "@/i18n/routing";

export const signUpUser = async (data: SignupFormType) => {
    try {
        const res = await api.post("/auth/signup/", data);
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            // Loop over errors data object of diff keys
            Object.keys(error.response?.data).forEach((key) => {
                error.response?.data[key].forEach((err: string) => {
                    toast.error(err);
                });
            });
        }
        console.error(error);
        return null;
    }
};

export const loginUser = async (data: { email: string; password: string }) => {
    try {
        const res = await api.post("/auth/login/", data);
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            error.response?.data?.non_field_errors?.map((err: string) => {
                toast.error(err);
            });
        }
        return;
    }
};

export const logoutUser = async () => {
    sessionStorage.removeItem("access");
    sessionStorage.removeItem("refresh");
    sessionStorage.removeItem("user_profile");
    redirect({ href: "/auth/logout", locale: "en" });
};

export const contactUser = async (data: ContactFormData) => {
    try {
        const res = await api.post("/contact/", data);
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getMessages = async () => {
    try {
        const res = await api.get("/contact/");
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const refreshUser = async () => {
    const refresh = sessionStorage.getItem("refresh");
    if (!refresh) return;

    try {
        const res = await api.post("/auth/refresh/", {
            refresh: refresh,
        });
        const data = await res.data;
        if (data?.access) {
            sessionStorage.setItem("access", data.access);
        }
        return data?.access;
    } catch (error: unknown) {
        console.error(error);
        return;
    }
};
