import axios from "axios";
import store from "src/store";
import { refreshTokenAsync, logout } from "src/store/slices/authSlice";

const api = axios.create({
    baseURL: "http://localhost:8085",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// Add accessToken to header for each request
api.interceptors.request.use(
    (config) => {
        const { accessToken } = store.getState().auth;
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle 401 - Auto refresh token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await store.dispatch(refreshTokenAsync()).unwrap();
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (_) { // Fixed the unused variable warning
                store.dispatch(logout());
            }
        }
        return Promise.reject(error);
    }
);

export default api;