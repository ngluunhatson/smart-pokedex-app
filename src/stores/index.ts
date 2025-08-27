import { configureStore } from "@reduxjs/toolkit";
import { appStateSlice } from "./app-state/slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      appState: appStateSlice.reducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
