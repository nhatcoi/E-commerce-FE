import apiRequest from "../config/apiRequest.js";

const categoryService = {
    getCategories: (params) =>
        apiRequest("get", "/categories", null, params),
    getCategoryById: (id) =>
        apiRequest("get", `/categories/${id}`),
    getProductsByCategory: (categoryId, params) =>
        apiRequest("get", `/categories/${categoryId}/products`, null, params),
};

export default categoryService;