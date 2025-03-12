import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/product/productsSlice.js";
import ratingReducer from "./slices/product/ratingSlice.js";
import categoriesReducer from "./slices/categoriesSlice.js";
import blogReducer from "./slices/blogsSlice.js";
import filtersReducer from "./slices/product/filtersSlice.js";

const store = configureStore({
    reducer: {
        products: productReducer,
        ratings: ratingReducer,
        categories: categoriesReducer,
        blogs: blogReducer,
        filters: filtersReducer,
    },
    // eslint-disable-next-line no-undef
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
