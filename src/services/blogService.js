import blogApi from "src/api/blogApi.js";
import apiRequest from "src/config/apiRequest.js";

const blogService = {

    getBlogs: async (params) => {
        try {
            return await blogApi.getBlogs(params);
        } catch (error) {
            console.error("Failed to fetch blogs:", error);
        }
    },

    getBlogCategories: async () => {
        try {
            const categoriesResponse = await blogApi.getBlogCategories();
            return categoriesResponse.data;
        } catch (error) {
            console.error("Failed to fetch blog categories:", error);
        }
    },

    getTopBlogCategories: async () => {
        try {
            const categoriesResponse = await blogApi.getTopBlogCategories();
            return categoriesResponse.data;
        } catch (error) {
            console.error("Failed to fetch blog categories:", error);
        }
    },

    getRecentNews: (params) =>
        apiRequest("get", "/blog/recent-news", null, params),

    getBlogById: (id) =>
        apiRequest("get", `/blogs/${id}`),

    createBlog: (data) =>
        apiRequest("post", "/blogs", data),

    updateBlog: (id, data) =>
        apiRequest("put", `/blogs/${id}`, data),

    deleteBlog: (id) =>
        apiRequest("delete", `/blogs/${id}`),
};

export default blogService;
