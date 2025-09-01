import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../lib/axiosInstance';
import toast from 'react-hot-toast';

/*
  Get all tasks
*/
const getAllTasks = createAsyncThunk(
  'task2/getAllTasks',
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await axiosInstance.get('/task');
      return response.data;
    } catch (error) {
      if (error?.response?.status === 429) {
        console.log('Rate Limit Reached!');
        toast.error(
          'You are making too many requests. Please try again later.',
          {
            icon: '💀',
            duration: 5000,
            className: 'bg-black/50 text-white border-2 border-white',
          }
        );
        return rejectWithValue({
          isRateLimit: true,
          message: 'Rate limit reached. Try again later.',
        });
      }
      return rejectWithValue({
        isRateLimit: false,
        message: error?.message || 'Something went wrong',
      });
    }
  }
);

/*
  Get task by id
*/
const getTaskById = createAsyncThunk(
  'task2/getTaskById',
  async ({ id }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await axiosInstance.get(`/task/${id}`);
      return response.data;
    } catch (error) {
      if (error?.response?.status === 429) {
        console.log('Rate Limit Reached!');
        toast.error(
          'Slow down! You are making too many requests. Please try again later.',
          {
            icon: '💀',
            duration: 5000,
          }
        );
        return rejectWithValue({
          isRateLimit: true,
          message: 'Rate limit reached. Try again later.',
        });
      }
      return rejectWithValue({
        isRateLimit: false,
        message: error?.message || 'Something went wrong',
      });
    }
  }
);

/*
    Create Task
*/
const createTask = createAsyncThunk(
  'task2/createTask',
  async ({ task }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await axiosInstance.post('/task', { ...task });
      toast.success("Create Task Successfully!")
      return response.data;
    } catch (error) {
      if (error?.response?.status === 429) {
        console.log('Rate Limit Reached!');
        toast.error(
          'Slow down! You are Creating too many tasks. Please try again later.',
          {
            icon: '💀',
            duration: 5000,
          }
        );
        return rejectWithValue({
          isRateLimit: true,
          message: 'Rate limit reached. Try again later.',
        });
      }
      toast.error("Cann't Create Task!")
      return rejectWithValue({
        isRateLimit: false,
        message: error?.message || 'Something went wrong',
      });
    }
  }
);

/*
    Delete Task
*/
const deleteTask = createAsyncThunk(
  'task2/deleteTask',
  async ({ id }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await axiosInstance.delete(`/task/${id}`);
      toast.success("Delete Task Successfully!")
      return response.data;
    } catch (error) {
      if (error?.response?.status === 429) {
        console.log('Rate Limit Reached!');
        toast.error(
          'Slow down! You are Deleting too many tasks. Please try again later.',
          {
            icon: '💀',
            duration: 5000,
          }
        );
        return rejectWithValue({
          isRateLimit: true,
          message: 'Rate limit reached. Try again later.',
        });
      }
        toast.error("Cann't Delete Task!")
      return rejectWithValue({
        isRateLimit: false,
        message: error?.message || 'Something went wrong',
      });
    }
  }
);

/*
    Update Task
*/
const updateTask = createAsyncThunk(
  'task2/updateTask',
  async ({ id, task }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await axiosInstance.put(`/task/${id}`, { ...task });
      toast.success("Update Task Successfully!")
      return response.data;
    } catch (error) {
      if (error?.response?.status === 429) {
        console.log('Rate Limit Reached!');
        toast.error(
          'Slow down! You are Updating too many tasks. Please try again later.',
          {
            icon: '💀',
            duration: 5000,
          }
        );
        return rejectWithValue({
          isRateLimit: true,
          message: 'Rate limit reached. Try again later.',
        });
      }
      toast.error("Cann't Update Task!")
      return rejectWithValue({
        isRateLimit: false,
        message: error?.message || 'Something went wrong',
      });
    }
  }
);

// Slice
const task2Slice = createSlice({
  name: 'task2',
  initialState: {
    tasks: [],
    taskDetails: null,
    taskId: null,
    isRateLimit: false,
    isLoading: false,
    isError: false,
    errorMsg: null,
    showTaskModel: false,
  },
  reducers: {
    setTaskId: (state, action) => {
      if (!action.payload) {
        state.taskDetails = null;
        state.taskId = null;
        return;
      }
      state.taskId = action.payload;
    },
    setShowTaskModel: (state, action) => {
      state.showTaskModel = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get all tasks
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isRateLimit = false;
        state.errorMsg = null;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.isRateLimit = false;
        state.errorMsg = null;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.tasks = [];
        state.isLoading = false;
        state.isError = true;
        state.isRateLimit = action.payload?.isRateLimit || false;
        state.errorMsg = action.payload?.message || 'Error fetching tasks';
        state.showTaskModel = false;
      });

    // Get task by id
    builder
      .addCase(getTaskById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isRateLimit = false;
        state.errorMsg = null;
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.taskDetails = action.payload.task;
        state.isLoading = false;
        state.isError = false;
        state.isRateLimit = false;
        state.errorMsg = null;
        state.showTaskModel = true;
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.taskDetails = null;
        state.isLoading = false;
        state.isError = true;
        state.isRateLimit = action.payload?.isRateLimit || false;
        state.errorMsg = action.payload?.message || 'Error fetching task';
        state.showTaskModel = false;
      });

    // Create Task
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isRateLimit = false;
        state.errorMsg = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload.newTask);
        state.isLoading = false;
        state.isError = false;
        state.isRateLimit = false;
        state.errorMsg = null;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isRateLimit = action.payload?.isRateLimit || false;
        state.errorMsg = action.payload?.message || 'Error creating task';
        state.showTaskModel = false;
      });

    // Delete Task
    builder
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isRateLimit = false;
        state.errorMsg = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task._id !== action.payload.deletedTask._id
        );
        state.isLoading = false;
        state.isError = false;
        state.isRateLimit = false;
        state.errorMsg = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isRateLimit = action.payload?.isRateLimit || false;
        state.errorMsg = action.payload?.message || 'Error deleting task';
        state.showTaskModel = false;
      });

    // Update Task
    builder
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isRateLimit = false;
        state.errorMsg = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) => {
          if (task._id === action.payload.updatedTask._id) {
            return action.payload.updatedTask;
          }
          return task;
        });
        state.isLoading = false;
        state.isError = false;
        state.isRateLimit = false;
        state.errorMsg = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isRateLimit = action.payload?.isRateLimit || false;
        state.errorMsg = action.payload?.message || 'Error updating task';
        state.showTaskModel = false;
      });
  },
});

export default task2Slice.reducer;
export { getAllTasks, getTaskById, createTask, deleteTask, updateTask };
export const { setTaskId, setShowTaskModel } = task2Slice.actions;
