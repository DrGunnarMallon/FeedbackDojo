import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import lectureService from './lectureService';

const initialState = {
  lectures: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create a new lecture
export const createLecture = createAsyncThunk('lectures/create', async (lectureData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await lectureService.createLecture(lectureData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get User Lectures
export const getLectures = createAsyncThunk('lectures/getAll', async (courseId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await lectureService.getLectures(token, courseId);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete Lecture
export const deleteLecture = createAsyncThunk('lectures/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await lectureService.deleteLecture(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const lectureSlice = createSlice({
  name: 'lecture',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLecture.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLecture.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.lectures.push(action.payload);
      })
      .addCase(createLecture.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getLectures.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLectures.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.lectures.push(action.payload);
      })
      .addCase(getLectures.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteLecture.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLecture.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.lectures = state.lectures.filter((lecture) => lecture._id !== action.payload.id);
      })
      .addCase(deleteLecture.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset } = lectureSlice.actions;
export default lectureSlice.reducer;
