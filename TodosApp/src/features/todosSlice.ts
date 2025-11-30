import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Todo } from "./type";

const BASE_URL = "https://68e4d69b8e116898997d30af.mockapi.io/todos";

export const fetchTodos = createAsyncThunk<Todo[]>(
  "todos/fetchAll",
  async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch todos");
    const data: Todo[] = await res.json();
    return data;
  }
);

export const createTodo = createAsyncThunk<Todo, { title: string }>(
  "todos/create",
  async ({ title }) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        title, 
        completed: false, 
        createdAt: new Date().toISOString() 
      }),
    });
    if (!res.ok) throw new Error("Failed to create todo");
    const data: Todo = await res.json();
    return data;
  }
);

export const updateTodo = createAsyncThunk<Todo, { id: number; title: string }>(
  "todos/update",
  async ({ id, title }) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) throw new Error("Failed to update todo");
    const data: Todo = await res.json();
    return data;
  }
);

export const toggleTodo = createAsyncThunk<Todo, { id: number; completed: boolean }>(
  "todos/toggle",
  async ({ id, completed }) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    if (!res.ok) throw new Error("Failed to toggle todo");
    const data: Todo = await res.json();
    return data;
  }
);

export const deleteTodo = createAsyncThunk<number, number>(
  "todos/delete",
  async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete todo");
    return id;
  }
);

interface TodosState {
  items: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  items: [],
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch todos";
      })
      // Create todo
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create todo";
      })
      // Update todo
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Toggle todo
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete todo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default todosSlice.reducer;