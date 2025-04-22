import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedProductId: null,
    searchKeyword: '',
    filters: {
        category: null,
        colors: [],
        capacities: [],
        tags: [],
        minPrice: 0,
        maxPrice: 0,
    },
    sort: 'latest',
    editMode: false,
};

const product2Slice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setSelectedProductId: (state, action) => {
            state.selectedProductId = action.payload;
        },
        setSearchKeyword: (state, action) => {
            state.searchKeyword = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = {
                ...state.filters,
                ...action.payload,
            };
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        toggleEditMode: (state) => {
            state.editMode = !state.editMode;
        },
        resetFilters: (state) => {
            state.filters = initialState.filters;
        },
        toggleColor: (state, action) => {
            const value = action.payload;
            const index = state.filters.colors.indexOf(value);
            if (index >= 0) {
                state.filters.colors.splice(index, 1);
            } else {
                state.filters.colors.push(value);
            }
        },
        toggleCapacity: (state, action) => {
            const value = action.payload;
            const index = state.filters.capacities.indexOf(value);
            if (index >= 0) {
                state.filters.capacities.splice(index, 1);
            } else {
                state.filters.capacities.push(value);
            }
        },
        toggleTag: (state, action) => {
            const value = action.payload;
            const index = state.filters.tags.indexOf(value);
            if (index >= 0) {
                state.filters.tags.splice(index, 1);
            } else {
                state.filters.tags.push(value);
            }
        },
    },
});

export const {
    setSelectedProductId,
    setSearchKeyword,
    setFilters,
    setSort,
    toggleEditMode,
    resetFilters,
    toggleColor,
    toggleCapacity,
    toggleTag,
} = product2Slice.actions;

export default product2Slice.reducer;
