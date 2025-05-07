import axios from "axios";
import store from "src/store/index.js";
import { logout } from "src/store/slices/user/authSlice.js";
import { tokenRefreshQueue } from "src/services/tokenRefreshQueue.js";


import { authApi } from "src/store/authApi";
import {setAccessToken} from "src/store/auth2slice.js";
import {setAccessToken as setAccessToken2} from "src/store/slices/user/authSlice.js";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});


api.interceptors.request.use(
    (config) => {
        // Get the current state directly for each request
        const state = store.getState();
        const accessToken = state.auth2?.accessToken;

        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
            console.log("API request using token:", config.url);
        } else {
            console.log("API request without token:", config.url);
        }
        return config;
    },
    (error) => Promise.reject(error)
);


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status !== 401 ||
            originalRequest._retry ||
            originalRequest.url.includes('auth/log-out') ||
            originalRequest.url.includes('auth/refresh-token')
        ) {
            return Promise.reject(error);
        }

        console.log("Attempting token refresh for:", originalRequest.url);
        originalRequest._retry = true;

        try {
            if (tokenRefreshQueue.isRefreshing()) {
                return tokenRefreshQueue.addToQueue()
                    .then(() => {
                        const { accessToken } = store.getState().auth2;
                        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                        return api(originalRequest);
                    })
                    .catch(() => Promise.reject(error));
            }

            const result = await store
                .dispatch(authApi.endpoints.refreshToken.initiate())
                .unwrap();

            const { accessToken } = result.data;
            console.log("Token refreshed successfully");
            
            // Update both auth states
            store.dispatch(setAccessToken(accessToken));
            store.dispatch(setAccessToken2(accessToken));
            
            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            return api(originalRequest);
        } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            store.dispatch(logout());
            return Promise.reject(error);
        }
    }
);

export default api;