import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatus } from "../../../shared/types";
import { findTaskByIndex } from "./helpers";

import type { PayloadTask, Task } from "../types";

export interface TasksState {
  tasks: Task[];
  status: LoadingStatus;
  createdTask: string | null;
}

const initialState: TasksState = {
  tasks: [],
  status: 'idle',
  createdTask: null,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    update: (state, action: PayloadAction<PayloadTask[]>) => {
      state.tasks = action.payload as Task[];
    },
    updateStatus: (state, action: PayloadAction<LoadingStatus>) => {
      state.status = action.payload;
    },
    created: (state, action: PayloadAction<string | null>) => {
      state.createdTask = action.payload;
    },
    updateTask: (state, action: PayloadAction<any>) => {
      const index = findTaskByIndex(state.tasks, action.payload.id);

      if (index !== null) {
        state.tasks[index] = {
          ...state.tasks[index],
          unsaved_changes: {
            ...(state.tasks[index].unsaved_changes && state.tasks[index].unsaved_changes),
            ...action.payload
          }
        };
      }
    },
    clearTaskChanges: (state, action: PayloadAction<string>) => {
      const index = findTaskByIndex(state.tasks, action.payload);

      if (index !== null) {
        state.tasks[index] = {
          ...state.tasks[index],
          unsaved_changes: null,
        }
      }
    },
    taskSaved: (state, action: PayloadAction<Task>) => {
      const index = findTaskByIndex(state.tasks, action.payload.id);

      if (index !== null) {
        state.tasks[index] = {
          ...action.payload,
          unsaved_changes: null
        };
      }
    }
  },
});

export const tasksReducer = tasksSlice.reducer;
export const tasksActions = {
  ...tasksSlice.actions,

  // SAGAS ACTIONS
  fetch: 'tasks/fetch',
  remove: 'tasks/remove',
  create: 'tasks/create',
  save: 'task/save'
};
