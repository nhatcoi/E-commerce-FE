import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import categoryService from "../../../services/categoryService.js";

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async (_, thunkAPI) => {
        const response = await categoryService.getCategories();
        return response.data;
    },
    {
        condition: (_, { getState }) => {
            const { categories } = getState();
            return categories.items.length === 0;
        },
    }
);


const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.items = [];
            });
    },
});

export default categoriesSlice.reducer;