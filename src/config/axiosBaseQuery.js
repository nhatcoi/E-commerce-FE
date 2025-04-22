import axiosInstance from './api'; // file này là api.js bạn đã config

const axiosBaseQuery = () => async ({ url, method, data, params }) => {
    try {
        const result = await axiosInstance({
            url,
            method,
            data,
            params,
        });
        return { data: result.data };
    } catch (error) {
        return {
            error: {
                status: error.response?.status,
                data: error.response?.data || error.message,
            },
        };
    }
};

export default axiosBaseQuery;
