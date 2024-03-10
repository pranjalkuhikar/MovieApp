/* eslint-disable react-refresh/only-export-components */
import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./Reducers/MovieSlice";
import tvReducer from "./Reducers/TvSlice";
import peopleReducer from "./Reducers/PeopleSlice";

export default configureStore({
  reducer: {
    movie: movieReducer,
    tv: tvReducer,
    people: peopleReducer,
  },
});
