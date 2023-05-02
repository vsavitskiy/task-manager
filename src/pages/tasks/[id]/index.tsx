import React from "react";
import { parseISO } from "date-fns";
import { Navigate, useParams } from "react-router-dom";
import { DatePicker } from "../../../shared/ui/datepicker";
import { Textarea } from "../../../shared/ui/textarea";
import { Preloader } from "../../../shared/ui/preloader";
import { UsersSelect } from "../../../entities/users/ui/usersSelect";

import { tasksActions, tasksSelectors } from "../../../entities/tasks";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import styles from './index.module.scss';

export { SubheaderLeftComponent } from './ui/subheaderLeftComponent';
export { SubheaderRightComponent } from './ui/subheaderRightComponent';

export const Task: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const status = useAppSelector(tasksSelectors.selectStatus);
  const task = useAppSelector(tasksSelectors.selectTaskByIdWithUnsavedChanges(String(id)));

  const { starts_at, due_at, description, assignee } = task;

  if (status === 'loading') {
    return <Preloader />
  }

  if (!task) {
    return <Navigate to="/404" replace />
  }

  const handleChange = (field: string, value: string) => {
    dispatch(tasksActions.updateTask({
      id,
      [field]: value,
    }))
  }

  return (
    <div className={styles.page}>
      <div className={styles.leftSide}>
        <h2>Schedule</h2>
        <div className={styles.dates}>
          <DatePicker
            name="startingDate"
            label="Starting date"
            selected={starts_at ? parseISO(starts_at) : null}
            onChange={(date) => {
              if (!date) {
                return
              }

              handleChange('starts_at', date.toISOString())
            }}
          />
          <DatePicker
            name="startingTime"
            label="Starting time"
            calendarClassName={styles.timeSelect}
            selected={starts_at ? parseISO(starts_at) : null}
            onChange={(date) => {
              if (!date) {
                return
              }

              handleChange('starts_at', date.toISOString())
            }}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            dateFormat="h:mm aa"
          />

          <DatePicker
            name="dueDate"
            label="Due date"
            selected={due_at ? parseISO(due_at) : null}
            onChange={(date) => {
              if (!date) {
                return
              }

              handleChange('due_at', date.toISOString())
            }}
          />
          <DatePicker
            name="dueTime"
            label="Due time"
            calendarClassName={styles.timeSelect}
            selected={due_at ? parseISO(due_at) : null}
            onChange={(date) => {
              if (!date) {
                return
              }

              handleChange('due_at', date.toISOString())
            }}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            dateFormat="h:mm aa"
          />
        </div>

        <h2>Details</h2>
        <Textarea
          name="description"
          label="Description"
          value={description}
          onChange={(value) => handleChange('description', value)}
        />
      </div>

      <div className={styles.rightSide}>
        <h2>Users</h2>

        <UsersSelect
          value={assignee}
          onChange={(value) => handleChange('assignee', value)}
        />
      </div>
    </div>
  )
}
