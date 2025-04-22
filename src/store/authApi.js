import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from 'src/config/axiosBaseQuery.js';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: axiosBaseQuery(),
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
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: '/users/update-profile',
                method: 'PUT',
                data,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useUpdateProfileMutation,
    useGetMyInfoQuery,
    useLazyGetMyInfoQuery,
    useLogoutMutation,
} = authApi;