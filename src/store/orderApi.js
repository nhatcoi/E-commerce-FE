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
            providesTags: (result) =>
                Array.isArray(result)
                    ? result.map(({ id }) => ({ type: 'Order', id })).concat({ type: 'Order', id: 'LIST' })
                    : [{ type: 'Order', id: 'LIST' }]
        }),

        getManagedOrders: builder.query({
            async queryFn(params = {}, { dispatch }, extraOptions, baseQuery) {
                try {
                    // First, try the managed orders endpoint
                    const managedResult = await baseQuery({
                        url: '/orders/managed',
                        method: 'GET',
                        params
                    });
                    
                    if (managedResult.error) {
                        // If managed orders fails, fall back to regular orders with admin role
                        console.warn('Failed to fetch managed orders, falling back to regular orders with admin role', 
                            managedResult.error);
                        
                        const fallbackResult = await baseQuery({
                            url: '/orders',
                            method: 'GET',
                            params: {
                                ...params,
                                role: 'admin'
                            }
                        });
                        
                        return fallbackResult.error 
                            ? { error: fallbackResult.error } 
                            : { data: fallbackResult.data };
                    }
                    
                    return { data: managedResult.data };
                } catch (error) {
                    console.error('Error in getManagedOrders:', error);
                    return { error: { status: 500, data: error.message || 'Failed to fetch orders' } };
                }
            },
            providesTags: (result) =>
                Array.isArray(result)
                    ? result.map(({ id }) => ({ type: 'Order', id })).concat({ type: 'Order', id: 'LIST' })
                    : [{ type: 'Order', id: 'LIST' }]
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
    useGetManagedOrdersQuery,
    useGetOrderByIdQuery,
    useUpdateOrderStatusMutation,
    useCancelOrderMutation,
    useExportOrdersQuery
} = orderApi;