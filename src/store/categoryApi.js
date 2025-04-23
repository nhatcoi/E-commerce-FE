import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from 'src/config/axiosBaseQuery.js';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: '/categories',
        method: 'GET'
      }),
      providesTags: ['Category']
    }),
    
    getCategoryById: builder.query({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'GET'
      }),
      providesTags: (result, error, id) => [{ type: 'Category', id }]
    }),
    
    createCategory: builder.mutation({
      query: (category) => ({
        url: '/categories',
        method: 'POST',
        data: category
      }),
      invalidatesTags: ['Category']
    }),
    
    updateCategory: builder.mutation({
      query: ({ id, ...category }) => ({
        url: `/categories/${id}`,
        method: 'PUT',
        data: category
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Category', id }]
    }),
    
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Category']
    })
  })
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = categoryApi;
