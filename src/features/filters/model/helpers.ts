import { isAfter, isBefore, parseISO, set } from "date-fns";
import { FiltersState } from "./slice";
import { Task } from "../../../entities/tasks";

export const filterTasks = (filters: FiltersState, tasks: Task[]) => {
  let filteredTasks = [...tasks];

  if (filters.assignee) {
    filteredTasks = filteredTasks.filter(task => task.assignee === filters.assignee);
  }

  if (filters.starts_at) {
    filteredTasks = filteredTasks.filter(
      task => task.starts_at && compareDate(task.starts_at, filters.starts_at) === 0
    )
  }

  if (filters.due_at) {
    filteredTasks = filteredTasks.filter((
      task => task.due_at && compareDate(task.due_at, filters.due_at) === 0
    ))
  }

  return filteredTasks;
}

const compareDate = (dateA: string | null, dateB: string | null) => {
  if (!dateA || !dateB) {
    throw new Error('Date cannot be null. Check compareDate function parameters');
  }

  let parsedDateA = parseISO(dateA);
  let parsedDateB = parseISO(dateB);

  parsedDateA = set(parsedDateA, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  parsedDateB = set(parsedDateB, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });

  if (isBefore(parsedDateA, parsedDateB)) {
    return 1;
  } else if (isAfter(parsedDateA, parsedDateB)) {
    return -1;
  }

  return 0;
}
