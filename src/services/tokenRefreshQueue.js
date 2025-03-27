let isRefreshing = false;
let failedQueue = [];

const processQueue = (error = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQueue = [];
};

export const tokenRefreshQueue = {
    addToQueue: (promise) => {
        return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
        });
    },

    isRefreshing: () => isRefreshing,

    setRefreshing: (value) => {
        isRefreshing = value;
        if (!value) {
            processQueue();
        }
    },

    processQueue: (error) => {
        processQueue(error);
    }
}; 