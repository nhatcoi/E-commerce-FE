import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../../../services/productService.js";

// Create async thunks
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await productApi.getAllProducts(params);
      console.log("products: ", response.data);
      
      if (response && response.statusCode === 200) {
        return response;
      } else {
        return rejectWithValue(response?.message || "Failed to fetch products");
      }
    } catch (error) {
      return rejectWithValue(error.message || "An unexpected error occurred");
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await productApi.getProductById(id);
      console.log(response);
      if (response && response.statusCode === 200) {
        return response;
      } else {
        return rejectWithValue(response?.message || "Failed to fetch product details");
      }
    } catch (error) {
      return rejectWithValue(error.message || "An unexpected error occurred");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [], // For product list
    currentProduct: null, // For single product details
    pagination: {
      currentPage: 0,
      pageSize: 0,
      totalPages: 0,
      totalItems: 0,
      numberOfElementsOnPage: 0,
      hasNextPage: false,
      hasPreviousPage: false,
      firstPage: false,
      lastPage: false,
    },
    loading: false,
    detailLoading: false, // Separate loading state for product detail
    error: null,
    detailError: null, // Separate error state for product detail
  },
  reducers: {
    clearProductErrors: (state) => {
      state.error = null;
      state.detailError = null;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.pagination = action.payload.pagination || {};
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.items = [];
        state.pagination = {};
      })

      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.currentProduct = action.payload.data;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError = action.payload || action.error.message;
        state.currentProduct = null;
      });
  },
});

export const { clearProductErrors, clearCurrentProduct } = productSlice.actions;

export default productSlice.reducer;