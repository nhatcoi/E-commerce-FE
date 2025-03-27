import { userApi } from "src/api/userApi";
import { setUser } from "src/store/slices/authSlice";
import store from "src/store/index.js";

export const userService = {
    async getMyInfo() {
        const response = await userApi.getMyInfo();
        console.log("user", response.data);
        return response.data;
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
    }
};
