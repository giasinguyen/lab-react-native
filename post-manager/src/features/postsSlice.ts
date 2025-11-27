import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

type Post = {
  userId?: number;
  id: number;
  title: string;
  body: string;
};

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk<Post[]>(
  "posts/fetchAll",
  async () => {
    const res = await fetch(`${BASE_URL}?_limit=10`);
    if (!res.ok) throw new Error("Failed to fetch posts");
    const data: Post[] = await res.json();
    return data;
  }
);

export const createPost = createAsyncThunk<
  Post,
  { title: string; body: string }
>("posts/create", async ({ title, body }) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body }),
  });
  if (!res.ok) throw new Error("Failed to create");
  const data: Post = await res.json();
  return data;
});

export const updatePost = createAsyncThunk<
  Post,
  { id: number; title: string; body: string }
>("posts/update", async ({ id, title, body }) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, title, body }),
  });
  if (!res.ok) throw new Error("Failed to update");
  const data: Post = await res.json();
  return data;
});

export const deletePost = createAsyncThunk<number, number>(
  "posts/delete",
  async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete");
    return id;
  }
);

interface PostsState {
  items: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  items: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error";
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.items.unshift(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
