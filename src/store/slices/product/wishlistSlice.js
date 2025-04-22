import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "src/config/api.js";
import wishlistService from "src/services/wishlistService.js";

// Async thunks
export const fetchWishlistItems = createAsyncThunk(
    "wishlist/fetchItems",
    async (_, { getState, rejectWithValue }) => {
        const { wishlist } = getState();
        if (wishlist.items.length > 0) {
            return rejectWithValue("Data is already loaded");
        }
        return await wishlistService.loadWishlistItems();
    },
    {
        condition: (_, { getState }) => {
            const { wishlist } = getState();
            return wishlist.items.length === 0;
        }
    }
);


export const addToWishlist = createAsyncThunk(
    "wishlist/addItem",
    async (productId, {rejectWithValue}) => {
        try {
            return await wishlistService.addItem(productId);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to add to wishlist");
        }
    }
);

export const removeFromWishlist = createAsyncThunk(
    "wishlist/removeItem",
    async (productId, {rejectWithValue}) => {
        try {
            const response = await wishlistService.removeItem(productId);
            return {productId};
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to remove from wishlist");
        }
    }
);

export const clearWishlist = createAsyncThunk(
    "wishlist/clearAll",
    async (_, {rejectWithValue}) => {
        try {
            await api.delete("/user/wishlist");
            return true;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to clear wishlist");
        }
    }
);

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearWishlistState: (state) => {
            state.items = [];
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch wishlist
            .addCase(fetchWishlistItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWishlistItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchWishlistItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add to wishlist
            .addCase(addToWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.loading = false;
                
                // If action.payload is an array, replace the items
                if (Array.isArray(action.payload)) {
                    state.items = action.payload;
                } 
                // If it's a single item, add it to the array if not already present
                else if (action.payload && !state.items.find(item => item.id === action.payload.id)) {
                    state.items.push(action.payload);
                }
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Remove from wishlist
            .addCase(removeFromWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.loading = false;
                // Filter out the item with matching productId
                state.items = state.items.filter(item => item.productId !== action.payload.productId);
            })
            .addCase(removeFromWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Clear wishlist
            .addCase(clearWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(clearWishlist.fulfilled, (state) => {
                state.loading = false;
                state.items = [];
            })
            .addCase(clearWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {clearWishlistState} = wishlistSlice.actions;
export default wishlistSlice.reducer; 