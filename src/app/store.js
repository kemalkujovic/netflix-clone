import { configureStore } from "@reduxjs/toolkit";
import loremSlice from "./loremSlice";

const store = configureStore({
  reducer: {
    films: loremSlice.reducer,
  },
});

export default store;
