import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { updateAppPokemonThunk } from "../thunks";

export interface AppState {
  isUpdating: boolean;
  isLoading: boolean;
  status: "idle" | "loading" | "success" | "error";
}

const initialState: AppState = {
  isUpdating: false,
  isLoading: false,
  status: "idle",
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsUpdating: (state, action: PayloadAction<boolean>) => {
      state.isUpdating = action.payload;
    },
    setStatus: (state, action: PayloadAction<AppState["status"]>) => {
      state.status = action.payload;
    },
    setState: (state, action: PayloadAction<Partial<AppState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  selectors: {
    selectIsUpdating: (state) => state.isUpdating,
    selectIsLoading: (state) => state.isLoading,
    selectStatus: (state) => state.status,
    selectAppState: (state) => state,
  },
  extraReducers: (builder) => {
    builder.addCase(updateAppPokemonThunk.pending, (state) => {
      return {
        ...state,
        status: "loading",
        isUpdating: true,
      };
    });
    builder.addCase(updateAppPokemonThunk.fulfilled, (state) => {
      return {
        ...state,
        status: "success",
        isUpdating: false,
      };
    });
    builder.addCase(updateAppPokemonThunk.rejected, (state) => {
      return {
        ...state,
        status: "error",
        isUpdating: false,
      };
    });
  },
});

export const appStateSelector = appStateSlice.getSelectors(
  (state: RootState) => state.appState,
);
export const appStateActions = appStateSlice.reducer;
