import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/movies/MovieSlice";

const store = configureStore({
  reducer: moviesReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
