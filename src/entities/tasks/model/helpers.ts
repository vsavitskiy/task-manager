import { Task } from "../types";

export const findTaskByIndex = (tasks: Task[], id?: string): number | null => {
  if (!id) {
    return null
  }

  return tasks
  .map((task: Task) => task.id)
  .indexOf(id);
}
