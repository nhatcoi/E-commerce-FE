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

const nonPersistedReducers = {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
};

const persistedReducers = {
    products: productReducer,
    ratings: ratingReducer,
    categories: categoriesReducer,
    blogs: blogReducer,
    filters: filtersReducer,
    cart: cartsReducer,
    auth: authReducer,
    auth2: auth2Reducer,
    product2: product2Reducer,
    category2: category2Reducer,
    order: orderReducer,
    wishlist: wishlistReducer,
};

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth2', 'auth', 'cart', 'wishlist'],
};

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers(persistedReducers)
);

const rootReducer = combineReducers({
    ...nonPersistedReducers,
    ...persistedReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
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