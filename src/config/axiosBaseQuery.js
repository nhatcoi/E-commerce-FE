import axiosInstance from './api';

// Cache for storing responses
const cache = new Map();

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

const axiosBaseQuery = ({
    baseUrl = '',
    prepareHeaders = () => ({}),
    cache: { ttl = 0, methods = ['GET'] } = {}
} = {}) => {
    return async ({ url, method, data, params }) => {
        try {
            // Clean up empty params
            const cleanParams = removeEmptyParams(params);
            const cleanData = removeEmptyParams(data);

            // Generate cache key for cacheable requests
            const shouldCache = ttl > 0 && methods.includes(method?.toUpperCase());
            const cacheKey = shouldCache ? 
                `${method}-${url}-${JSON.stringify(cleanParams)}-${JSON.stringify(cleanData)}` : 
                null;

            // Check cache first
            if (shouldCache && cache.has(cacheKey)) {
                const { data: cachedData, expiry } = cache.get(cacheKey);
                if (expiry > Date.now()) {
                    return { data: cachedData };
                }
                cache.delete(cacheKey); // Remove expired cache
            }

            const result = await axiosInstance({
                url: baseUrl + url,
                method,
                data: cleanData,
                params: cleanParams,
                headers: prepareHeaders(),
            });

            // Cache the response if needed
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
