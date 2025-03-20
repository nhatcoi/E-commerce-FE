import { useState, useEffect, useCallback } from 'React';
import api from '../config/api.js';
import { Alerts } from '../utils/utils.js';

/**
 * Custom hook for handling API requests with loading and error states
 * @param {string} url - Initial endpoint URL (optional)
 * @param {object} options - Initial request options (optional)
 * @returns {object} - { data, loading, error, fetchData }
 */

const useFetch = (url = null, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (endpoint = url, requestOptions = options) => {
        if (!endpoint) return;

        try {
            setLoading(true);
            setError(null);

            const response = await api(endpoint, requestOptions);
            const result = response.data;

            setData(result.data || result);
            return result;
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message;
            setError(errorMessage);
            Alerts.handleError('Error', errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [url, options]);

    useEffect(() => {
        if (url) {
            fetchData().then(r => console.log(r));
        }
    }, [url, fetchData]);

    return { data, loading, error, fetchData };
};

export default useFetch;