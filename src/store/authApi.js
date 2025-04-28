import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from 'src/config/axiosBaseQuery.js';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: axiosBaseQuery({
        cache: {
            ttl: 5 * 60 * 1000,
            methods: ['GET']
        }
    }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ userIdentifier, password }) => ({
                url: '/auth/log-in',
                method: 'POST',
                data: { userIdentifier, password },
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/log-out',
                method: 'POST',
            }),
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: '/auth/refresh-token',
                method: 'POST',
            }),
        }),
        getMyInfo: builder.query({
            query: () => ({
                url: '/users/my-info',
                method: 'GET',
            }),
            keepUnusedDataFor: 300,
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRefreshTokenMutation,
    useGetMyInfoQuery,
    useLazyGetMyInfoQuery,
} = authApi;