import axios from "axios";
import store from "src/store";
import { refreshTokenAsync, logout, setAccessToken } from "src/store/slices/authSlice";
import { tokenRefreshQueue } from "src/services/tokenRefreshQueue";

const api = axios.create({
    baseURL: "http://localhost:8085",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Important for CORS with credentials
});

// Add accessToken to header for each request
api.interceptors.request.use(
    (config) => {
        // Get token from Redux store
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

        // If the error is not 401 or the request has already been retried, reject
        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            // If already refreshing, add to queue
            if (tokenRefreshQueue.isRefreshing()) {
                return tokenRefreshQueue.addToQueue()
                    .then(() => {
                        // After token is refreshed, get token from store
                        const { accessToken } = store.getState().auth;
                        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                        return api(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            // Attempt to refresh the token
            const newAccessToken = await store.dispatch(refreshTokenAsync()).unwrap();
            
            // Update the original request with the new token
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            
            // Retry the original request
            return api(originalRequest);
        } catch (refreshError) {
            // If refresh fails, clear the session and reject
            store.dispatch(logout());
            return Promise.reject(refreshError);
        }
    }
);

export default api;