import apiRequest from "../config/apiRequest.js";

const productApi = {
    // Product endpoints
    getAllProducts: (params) =>
        apiRequest("get", "/products", null, params),

    getProductById: (id) =>
        apiRequest("get", `/products/${id}`),

    createProduct: (data) =>
        apiRequest("post", "/products", data),

    updateProduct: (id, data) =>
        apiRequest("put", `/products/${id}`, data),

    deleteProduct: (id) =>
        apiRequest("delete", `/products/${id}`),

    // Rating endpoints
    getProductRatings: (productId, params) =>
        apiRequest("get", `/products/${productId}/ratings`, null, params),

    submitRating: (productId, ratingData) =>
        apiRequest("post", `/products/${productId}/ratings`, ratingData),

    updateRating: (productId, ratingId, ratingData) =>
        apiRequest("put", `/products/${productId}/ratings/${ratingId}`, ratingData),

    deleteRating: (productId, ratingId) =>
        apiRequest("delete", `/products/${productId}/ratings/${ratingId}`),

    // Get average ratings for multiple products at once (useful for product listings)
    getMultipleProductRatings: (productIds) =>
        apiRequest("get", `/products/ratings/average`, null, { ids: productIds.join(',') })
};

export default productApi;