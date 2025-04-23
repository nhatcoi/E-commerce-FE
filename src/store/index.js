import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productReducer from "./slices/product/productsSlice.js";
import ratingReducer from "./slices/product/ratingSlice.js";
import categoriesReducer from "./slices/product/categoriesSlice.js";
import blogReducer from "./slices/blog/blogsSlice.js";
import filtersReducer from "./slices/product/filtersSlice.js";
import cartsReducer from "src/store/slices/product/cart/cartSlice.js";
import authReducer from "./slices/user/authSlice.js";
import wishlistReducer from "./slices/product/wishlistSlice.js";
import {authApi} from "src/store/authApi.js";
import auth2Reducer from "./auth2Slice.js";
import {productApi} from "src/store/productApi.js";
import product2Reducer from "src/store/product2Slice.js";
import category2Reducer from "src/store/category2Slice.js";
import {categoryApi} from "src/store/categoryApi.js";
import {blogApi} from "src/store/blogApi.js";
import {orderApi} from "src/store/orderApi.js";
import orderReducer from "src/store/orderSlice.js";
import {wishlistApi} from "src/store/wishlistApi.js";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth2'], // Only persist auth2 state
};

const rootReducer = combineReducers({
    ratings: ratingReducer,
    blogs: blogReducer,
    filters: filtersReducer,
    cart: cartsReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    auth2: auth2Reducer,
    products: productReducer,
    product2: product2Reducer,
    categories: categoriesReducer,
    category2: category2Reducer,
    order: orderReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/REGISTER',
                ],
            },
        }).concat(
            authApi.middleware,
            productApi.middleware,
            categoryApi.middleware,
            blogApi.middleware,
            orderApi.middleware,
            wishlistApi.middleware
        ),
    devTools: import.meta.env.MODE !== 'production',
});

export const persistor = persistStore(store);
export default store;