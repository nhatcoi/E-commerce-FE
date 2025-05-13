    import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from 'src/config/axiosBaseQuery.js';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: (params = {}) => ({
                url: '/orders',
                method: 'GET',
                params
            }),
            providesTags: (result = []) => 
                result.map(({ id }) => ({ type: 'Order', id }))
                    .concat({ type: 'Order', id: 'LIST' })
        }),

        getOrderById: builder.query({
            query: (id) => ({
                url: `/orders/${id}`,
                method: 'GET'
            }),
            providesTags: (result, error, id) => [{ type: 'Order', id }]
        }),

        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/orders/${id}/status`,
                method: 'PUT',
                data: { status }
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Order', id },
                { type: 'Order', id: 'LIST' }
            ]
        }),

        cancelOrder: builder.mutation({
            query: (id) => ({
                url: `/orders/${id}/cancel`,
                method: 'PUT'
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Order', id },
                { type: 'Order', id: 'LIST' }
            ]
        }),

        exportOrders: builder.query({
            query: (params) => ({
                url: '/orders/export',
                method: 'GET',
                params,
                responseType: 'blob'
            })
        })
    })
});

export const {
    useGetOrdersQuery,
    useGetOrderByIdQuery,
    useUpdateOrderStatusMutation,
    useCancelOrderMutation,
    useExportOrdersQuery
} = orderApi;