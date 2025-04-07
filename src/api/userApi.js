import api from "src/config/api.js";

export const userApi = {
    getMyInfo: () => api.get("/users/my-info"),
    updateProfile: (userData) => api.put("/users/update-profile", userData),
    updatePassword: (password) => api.put("/users/update-password", password)
};