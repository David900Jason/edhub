// API Utilities for Frontend
import axios from "axios";

// Setup the api interface
const api = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
