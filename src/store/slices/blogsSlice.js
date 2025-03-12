import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import blogService from "src/services/blogService";

// Fetch danh sách blog
export const fetchBlogs = createAsyncThunk(
    "blogs/fetchBlogs",
    async (_, { rejectWithValue }) => {
        try {
            const response = blogService.getBlogs();
            console.log(response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch blogs");
        }
    }
);

// Fetch average views cho nhiều blog theo blogIds
export const fetchRecentNews = createAsyncThunk(
    "blogs/fetchRecentNews",
    async (blogIds, { rejectWithValue }) => {
        try {
            const response = await blogService.getRecentNews();
            console.log("blog", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch average views");
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
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addCase(fetchBlogs.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            // .addCase(fetchBlogs.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.blogs = action.payload;
            // })
            // .addCase(fetchBlogs.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload;
            // })
            .addCase(fetchRecentNews.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRecentNews.fulfilled, (state, action) => {
                state.loading = false;
                state.items =  action.payload;
            })
            .addCase(fetchRecentNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetBlogState } = blogSlice.actions;
export default blogSlice.reducer;
