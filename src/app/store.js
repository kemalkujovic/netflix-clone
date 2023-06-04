import { configureStore } from "@reduxjs/toolkit";
import filmsSlice from "./filmsSlice";

const store = configureStore({
  reducer: {
    films: filmsSlice.reducer,
  },
});

export default store;
