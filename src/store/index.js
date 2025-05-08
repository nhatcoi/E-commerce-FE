import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productReducer from "./slices/product/productsSlice.js";
import ratingReducer from "./slices/product/ratingSlice.js";
import categoriesReducer from "./slices/product/categoriesSlice.js";
import blogReducer from "./slices/blog/blogsSlice.js";
import filtersReducer from "./slices/product/filtersSlice.js";
import cartsReducer from "src/store/slices/product/cart/cartSlice.js";
import authReducer from "./slices/user/authSlice.js";
import wishlistReducer from "./slices/product/wishlistSlice.js";
import { authApi } from "./authApi.js";
import { userApi } from "./userApi.js";
import auth2Reducer from "./auth2Slice.js";
import {productApi} from "src/features/product/services/productApi.js";
import product2Reducer from "src/store/product2Slice.js";
import category2Reducer from "src/store/category2Slice.js";
import {categoryApi} from "src/store/categoryApi.js";
import {blogApi} from "src/store/blogApi.js";
import {orderApi} from "src/features/orders/services/orderApi.js";
import orderReducer from "src/store/orderSlice.js";
import {wishlistApi} from "src/store/wishlistApi.js";
import { setupListeners } from '@reduxjs/toolkit/query';

// Configure auth2 persistence separately
const auth2PersistConfig = {
    key: 'auth2',
    storage,
    whitelist: ['accessToken', 'user', 'isAuthenticated']
};

// Configure other reducers persistence
const rootPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'cart', 'wishlist']
};

// Create the persisted auth2 reducer
const persistedAuth2Reducer = persistReducer(auth2PersistConfig, auth2Reducer);

// Combine all reducers
const rootReducer = {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    products: productReducer,
    ratings: ratingReducer,
    categories: categoriesReducer,
    blogs: blogReducer,
    filters: filtersReducer,
    cart: cartsReducer,
    auth: authReducer,
    auth2: persistedAuth2Reducer,
    product2: product2Reducer,
    category2: category2Reducer,
    order: orderReducer,
    wishlist: wishlistReducer,
};

// Create the store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(
            authApi.middleware,
            userApi.middleware,
            productApi.middleware,
            categoryApi.middleware,
            blogApi.middleware,
            orderApi.middleware,
            wishlistApi.middleware
        ),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
export default store;