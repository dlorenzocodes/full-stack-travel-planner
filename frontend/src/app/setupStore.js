import { combineReducers, configureStore } from "@reduxjs/toolkit";
import recomendationReducer from "../features/recomendations/recomendationSlice";
import destinationReducer from "../features/destination/destinationSlice";

const rootReducer = combineReducers({
  recomendation: recomendationReducer,
  destination: destinationReducer,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
