import api from "src/config/api";

export const authApi = {
    login: (userIdentifier, password) => api.post("/auth/log-in", { userIdentifier, password }),
    logout: () => api.post("/auth/log-out"),
    refreshToken: () => api.post("/auth/refresh-token"),
    register: (userData) => api.post("/auth/register", userData),
}