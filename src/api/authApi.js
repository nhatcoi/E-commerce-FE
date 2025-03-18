import api from "src/config/api";

export const authApi = {
    login: (email, password) => api.post("/login", { email, password }),
    logout: () => api.post("/logout"),
    refreshToken: () => api.post("/refresh-token"),
}