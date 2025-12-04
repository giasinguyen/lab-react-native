import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://68e4d69b8e116898997d30af.mockapi.io/todos";

export const fetchTodos = createAsyncThunk("todos/fetchAll", async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Error to fetch");
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
      body: JSON.stringify({ title }),
    });
    if (!res.ok) throw new Error("Error to fetch");
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
      body: JSON.stringify({ id, title }),
    });
    if (!res.ok) throw new Error("Error to fetch");
    const data = await res.json();
    return data;
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error to fetch");
  return id;
});

export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async ({ id, completed }) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed }),
    });
    if (!res.ok) throw new Error("Error to fetch");
    const data = await res.json();
    return data;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export default todosSlice.reducer;
