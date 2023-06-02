import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getLorem = createAsyncThunk(
  "lorem/getData",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const loremSlice = createSlice({
  name: "lorem",
  initialState: {
    data: [],
    isSuccess: false,
    message: "",
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getLorem.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getLorem.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [getLorem.rejected]: (state, { payload }) => {
      state.message = payload;
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
export default loremSlice;
