import { configureStore } from "@reduxjs/toolkit";
import TodosReducer from "./features/todosSlice";
export const store = configureStore({
  reducer: {
    todos: TodosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const selectTodosState = (state: RootState) => state.todos;
