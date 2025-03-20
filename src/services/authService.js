import { authApi } from "src/api/authApi";
import { logout, setAccessToken } from "src/store/slices/authSlice";
import store from "src/store/index.js";

export const authService = {
    async login(email, password) {
        const response = await authApi.login(email, password);
        store.dispatch(setAccessToken(response.data.accessToken));
        return response.data.user;
    },

    async refreshToken() {
        try {
            const response = await authApi.refreshToken();
            store.dispatch(setAccessToken(response.data.accessToken));
            return response.data.accessToken;
        } catch (error) {
            if (error.response?.status === 401) {
                store.dispatch(logout());
            }
            return null;
        }
    },


    async logout() {
        await authApi.logout();
        store.dispatch(logout());
    }
};
