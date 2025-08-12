// Prepare API Interface with axios
import axios from "axios";

// Base URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Axios Instance
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Axios Interceptors
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        throw error;
    },
);

export default api;
