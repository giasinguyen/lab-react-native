import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "https://68e4d69b8e116898997d30af.mockapi.io/todos";

export const fetchTodos = createAsyncThunk("todos/fetchAll", async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Fail to fetch");
  const data = await res.json();
  return data;
});

export const createTodo = createAsyncThunk("todos/create", async (title) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) throw new Error("Fail to create!");
  const data = await res.json();
  return data;
});

export const updateTodo = createAsyncThunk(
  "todos/update",
  async ({ id, title }) => {
    const res = await fetch("${BASE_URL}/${id}", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title }),
    });

    if (!res.ok) throw new Error("Fail to create!");
    const data = await res.json();
    return data;
  }
);

export const deleteToto = createAsyncThunk("todos/delete", async (id) => {
  const res = await fetch("${BASE_URL}/${id}", {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Fail to create!");
  return id;
});

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
        state.error = action.error.meesage || "Error";
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p.id == action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteToto.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export default todosSlice.reducer;
