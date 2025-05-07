import axiosInstance from './api';

const cache = new Map();

const removeEmptyParams = (obj) => {
    if (!obj) return obj;
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
            acc[key] = value;
        }
        return acc;
    }, {});
};

const axiosBaseQuery = ({
    baseUrl = '',
    prepareHeaders = () => ({}),
    cache: { ttl = 0, methods = ['GET'] } = {}
} = {}) => {
    return async ({ url, method, data, params }) => {
        try {
            const cleanParams = removeEmptyParams(params);
            const cleanData = removeEmptyParams(data);

            const shouldCache = ttl > 0 && methods.includes(method?.toUpperCase());
            const cacheKey = shouldCache ? 
                `${method}-${url}-${JSON.stringify(cleanParams)}-${JSON.stringify(cleanData)}` : 
                null;

            if (shouldCache && cache.has(cacheKey)) {
                const { data: cachedData, expiry } = cache.get(cacheKey);
                if (expiry > Date.now()) {
                    return { data: cachedData };
                }
                cache.delete(cacheKey);
            }

            const result = await axiosInstance({
                url: baseUrl + url,
                method,
                data: cleanData,
                params: cleanParams,
                headers: prepareHeaders(),
            });

            if (shouldCache) {
                cache.set(cacheKey, {
                    data: result.data,
                    expiry: Date.now() + ttl
                });
            }

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
};

export default axiosBaseQuery;
