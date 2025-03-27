import apiRequest from "../config/apiRequest.js";

const blogService = {

    getBlogs: (params) =>
        apiRequest("get", "/blog", null, params),

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
