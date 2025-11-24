import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from './types';
import {
  getAllTasks,
  insertTask,
  toggleTaskDone,
  deleteTask,
  getTaskById,
} from '../../db/tasks';

interface TasksState {
  items: Task[];
  loading: boolean;
  error?: string;
}

const initialState: TasksState = {
  items: [],
  loading: false,
};

export const fetchTasks = createAsyncThunk('tasks/fetchAll', async () => {
  const rows = await getAllTasks();
  return rows as Task[];
});

export const addTask = createAsyncThunk(
  'tasks/add',
  async (title: string, { dispatch }) => {
    await insertTask(title);
    await dispatch(fetchTasks());
  }
);

export const toggleDone = createAsyncThunk(
  'tasks/toggleDone',
  async ({ id, isDone }: { id: number; isDone: boolean }, { dispatch }) => {
    await toggleTaskDone(id, isDone);
    await dispatch(fetchTasks());
  }
);

export const removeTask = createAsyncThunk(
  'tasks/remove',
  async (id: number, { dispatch }) => {
    await deleteTask(id);
    await dispatch(fetchTasks());
  }
);

export const fetchTaskById = createAsyncThunk(
  'tasks/fetchById',
  async (id: number) => {
    const row = await getTaskById(id);
    return row as Task | null;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tasksSlice.reducer;
