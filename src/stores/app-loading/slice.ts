import { createSlice } from "@reduxjs/toolkit";
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
  reducers: {},
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
