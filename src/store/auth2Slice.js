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
            console.log('setCredentials payload:', action.payload);
            const { accessToken, user } = action.payload;
            state.accessToken = accessToken;
            state.user = user;
            state.isAuthenticated = !!accessToken;
            console.log('setCredentials new state:', state);
        },
        setAccessToken: (state, action) => {
            console.log('setAccessToken payload:', action.payload);
            state.accessToken = action.payload;
            state.isAuthenticated = !!action.payload;
            console.log('setAccessToken new state:', state);
        },
        setUser: (state, action) => {
            console.log('setUser payload:', action.payload);
            state.user = action.payload;
            console.log('setUser new state:', state);
        },
        setLogout: (state) => {
            state.accessToken = null;
            state.user = null;
            state.isAuthenticated = false;
            console.log('logout new state:', state);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setCredentials, setAccessToken, setUser, setLogout, setLoading } = auth2Slice.actions;
export default auth2Slice.reducer;
