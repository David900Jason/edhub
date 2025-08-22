// Prepare API Interface with axios
import axios from "axios";

// Base URL
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Axios Instance
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
