import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "src/config/axiosBaseQuery.js";

export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: axiosBaseQuery(),
    tagTypes: ["Blog"],
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: (params ={}) => ({
                url: `/blog/blogs`,
                method: "GET",
                params
            }),
            providesTags: ["Blog"],
        }),
        getRecentNews: builder.query({
            query: () => ({
                url: `/blog/recent-news`,
                method: "GET",
            }),
            providesTags: ["Blog"],
        }),
    }),
});

export const {
    useGetBlogsQuery,
    useGetRecentNewsQuery
} = blogApi;
