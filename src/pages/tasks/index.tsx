import React from "react";
import { TasksList } from "../../widgets/tasksList";

export const TASKS_ROUTE = 'tasks'

export { SubheaderRightComponent } from './ui/subheaderRightComponent'

export const Tasks: React.FC = () => {
  return (
    <div>
      <TasksList />
    </div>
  )
}
