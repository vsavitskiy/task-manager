import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { Task, tasksSelectors } from "../../../entities/tasks";

export const selectSearchQuery = (state: RootState) => state.search.search_query;
export const selectSearchModalState = (state: RootState) => state.search.modal_opened;

export const selectSearchResults = createSelector(
  selectSearchQuery,
  tasksSelectors.selectTasks,
  (query: string, tasks: Task[]) => {
    return tasks.reduce((previousValue: Task[], task) => {
        const trimmedValue = query.toLowerCase().trim();
        const taskName = task.name.toLowerCase();
        const taskDescription = task.name.toLowerCase();

        const isTaskContaining = taskName.indexOf(trimmedValue) > -1
          || taskDescription.indexOf(trimmedValue) > -1;

        if (isTaskContaining) {
            return [...previousValue, task];
        }

        return previousValue;
    }, []);
  }
);
