import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import cartService from "src/services/cartService.js";

// Fetch cart items
export const fetchCartItems = createAsyncThunk(
    "cart/fetchCartItems",
    async (_, { rejectWithValue }) => {
        try {
            const data = await cartService.fetchCartItems();
            console.log("items cart: ", data);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch cart items");
        }
    }
);


// Add to cart
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (productData, { rejectWithValue }) => {
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
    async ({ userId, id, quantity }, { rejectWithValue }) => {
      try {
        const data = await cartService.updateCartQuantity(userId, id, quantity);
        return { id, quantity };
      } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to update item quantity");
      }
    }
);

// Remove item
export const removeFromCart = createAsyncThunk(
    "cart/removeItem",
    async ( id , { rejectWithValue }) => {
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
    async (userId, { rejectWithValue }) => {
      try {
        await cartService.clearCart(userId);
        return [];
      } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to clear cart");
      }
    }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
    totalItems: 0,
    lastAdded: null,
  },
  reducers: {
    // Local operations for offline users
    addItemLocal: (state, action) => {
      const { id, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...action.payload, quantity });
      }
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    removeItemLocal: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    clearCartLocal: (state) => {
      state.items = [];
      state.totalItems = 0;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchCartItems.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCartItems.fulfilled, (state, action) => {
            state.items = action.payload || [];
            state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
            state.loading = false;
        })
        .addCase(fetchCartItems.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to fetch cart items";
        })

        .addCase(addToCart.fulfilled, (state, action) => {
            state.items = action.payload || [];
            state.totalItems = (action.payload || [])
                .filter(item => item && typeof item.quantity === 'number')
                .reduce((sum, item) => sum + item.quantity, 0);
            state.loading = false;
        })
        .addCase(updateCartQuantity.fulfilled, (state, action) => {
          const { id, quantity } = action.payload;
          const item = state.items.find((item) => item.id === id);
          if (item) {
            item.quantity = quantity;
          }
          state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
          state.loading = false;
        })
        .addCase(removeFromCart.fulfilled, (state, action) => {
          state.items = state.items.filter((item) => item.id !== action.payload);
          state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
          state.loading = false;
        })
        .addCase(clearCart.fulfilled, (state) => {
          state.items = [];
          state.totalItems = 0;
          state.loading = false;
        });
  },
});

export const { addItemLocal, removeItemLocal, clearCartLocal } = cartSlice.actions;
export default cartSlice.reducer;
