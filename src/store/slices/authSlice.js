import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "src/services/authService";

// Async action để refresh token
export const refreshTokenAsync = createAsyncThunk("auth/refreshToken", async (_, { rejectWithValue }) => {
    try {
        const response = await authService.refreshToken();
        return response.data.accessToken;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Lỗi refresh token");
    }
});

// Async action để login
export const loginAsync = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await authService.login(email, password);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Lỗi đăng nhập");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        accessToken: null,
        isAuthenticated: false,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            state.error = null;
        },

        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            state.isAuthenticated = !!action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.isAuthenticated = true;
            })
            .addCase(refreshTokenAsync.fulfilled, (state, action) => {
                if (action.payload) {
                    state.accessToken = action.payload;
                }
            })
            .addCase(refreshTokenAsync.rejected, (state) => {
                state.accessToken = null;
                state.isAuthenticated = false;
                state.user = null;
            })
    },
});

export const { logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
