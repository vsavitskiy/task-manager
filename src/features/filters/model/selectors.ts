import { RootState } from "../../../app/store";
import { createSelector } from "@reduxjs/toolkit";
import { selectTasks } from "../../../entities/tasks/model/selectors";
import { filterTasks } from "./helpers";

export const selectFilters = (state: RootState) => state.filters;

export const selectFilteredTasks = createSelector(
  selectFilters,
  selectTasks,
  filterTasks
)
