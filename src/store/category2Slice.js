import { createSlice } from '@reduxjs/toolkit';
import { categoryApi } from './categoryApi';

const initialState = {
    selectedCategory: null,
    // Other UI-specific state
};

const category2Slice = createSlice({
    name: 'category2',
    initialState,
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        // Other UI actions
    }
});

export const { setSelectedCategory } = category2Slice.actions;
export default category2Slice.reducer;