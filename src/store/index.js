import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productReducer from "./slices/product/productsSlice.js";
import ratingReducer from "./slices/product/ratingSlice.js";
import categoriesReducer from "./slices/categoriesSlice.js";
import blogReducer from "./slices/blogsSlice.js";
import filtersReducer from "./slices/product/filtersSlice.js";
import cartsReducer from "./slices/cart/cartSlice.js";
import authReducer from "./slices/authSlice.js";
import wishlistReducer from "./slices/wishlistSlice.js";

// Configure Redux Persist
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], // only auth will be persisted
};

const rootReducer = combineReducers({
    products: productReducer,
    ratings: ratingReducer,
    categories: categoriesReducer,
    blogs: blogReducer,
    filters: filtersReducer,
    cart: cartsReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
            },
        }),
    // eslint-disable-next-line no-undef
    devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
export default store;
