import { omit } from "lodash";
import { RootState } from "../../../app/store";
import { createSelector } from "@reduxjs/toolkit";
import { selectUsers } from "../../users/model/selectors";

import type { Task } from "../types";
import type { User } from "../../users";

export const selectStatus = (state: RootState) => state.tasks.status;

export const selectTasks = (state: RootState) => state.tasks.tasks;

export const selectCreatedTask = (state: RootState) => state.tasks.createdTask;

export const selectTaskById = (id: string) => {
  return (state: RootState) => state.tasks.tasks.find((task) => task.id === id);
}

export const selectTaskByIdWithUnsavedChanges = (id: string) => createSelector(
  selectTaskById(id),
  (task) => ({
    ...omit(task, 'unsavedChanges'),
    ...task?.unsavedChanges,
}))

export const selectTasksWithUsers = createSelector(
  selectTasks,
  selectUsers,
  (tasks: Task[], users: User[]) => {
    return tasks.map((task: Task) => {
      const user = users.find((user) => user.id === task.assignee)

      if (!user) {
        return task
      }

      return {
        ...task,
        assignee: user.first_name + ' ' + user.last_name,
      }
    })
  }
)
