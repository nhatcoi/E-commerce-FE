import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import cartService from "src/services/cartService.js";

// Fetch cart items
export const fetchCartItems = createAsyncThunk(
    "cart/fetchCartItems",
    async (_, { rejectWithValue }) => {
        try {
            const data = await cartService.fetchCartItems();
            console.log("Fetched cart items: ", data);
            return data;
        } catch (error) {
            console.error("Error fetching cart items:", error);
            return rejectWithValue(error.response?.data || "Failed to fetch cart items");
        }
    }
);

// Add to cart
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (productData, {rejectWithValue}) => {
        try {
            console.log("productData: ", productData);
            return await cartService.addToCart(productData);
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to add item to cart");
        }
    }
);

// Update quantity
export const updateCartQuantity = createAsyncThunk(
    "cart/updateQuantity",
    async ({userId, id, quantity}, {rejectWithValue}) => {
        try {
            const data = await cartService.updateCartQuantity(userId, id, quantity);
            return {id, quantity};
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update item quantity");
        }
    }
);

// Remove item
export const removeFromCart = createAsyncThunk(
    "cart/removeItem",
    async (id, {rejectWithValue}) => {
        try {
            const data = await cartService.removeFromCart(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to remove item from cart");
        }
    }
);

// Clear cart
export const clearCart = createAsyncThunk(
    "cart/clearCart",
    async (userId, {rejectWithValue}) => {
        try {
            await cartService.clearCart(userId);
            return [];
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to clear cart");
        }
    }
);

const initialState = {
    items: [],
    selectedToPayments: [],
    loading: false,
    error: null,
    totalItems: 0,
    lastAdded: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // Add item logic
            if (action.payload) {
                state.items.push({
                    ...action.payload,
                    quantity: action.payload.quantity || 1
                });
                // Update total items immediately
                state.totalItems = state.items.reduce((total, item) => total + (item?.quantity || 0), 0);
            }
        },
        toggleSelectItem: (state, action) => {
            if (!state.selectedToPayments) {
                state.selectedToPayments = [];
            }
            
            const itemId = action.payload;
            if (state.selectedToPayments.includes(itemId)) {
                state.selectedToPayments = state.selectedToPayments.filter(id => id !== itemId);
            } else {
                state.selectedToPayments.push(itemId);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.items = Array.isArray(action.payload) ? action.payload.map(item => ({
                    ...item,
                    quantity: item?.quantity || 1
                })) : [];
                state.totalItems = state.items.reduce((sum, item) => sum + (item?.quantity || 0), 0);
                state.loading = false;
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch cart items";
            })
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                if (action.payload) {
                    state.items.push({
                        ...action.payload,
                        quantity: action.payload.quantity || 1
                    });
                    state.totalItems = state.items.reduce((sum, item) => sum + (item?.quantity || 0), 0);
                }
                state.loading = false;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to add item to cart";
            })
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                const {id, quantity} = action.payload || {};
                if (id) {
                    const item = state.items.find((item) => item?.id === id);
                    if (item) {
                        item.quantity = quantity || 1;
                    }
                }
                state.totalItems = state.items.reduce((sum, item) => sum + (item?.quantity || 0), 0);
                state.loading = false;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                if (action.payload) {
                    state.items = state.items.filter((item) => item?.id !== action.payload);
                    state.totalItems = state.items.reduce((total, item) => total + (Number(item?.quantity) || 0), 0);
                }
                state.loading = false;
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.items = [];
                state.totalItems = 0;
                state.loading = false;
                state.error = null;
            });
    },
});

export const { toggleSelectItem } = cartSlice.actions;
export default cartSlice.reducer;
