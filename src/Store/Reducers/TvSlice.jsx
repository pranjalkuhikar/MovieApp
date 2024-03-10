/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";

export const TvSlice = createSlice({
  name: "tv",
  initialState: {
    info: null,
  },
  reducers: {
    loadTv: (state, actions) => {
      state.info = actions.payload;
    },
    removeTv: (state) => {
      state.info = null;
    },
  },
});

export const { loadTv, removeTv } = TvSlice.actions;

export default TvSlice.reducer;
