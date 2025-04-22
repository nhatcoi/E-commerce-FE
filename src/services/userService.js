import { userApi } from "src/api/userApi.js";
import { setUser } from "src/store/slices/user/authSlice.js";
import store from "src/store/index.js";
import axios from "axios";

export const userService = {
    async getMyInfo() {
        const response = await userApi.getMyInfo();
        console.log("user", response.data);
        return response.data.data;
    },
    
    async fetchAndUpdateUserProfile() {
        try {
            const response = await userApi.getMyInfo();
            if (response.data && response.data.data) {
                store.dispatch(setUser(response.data.data));
                return response.data.data;
            }
            return null;
        } catch (error) {
            console.error("Error fetching user profile:", error);
            return null;
        }
    },
    
    async updateProfile(userData) {
        const response = await userApi.updateProfile(userData);
        return response.data;
    },

    async updatePassword(password) {
        const response = await userApi.updatePassword(password);
        return response.data;
    }
};
