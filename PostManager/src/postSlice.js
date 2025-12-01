import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

// READ: lấy danh sách
export const fetchPosts = createAsyncThunk('posts/fetchAll', async () => {
  const res = await fetch(`${BASE_URL}?_limit=10`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  const data = await res.json();
  return data; // [{id, title, body, ...}]
});

// CREATE
export const createPost = createAsyncThunk(
  'posts/create',
  async ({ title, body }) => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body }),
    });
    if (!res.ok) throw new Error('Failed to create');
    const data = await res.json();
    return data; // jsonplaceholder trả về id giả
  }
);

// UPDATE
export const updatePost = createAsyncThunk(
  'posts/update',
  async ({ id, title, body }) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, title, body }),
    });
    if (!res.ok) throw new Error('Failed to update');
    const data = await res.json();
    return data;
  }
);

// DELETE
export const deletePost = createAsyncThunk('posts/delete', async id => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete');
  return id; // tự xoá trong state
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // fetch list
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      })

      // create
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })

      // update
      .addCase(updatePost.fulfilled, (state, action) => {
        const idx = state.items.findIndex(p => p.id === action.payload.id);
        if (idx !== -1) {
          state.items[idx] = action.payload;
        }
      })

      // delete
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
