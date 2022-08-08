import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import modalReducer from '../features/modals/modalSlice'
import tripReducer from '../features/trip/tripSlice'
import destinationReducer from '../features/destination/destinationSlice'
import recomendationReducer from '../features/recomendations/recomendationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    trip: tripReducer,
    destination: destinationReducer,
    recomendation: recomendationReducer
  },
});
