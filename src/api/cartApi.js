import api from "src/config/api.js";

export const cartApi = {
    addToCart: (cartRequest) => api.post("/cart/add",  cartRequest),
    fetchCartItems: () => api.get("/cart/items"),
    updateCartQuantity: (id, quantity) => api.put(`/cart/update/${id}`, { quantity }),
    removeFromCart: (id) => api.delete(`/cart/remove/${id}`),
    clearCart: () => api.delete(`/cart/clear`),
};
