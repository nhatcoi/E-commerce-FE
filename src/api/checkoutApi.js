import api from "src/config/api.js";

export const checkoutApi = {
    createCheckout: (checkoutRequest) => api.post("/checkout/checkout-list", checkoutRequest),
    getPaymentStatus: (orderId) => api.get(`/orders/payment-status/${orderId}`)
}