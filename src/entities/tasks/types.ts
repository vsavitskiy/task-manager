export interface Task {
  id?: string;
  name: string;
  assignee: string;
  starts_at: string | null;
  due_at: string | null;
  description: string;
  unsaved_changes?: Task | null;
}

export type PayloadTask = Omit<Task, 'unsaved_changes'>
