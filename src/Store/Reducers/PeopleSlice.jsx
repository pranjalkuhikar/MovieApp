/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";

export const PeopleSlice = createSlice({
  name: "People",
  initialState: {
    info: null,
  },
  reducers: {
    loadPeople: (state, actions) => {
      state.info = actions.payload;
    },
    removePeople: (state) => {
      state.info = null;
    },
  },
});

export const { loadPeople, removePeople } = PeopleSlice.actions;

export default PeopleSlice.reducer;
