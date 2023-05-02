import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from "../types";
import { findTaskByIndex } from "./helpers";

export type Status = 'idle' | 'loading' | 'failed';

export interface TasksState {
  tasks: Task[];
  status: Status;
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
    update: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    updateStatus: (state, action: PayloadAction<Status>) => {
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
          unsavedChanges: {
            ...(state.tasks[index].unsavedChanges && state.tasks[index].unsavedChanges),
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
          unsavedChanges: null,
        }
      }
    },
    taskSaved: (state, action: PayloadAction<Task>) => {
      const index = findTaskByIndex(state.tasks, action.payload.id);

      if (index !== null) {
        state.tasks[index] = {
          ...action.payload,
          unsavedChanges: null
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
