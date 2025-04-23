import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from 'src/config/axiosBaseQuery.js';

export const wishlistApi = createApi({
    reducerPath: 'wishlistApi',
    baseQuery: axiosBaseQuery({
        cache: {
            ttl: 5 * 60 * 1000, // Cache for 5 minutes
            methods: ['GET']
        }
    }),
    tagTypes: ['Wishlist'],
    endpoints: (builder) => ({
        getWishlist: builder.query({
            query: () => ({
                url: '/wishlist',
                method: 'GET'
            }),
            providesTags: ['Wishlist'],
            keepUnusedDataFor: 300 // Keep data for 5 minutes
        }),
        addToWishlist: builder.mutation({
            query: (productId) => ({
                url: '/wishlist/add',
                method: 'POST',
                data: { productId }
            }),
            invalidatesTags: ['Wishlist']
        }),
        removeFromWishlist: builder.mutation({
            query: (productId) => ({
                url: `/wishlist/remove/${productId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Wishlist']
        }),
        checkWishlist: builder.query({
            query: (productId) => ({
                url: `/wishlist/check/${productId}`,
                method: 'GET'
            }),
            keepUnusedDataFor: 300 // Keep data for 5 minutes
        })
    })
});

export const {
    useGetWishlistQuery,
    useAddToWishlistMutation,
    useRemoveFromWishlistMutation,
    useCheckWishlistQuery
} = wishlistApi;