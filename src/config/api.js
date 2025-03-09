import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8085",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add interceptors for auth tokens, error handling, etc.
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;