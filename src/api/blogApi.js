import apiRequest from "src/config/apiRequest.js";

const blogService = {
    getBlogs: (params) =>
        apiRequest("get", "/blog/blogs", null, params),

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

    getBlogCategories:() =>
        apiRequest("get", "/blog/categories"),

    getTopBlogCategories:() =>
        apiRequest("get", "/blog/categories/count"),

};

export default blogService;