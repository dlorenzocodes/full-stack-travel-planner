import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import errorReducer from '../features/error/errorSlice'
import modalReducer from '../features/modals/modalSlice'
import recomendationReducer from '../features/recomendations/recomendationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorReducer,
    modal: modalReducer,
    recomendation: recomendationReducer
  },
});
