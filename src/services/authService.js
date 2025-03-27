import { authApi } from "src/api/authApi.js";
import { logout, refreshTokenAsync, setAccessToken, fetchUserInfoAsync } from "src/store/slices/authSlice.js";
import store from "src/store/index.js";
import { tokenRefreshQueue } from "./tokenRefreshQueue.js";

export const authService = {
    async login(userIdentifier, password) {
        try {
            const response = await authApi.login(userIdentifier, password);
            const accessToken = response.data.data.accessToken;
            
            // Save token to Redux store only
            store.dispatch(setAccessToken(accessToken));
            
            // Fetch user info after successful login
            await store.dispatch(fetchUserInfoAsync()).unwrap();
            
            return response;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    },

    async refreshToken() {
        // If already refreshing, add to queue
        if (tokenRefreshQueue.isRefreshing()) {
            return tokenRefreshQueue.addToQueue();
        }

        try {
            tokenRefreshQueue.setRefreshing(true);
            const response = await authApi.refreshToken();
            const accessToken = response.data.data.accessToken;
            
            // Update token in Redux store only
            store.dispatch(setAccessToken(accessToken));
            
            tokenRefreshQueue.setRefreshing(false);
            return response;
        } catch (error) {
            tokenRefreshQueue.setRefreshing(false);
            if (error.response?.status === 401) {
                this.clearSession();
                tokenRefreshQueue.processQueue(error);
            }
            throw error;
        }
    },

    async logout() {
        try {
            await authApi.logout();
            this.clearSession();
        } catch (error) {
            console.error("Logout error:", error);
            // Even if the API fails, clear the local state
            this.clearSession();
            throw error;
        }
    },
    
    // Check if user is authenticated on app startup
    checkAuth() {
        const { accessToken } = store.getState().auth;
        return !!accessToken;
    },

    // Enhanced restoreSession function
    async restoreSession(dispatch) {
        try {
            // Try to refresh token on app init
            try {
                // Attempt to refresh the token
                await dispatch(refreshTokenAsync()).unwrap();
                
                // After successful refresh, fetch user info
                await dispatch(fetchUserInfoAsync()).unwrap();
                return true;
            } catch (refreshError) {
                // If refresh fails, clear the session
                this.clearSession();
                return false;
            }
        } catch (error) {
            console.error("Session restoration failed:", error);
            this.clearSession();
            return false;
        }
    },

    // Helper function to clear session
    clearSession() {
        store.dispatch(logout());
        tokenRefreshQueue.processQueue(new Error("Session cleared"));
    }
};
