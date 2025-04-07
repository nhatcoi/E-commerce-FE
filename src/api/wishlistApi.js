import api from "src/config/api.js";

export const wishlistApi = {
  getAll: () => api.get("/user/wishlist"),
  add: (productId) => api.post("/user/wishlist", { productId }),
  remove: (productId) => api.delete(`/user/wishlist/${productId}`),
  check: (productId) => api.get(`/user/wishlist/check/${productId}`),
};

export default wishlistApi; 