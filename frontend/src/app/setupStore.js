import { combineReducers, configureStore } from "@reduxjs/toolkit";
import recomendationReducer from "../features/recomendations/recomendationSlice";
import destinationReducer from "../features/destination/destinationSlice";
import modalReducer from "../features/modals/modalSlice";
import authReducer from "../features/auth/authSlice";

const rootReducer = combineReducers({
  recomendation: recomendationReducer,
  destination: destinationReducer,
  modal: modalReducer,
  auth: authReducer,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
