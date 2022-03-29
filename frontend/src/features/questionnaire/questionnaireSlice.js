import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import questionnaireService from './questionnaireService';

const initialState = {
  questionnaires: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create a new questionnaire
export const createQuestionnaire = createAsyncThunk(
  'questionnaires/create',
  async (questionnaireData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await questionnaireService.createQuestionnaire(questionnaireData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get User questionnaires
export const getQuestionnaires = createAsyncThunk('questionnaires/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await questionnaireService.getQuestionnaires(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete Questionnaire
export const deleteQuestionnaire = createAsyncThunk(
  'questionnaires/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await questionnaireService.deleteQuestionnaire(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// TODO UpdateQuestionnaire

export const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQuestionnaire.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuestionnaire.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.questionnaires.push(action.payload);
      })
      .addCase(createQuestionnaire.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getQuestionnaires.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuestionnaires.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.questionnaires = action.payload;
      })
      .addCase(getQuestionnaires.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteQuestionnaire.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteQuestionnaire.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.questionnaires = state.questionnaire.filter(
          (questionnaire) => questionnaire._id !== action.payload.id
        );
      })
      .addCase(deleteQuestionnaire.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset } = questionnaireSlice.actions;
export default questionnaireSlice.reducer;
