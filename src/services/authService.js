import { authApi } from "src/api/authApi.js";
import { authApi as authApi2 } from "src/store/authApi.js";
// import { logout, refreshTokenAsync, setAccessToken, fetchUserInfoAsync } from "src/store/slices/user/authSlice.js";
import store from "src/store/index.js";
import { tokenRefreshQueue } from "./tokenRefreshQueue.js";
import {setLogout, setAccessToken, setCredentials} from "src/store/auth2Slice";

export const authService = {
    async login(userIdentifier, password) {
        try {
            const response = await authApi.login(userIdentifier, password);
            const accessToken = response.data.data.accessToken;
            
            // Save token to Redux store only
            store.dispatch(setAccessToken(accessToken));
            
            // Fetch user info after successful login

            
            return response.data.data;
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

    async restoreSession(dispatch) {
        try {
            const tokenRes = await dispatch(authApi2.endpoints.refreshToken.initiate()).unwrap();
            const userInfoRes = await dispatch(authApi2.endpoints.getMyInfo.initiate()).unwrap();

            dispatch(setCredentials({
                accessToken: tokenRes.data.accessToken,
                user: userInfoRes.data
            }));
            return true;
        } catch (error) {
            this.clearSession();
            return false;
        }
    },

    clearSession() {
        store.dispatch(setLogout());
        tokenRefreshQueue.processQueue(new Error("Session cleared"));
    }
};
