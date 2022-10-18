import { combineReducers, configureStore } from "@reduxjs/toolkit";
import recomendationReducer from "../features/recomendations/recomendationSlice";

const rootReducer = combineReducers({
  recomendation: recomendationReducer,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
