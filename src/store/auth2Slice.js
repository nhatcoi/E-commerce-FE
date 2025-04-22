import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: null,
    user: null,
    isAuthenticated: false,
    loading: false,
};

const auth2Slice = createSlice({
    name: 'auth2',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken, user } = action.payload;
            state.accessToken = accessToken;
            state.user = user;
            state.isAuthenticated = !!accessToken;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.accessToken = null;
            state.user = null;
            state.isAuthenticated = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setCredentials, setAccessToken, setUser, logout, setLoading } = auth2Slice.actions;
export default auth2Slice.reducer;
