import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from 'src/config/axiosBaseQuery.js';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (orderRequest) => ({
                url: '/orders/create-order',
                method: 'POST',
                data: orderRequest
            }),
            invalidatesTags: ['Order']
        }),
        getOrderById: builder.query({
            query: (id) => ({
                url: `/orders/${id}`,
                method: 'GET'
            }),
            providesTags: (result, error, id) => [{ type: 'Order', id }]
        }),
        getOrders: builder.query({
            query: (params) => ({
                url: '/orders',
                method: 'GET',
                params
            }),
            providesTags: (result = []) =>
                result?.items?.map(({ id }) => ({ type: 'Order', id })) ?? []
                    .concat({ type: 'Order', id: 'LIST' }),
                    keepUnusedDataFor: 5
        }),
        cancelOrder: builder.mutation({
            query: (id) => ({
                url: `/orders/${id}/cancel`,
                method: 'PUT'
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Order', id }]
        }),
        returnOrder: builder.mutation({
            query: (id) => ({
                url: `/orders/${id}/return`,
                method: 'PUT'
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Order', id }]
        }),
        getPaymentUrl: builder.query({
            query: (orderId) => ({
                url: `/orders/${orderId}/payment-url`,
                method: 'GET'
            })
        }),
        getPaymentStatus: builder.query({
            query: (orderId) => ({
                url: `/orders/payment-status/${orderId}`,
                method: 'GET'
            })
        })
    })
});

export const {
    useCreateOrderMutation,
    useGetOrderByIdQuery,
    useGetOrdersQuery,
    useCancelOrderMutation,
    useReturnOrderMutation,
    useGetPaymentUrlQuery,
    useGetPaymentStatusQuery
} = orderApi;