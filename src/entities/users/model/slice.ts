import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatus } from "../../../shared/types";
import { User } from "../types";

export interface UsersState {
  users: User[];
  status: LoadingStatus;
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload
    },
    updateStatus: (state, action: PayloadAction<LoadingStatus>) => {
      state.status = action.payload;
    },
  },
});

export const usersActions = {
  ...usersSlice.actions,

  // SAGAS ACTIONS
  fetch: 'users/fetch',
};

export const usersReducer = usersSlice.reducer;
