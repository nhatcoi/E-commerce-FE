import api from "src/config/api.js";

export const orderApi = {
    createOrder: (orderRequest) => api.post("/orders/create-order", orderRequest),
    getOrderById: (id) => api.get(`/orders/${id}`),
    getOrders: (params) => api.get("/orders", { params }),
    cancelOrder: (id) => api.put(`/orders/${id}/cancel`)
};