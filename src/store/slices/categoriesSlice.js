import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService from "../../services/categoryService.js";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await categoryService.getCategories();
    console.log("fetchCategories:", response.data);
    return response.data; // only return the data
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