import api from "src/config/api.js";

// Helper to remove empty params
const removeEmptyParams = (obj) => {
    if (!obj) return obj;
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
            acc[key] = value;
        }
        return acc;
    }, {});
};

const apiRequest = async (method, url, data = null, params = {}) => {
    try {
        // Clean up empty values
        const cleanData = removeEmptyParams(data);
        const cleanParams = removeEmptyParams(params);

        let response;
        if (method === "get") {
            response = await api.get(url, { params: cleanParams });
        } else if (method === "post") {
            response = await api.post(url, cleanData);
        } else if (method === "put") {
            response = await api.put(url, cleanData);
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
