import { createSlice } from '@reduxjs/toolkit';

export interface AppState {
  status: 'idle' | 'loading' | 'failed';
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
