import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus } from "../../shared/types";

interface AppState {
  status: LoadingStatus;
}

const initialState: AppState = {
  status: 'idle',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
});

export const appActions = appSlice.actions;

export const appReducer = appSlice.reducer;
