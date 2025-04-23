import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentOrder: null,
    orderFilter: {
        status: 'all',
        page: 1,
        limit: 10,
        sort: 'createdAt,desc'
    },
    paymentStatus: null,
    shippingData: null,
    selectedItems: [],
    loading: false,
    error: null
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setCurrentOrder: (state, action) => {
            state.currentOrder = action.payload;
        },
        clearCurrentOrder: (state) => {
            state.currentOrder = null;
        },
        updateOrderFilter: (state, action) => {
            state.orderFilter = {
                ...state.orderFilter,
                ...action.payload
            };
        },
        resetOrderFilter: (state) => {
            state.orderFilter = initialState.orderFilter;
        },
        setPaymentStatus: (state, action) => {
            state.paymentStatus = action.payload;
        },
        setShippingData: (state, action) => {
            state.shippingData = action.payload;
        },
        setSelectedItems: (state, action) => {
            state.selectedItems = action.payload;
        },
        clearOrderData: (state) => {
            state.currentOrder = null;
            state.paymentStatus = null;
            state.shippingData = null;
            state.selectedItems = [];
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {
    setCurrentOrder,
    clearCurrentOrder,
    updateOrderFilter,
    resetOrderFilter,
    setPaymentStatus,
    setShippingData,
    setSelectedItems,
    clearOrderData,
    setLoading,
    setError
} = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrderFilter = (state) => state.order.orderFilter;
export const selectPaymentStatus = (state) => state.order.paymentStatus;
export const selectShippingData = (state) => state.order.shippingData;
export const selectSelectedItems = (state) => state.order.selectedItems;
export const selectOrderLoading = (state) => state.order.loading;
export const selectOrderError = (state) => state.order.error;

export default orderSlice.reducer;