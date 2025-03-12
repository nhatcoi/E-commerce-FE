// src/store/slices/product/filtersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchTerm: "",
    categories: [],
    colors: [],
    capacities: [],
    tags: []
};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setSearchTerm: (state, action) => { state.searchTerm = action.payload; },
        setCategories: (state, action) => { state.categories = action.payload; },
        setColors: (state, action) => { state.colors = action.payload; },
        setCapacities: (state, action) => { state.capacities = action.payload; },
        setTags: (state, action) => { state.tags = action.payload; },
        resetFilters: () => initialState
    }
});

export const { setSearchTerm, setCategories, setColors, setCapacities, setTags, resetFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
