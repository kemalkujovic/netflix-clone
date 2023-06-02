import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Action
export const fetchUsers = createAsyncThunk("fetchUsers", () => {
  return axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.data.map((user) => user.id));
});

export const todoSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default todoSlice.reducer;
