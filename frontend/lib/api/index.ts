// Prepare API Interface with axios
import axios from "axios";
import { logoutUser, refreshUser } from "./auth";
import { toast } from "sonner";

// Base URL
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Axios Instance
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("access");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            error.response.data.detail === "Token is invalid"
        ) {
            toast.error("Your Login Session expired");
            logoutUser();
            return;
        }

        if (error.response?.status === 401) {
            toast.error("401: Failed to fetch data");
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const newToken = await refreshUser(); // wait for new token
            if (newToken) {
                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                return api(originalRequest); // ✅ retry and resolve promise
            }
        }

        return Promise.reject(error);
    },
);

export default api;
