import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://68e4d69b8e116898997d30af.mockapi.io/grocery";

// Lấy danh sách tất cả các món ăn
export const fetchGroceries = createAsyncThunk("grocery/fetchAll", async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Lỗi khi tải dữ liệu");
  const data = await res.json();
  return data;
});

// Tạo mới một món ăn
export const createGrocery = createAsyncThunk(
  "grocery/create",
  async (grocery) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(grocery),
    });

    if (!res.ok) throw new Error("Lỗi khi tạo mới món ăn");
    const data = await res.json();
    return data;
  }
);

// Cập nhật thông tin một món ăn
export const updateGrocery = createAsyncThunk(
  "grocery/update",
  async (grocery) => {
    const res = await fetch(`${API_URL}/${grocery.id}`, {
      method: "PUT",  // Sử dụng PUT để cập nhật
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(grocery),
    });

    if (!res.ok) throw new Error("Lỗi khi cập nhật món ăn");
    const data = await res.json();
    return data;
  }
);

// Xóa một món ăn
export const deleteGrocery = createAsyncThunk(
  "grocery/delete",
  async (grocery) => {
    const res = await fetch(`${API_URL}/${grocery.id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Lỗi khi xóa món ăn");
    return grocery.id;  // Trả về id của món ăn để xóa khỏi state
  }
);

const grocery = createSlice({
  name: "groceries",  // Sửa chính tả
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Khi lấy danh sách món ăn thành công
      .addCase(fetchGroceries.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      // Khi tạo món ăn mới thành công
      .addCase(createGrocery.fulfilled, (state, action) => {
        state.items.unshift(action.payload);  // Thêm món ăn mới vào đầu danh sách
      })
      // Khi cập nhật món ăn thành công
      .addCase(updateGrocery.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) {
          state.items[idx] = action.payload;
        }
      })
      .addCase(deleteGrocery.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export default grocery.reducer;
