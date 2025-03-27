import api from "src/config/api.js";

export const cartApi = {
    addToCart: (userId, productData) => api.post("/cart/add", { userId, productData }),
    fetchCartItems: (userId) => api.get(`/cart/${userId}`),
    updateCartQuantity: (id, quantity) => api.put(`/cart/update/${id}`, { quantity }),
    removeFromCart: (id) => api.delete(`/cart/remove/${id}`),
    clearCart: () => api.delete(`/cart/clear`),
};
