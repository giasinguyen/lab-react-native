import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice";
export const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});
export const selectPostsState = (state) => state.posts;
