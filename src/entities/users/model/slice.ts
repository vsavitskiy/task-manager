import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { User } from "../types";
import {Task} from "../../tasks";
import {Status} from "../../tasks/model/slice";

export interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
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
    updateStatus: (state, action: PayloadAction<Status>) => {
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
