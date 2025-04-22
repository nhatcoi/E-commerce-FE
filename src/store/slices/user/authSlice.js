import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authService} from "src/services/authService.js";
import {userService} from "src/services/userService.js";

export const refreshTokenAsync = createAsyncThunk("auth/refreshToken", async (_, { rejectWithValue }) => {
    try {
        const response = await authService.refreshToken();
        return response.data.data.accessToken;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Lỗi refresh token");
    }
});

export const loginAsync = createAsyncThunk("auth/login", async ({ userIdentifier, password }, { rejectWithValue }) => {
    try {
        // First login to get the access token
        const loginResponse = await authService.login(userIdentifier, password);
        
        // Then fetch user info
        const userResponse = await userService.getMyInfo();
        
        return {
            accessToken: loginResponse.accessToken,
            user: userResponse
        };
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Login failed");
    }
});

export const fetchUserInfoAsync = createAsyncThunk("auth/fetchUserInfo", async (_, { rejectWithValue }) => {
    try {
        return await userService.getMyInfo();
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch user info");
    }
});

// Add update profile thunk
export const updateUserProfileAsync = createAsyncThunk(
    "auth/updateProfile",
    async (userData, { rejectWithValue }) => {
        try {
            return await userService.updateProfile(userData);
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update profile");
        }
    }
);

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
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
            state.loading = false;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            state.error = null;
            state.loading = false;
        },

        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        
        setUser: (state, action) => {
            state.user = action.payload;
        },
        
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Refresh Token
            .addCase(refreshTokenAsync.fulfilled, (state, action) => {
                if (action.payload) {
                    state.accessToken = action.payload;
                    state.isAuthenticated = true;
                }
            })
            .addCase(refreshTokenAsync.rejected, (state) => {
                state.accessToken = null;
                state.isAuthenticated = false;
                state.user = null;
            })
            
            // Fetch User Info
            .addCase(fetchUserInfoAsync.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            
            // Update Profile
            .addCase(updateUserProfileAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfileAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(updateUserProfileAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { 
    loginSuccess, 
    logout, 
    setAccessToken, 
    setUser, 
    clearError,
    setLoading 
} = authSlice.actions;

export default authSlice.reducer;
