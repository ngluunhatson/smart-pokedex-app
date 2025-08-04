import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateAppPokemonThunk } from "../thunks";

export interface AppLoadingState {
  isLoading: boolean;
  status: "idle" | "loading" | "success" | "error";
}

const initialState: AppLoadingState = {
  isLoading: false,
  status: "idle",
};

export const appLoadingSlice = createSlice({
  name: "appLoading",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setStatus: (state, action: PayloadAction<AppLoadingState["status"]>) => {
      state.status = action.payload;
    },
    setState: (state, action: PayloadAction<Partial<AppLoadingState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectStatus: (state) => state.status,
  },
  extraReducers: (builder) => {
    builder.addCase(updateAppPokemonThunk.pending, (state) => {
      return {
        ...state,
        status: "loading",
        isLoading: true,
      };
    });
    builder.addCase(updateAppPokemonThunk.fulfilled, (state) => {
      return {
        ...state,
        status: "success",
        isLoading: false,
      };
    });
    builder.addCase(updateAppPokemonThunk.rejected, (state) => {
      return {
        ...state,
        status: "error",
        isLoading: false,
      };
    });
  },
});
