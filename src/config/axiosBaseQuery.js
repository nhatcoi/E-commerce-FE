import axiosInstance from './api';

// Cache for storing responses
const cache = new Map();

const axiosBaseQuery = ({
    baseUrl = '',
    prepareHeaders = () => ({}),
    cache: { ttl = 0, methods = ['GET'] } = {}
} = {}) => {
    return async ({ url, method, data, params }) => {
        try {
            // Generate cache key for cacheable requests
            const shouldCache = ttl > 0 && methods.includes(method?.toUpperCase());
            const cacheKey = shouldCache ? 
                `${method}-${url}-${JSON.stringify(params)}-${JSON.stringify(data)}` : 
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
                data,
                params,
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
