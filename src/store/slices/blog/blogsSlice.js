import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import blogService from "src/services/blogService.js";
import blogApi from "src/api/blogApi.js";

export const fetchBlogs = createAsyncThunk(
    "blogs/fetchBlogs",
    async (params, { rejectWithValue }) => {
        try {
            const response = await blogApi.getBlogs(params);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch blogs");
        }
    }
);

const blogSlice = createSlice({
    name: "blogs",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        resetBlogState: (state) => {
            state.items = [];
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetBlogState } = blogSlice.actions;
export default blogSlice.reducer;
