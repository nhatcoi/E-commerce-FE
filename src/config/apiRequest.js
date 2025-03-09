import api from "src/config/api.js";

const apiRequest = async (method, url, data = null, params = {}) => {
    try {
        let response;
        if (method === "get") {
            response = await api.get(url, { params });
        } else if (method === "post") {
            response = await api.post(url, data);
        } else if (method === "put") {
            response = await api.put(url, data);
        } else if (method === "delete") {
            response = await api.delete(url);
        } else {
            throw new Error(`Phương thức HTTP không hợp lệ: ${method}`);
        }

        return response.data;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${method.toUpperCase()} ${url}:`, error);
        throw error;
    }
};

export default apiRequest;
