import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../../../services/productService.js";

let count = 0;

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (params) => {
        const response = await productApi.getAllProducts(params);
        count += 1;
        console.log(`fetchProducts ${count}:`, response);
        return response;
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
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
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.statusCode === 200) {
                    state.items = action.payload.data;
                    state.pagination = action.payload.pagination;
                } else {
                    state.items = [];
                    state.pagination = {};
                    state.error = action.payload.message || "Unknown error";
                }
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.items = [];
                state.pagination = {};
            });
    },
});

export default productSlice.reducer;
