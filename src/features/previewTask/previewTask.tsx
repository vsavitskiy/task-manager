import React from "react";
import { Task } from "../../entities/tasks";
import { TaskActions } from "../taskActions";
import { formatTaskDuration } from "./helpers";
import { UserCard } from "../../entities/users/ui/userCard";

import styles from './previewTask.module.scss';

export interface PreviewTaskProps {
  task: Task
}

export const PreviewTask: React.FC<PreviewTaskProps> = (props) => {
  const { task } = props;
  const { name, assignee, starts_at, due_at, description } = task;

  return (
    <div className={styles.editTaskForm}>
      <div className={styles.heading}>
        <div>{name}</div>
        <TaskActions task={task} />
      </div>

      <div>
        <div>
          <div>Schedule</div>
          {
            (starts_at && due_at)
              ? formatTaskDuration(starts_at, due_at)
              : null
          }
        </div>
        <div>
          <div>Description</div>
          {description}
        </div>
      </div>

      {
        assignee
          ? (
            <div>
              <div>Assigned to</div>
              <UserCard id={task.assignee} />
            </div>
          ) : null
      }
    </div>
  )
}
