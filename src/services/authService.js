import { authApi } from "src/api/authApi";
import {logout, refreshTokenAsync, setAccessToken, fetchUserInfoAsync} from "src/store/slices/authSlice";
import store from "src/store/index.js";

export const authService = {
    async login(userIdentifier, password) {
        try {
            const response = await authApi.login(userIdentifier, password);
            const accessToken = response.data.data.accessToken;
            
            // Save token to store
            store.dispatch(setAccessToken(accessToken));
            
            // Save token to localStorage for persistence
            localStorage.setItem("accessToken", accessToken);
            
            return response;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    },

    async refreshToken() {
        try {
            const response = await authApi.refreshToken();
            const accessToken = response.data.accessToken;
            
            store.dispatch(setAccessToken(accessToken));
            localStorage.setItem("accessToken", accessToken);
            
            return response;
        } catch (error) {
            if (error.response?.status === 401) {
                store.dispatch(logout());
                localStorage.removeItem("accessToken");
            }
            throw error;
        }
    },

    async logout() {
        try {
            await authApi.logout();
            store.dispatch(logout());
            localStorage.removeItem("accessToken");
        } catch (error) {
            console.error("Logout error:", error);
            // Even if the API fails, clear the local state
            store.dispatch(logout());
            localStorage.removeItem("accessToken");
            throw error;
        }
    },
    
    // Check if user is authenticated on app startup
    checkAuth() {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            store.dispatch(setAccessToken(accessToken));
            return true;
        }
        return false;
    },

    // New restoreSession function
    async restoreSession(dispatch) {
        try {
            // 1. Check for access token in localStorage
            const accessToken = localStorage.getItem("accessToken");
            
            if (accessToken) {
                // 2. Set the token in Redux store
                dispatch(setAccessToken(accessToken));
                
                try {
                    // 3. Try to fetch user info with existing token
                    await dispatch(fetchUserInfoAsync()).unwrap();
                    return true;
                } catch (error) {
                    // If fetching user info fails, try to refresh the token
                    try {
                        // 4. Attempt to refresh the token
                        await dispatch(refreshTokenAsync()).unwrap();
                        
                        // 5. After successful refresh, fetch user info again
                        await dispatch(fetchUserInfoAsync()).unwrap();
                        return true;
                    } catch (refreshError) {
                        // If refresh fails, clear the session
                        this.clearSession();
                        return false;
                    }
                }
            } else {
                // No access token found, try to refresh
                try {
                    await dispatch(refreshTokenAsync()).unwrap();
                    await dispatch(fetchUserInfoAsync()).unwrap();
                    return true;
                } catch (error) {
                    return false;
                }
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
        localStorage.removeItem("accessToken");
    }
};
