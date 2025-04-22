import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from 'src/config/axiosBaseQuery.js';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params = {}) => ({
                url: '/products',
                method: 'GET',
                params, // { page, size, category, search, sort }
            }),
            providesTags: (result = [], error, arg) =>
                result?.items?.map(({ id }) => ({ type: 'Product', id })) ?? []
                    .concat({ type: 'Product', id: 'LIST' }),
        }),

        getProductById: builder.query({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),

        getProductBySlug: builder.query({
            query: (slug) => ({
                url: `/products/slug/${slug}`,
                method: 'GET',
            }),
            providesTags: (result, error, slug) => [{ type: 'Product', slug }],
        }),

        createProduct: builder.mutation({
            query: (newProduct) => ({
                url: '/products',   
                method: 'POST',
                data: newProduct,
            }),
            invalidatesTags: [{ type: 'Product', id: 'LIST' }],
        }),

        updateProduct: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/products/${id}`,
                method: 'PUT',
                data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }],
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Product', id }, { type: 'Product', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useGetProductBySlugQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;

