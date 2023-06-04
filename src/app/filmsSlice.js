import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getFilms = createAsyncThunk(
  "films/getData",
  async (api, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(api);
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const filmsSlice = createSlice({
  name: "films",
  initialState: {
    data: [],
    isSuccess: false,
    message: "",
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getFilms.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getFilms.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [getFilms.rejected]: (state, { payload }) => {
      state.message = payload;
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
export default filmsSlice;
