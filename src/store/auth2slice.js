import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: null,
    user: null,
    isAuthenticated: false,
    loading: false,
};

const auth2slice = createSlice({
    name: 'auth2',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken, user } = action.payload;
            state.accessToken = accessToken || null;
            state.user = user || null;
            state.isAuthenticated = !!accessToken;
            console.log("Auth2 state updated with credentials:", !!accessToken);
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload || null;
            state.isAuthenticated = !!action.payload;
            console.log("Auth2 token updated:", !!action.payload);
        },
        setUser: (state, action) => {
            state.user = action.payload || null;
        },
        logout: (state) => {
            state.accessToken = null;
            state.user = null;
            state.isAuthenticated = false;
            console.log("Auth2 logged out");
        },
        setLoading: (state, action) => {
            state.loading = !!action.payload;
        },
    },
});

export const { setCredentials, setAccessToken, setUser, logout, setLoading } = auth2slice.actions;
export default auth2slice.reducer;
