export interface Task {
  id?: string;
  name: string;
  assignee: string;
  starts_at: string | null;
  due_at: string | null;
  description: string;
  unsavedChanges: Task | null;
}
