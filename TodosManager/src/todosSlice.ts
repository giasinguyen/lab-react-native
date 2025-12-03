import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch todos");
  const data = await res.json();
  return data;
});

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async ({ title }) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, completed: false }),
    });
    if (!res.ok) throw new Error("Failed to fetch todos");
    const data = await res.json();
    return data;
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, title }) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, title, completed: false }),
    });
    if (!res.ok) throw new Error("Failed to fetch todos");
    const data = await res.json();
    return data;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async ({ id }) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to fetch todos");
    return id;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.items.unshift(action.payload);
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      const index = state.items.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.items.filter((todo) => todo.id !== action.payload.id);
    });
  },
});

export default todosSlice.reducer;
