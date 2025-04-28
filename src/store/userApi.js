import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from 'src/config/axiosBaseQuery.js';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: (params = {}) => ({
                url: '/users',
                method: 'GET',
                params,
            }),
            providesTags: ['User'],
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'User', id }],
        }),
        updateUser: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/users/${id}`,
                method: 'PUT',
                data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'User', id },
                { type: 'User', id: 'LIST' },
            ],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: '/users/profile',
                method: 'PUT',
                data,
            }),
            invalidatesTags: ['User'],
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: '/users/change-password',
                method: 'PUT',
                data,
            }),
        }),
        forgotPassword: builder.mutation({
            query: (email) => ({
                url: '/users/forgot-password',
                method: 'POST',
                data: { email },
            }),
        }),
        resetPassword: builder.mutation({
            query: ({ token, ...data }) => ({
                url: `/users/reset-password/${token}`,
                method: 'POST',
                data,
            }),
        }),
        updateUserRole: builder.mutation({
            query: ({ id, role }) => ({
                url: `/admin/users/${id}/role`,
                method: 'PUT',
                data: { role },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useUpdateProfileMutation,
    useChangePasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useUpdateUserRoleMutation
} = userApi;