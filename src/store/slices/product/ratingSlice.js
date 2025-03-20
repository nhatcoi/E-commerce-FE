import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ratingService from "src/services/ratingService";

// Fetch average ratings for multiple products
export const fetchAverageRatings = createAsyncThunk(
    "ratings/fetchAverageRatings",
    async (products, { rejectWithValue }) => {
        try {
            if (!products || products.length === 0) {
                return rejectWithValue("No products provided");
            }
            const productIds = products.map((product) => product.id);
            const response = await ratingService.getAverageRatings(productIds);
            console.log("Fetched Ratings:", response.data);
            return response.data || {};
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch average ratings");
        }
    }
);

const ratingSlice = createSlice({
    name: "ratings",
    initialState: {
        items: [],
        averageRatings: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAverageRatings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAverageRatings.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.averageRatings = { ...state.averageRatings, ...action.payload };
                }
            })
            .addCase(fetchAverageRatings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default ratingSlice.reducer;
