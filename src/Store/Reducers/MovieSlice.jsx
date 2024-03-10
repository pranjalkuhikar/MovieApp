/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";

export const MovieSlice = createSlice({
  name: "movie",
  initialState: {
    info: null,
  },
  reducers: {
    loadMovie: (state, actions) => {
      state.info = actions.payload;
    },
    removeMovie: (state) => {
      state.info = null;
    },
  },
});

export const { loadMovie, removeMovie } = MovieSlice.actions;

export default MovieSlice.reducer;
