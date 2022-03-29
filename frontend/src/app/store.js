import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import courseReducer from '../features/courses/courseSlice';
import lectureReducer from '../features/lectures/lectureSlice';
import questionnaireReducer from '../features/questionnaire/questionnaireSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    lectures: lectureReducer,
    questionnaires: questionnaireReducer,
  },
});
