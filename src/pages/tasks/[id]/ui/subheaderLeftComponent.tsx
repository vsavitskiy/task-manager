import React from "react";
import { Link, useParams } from "react-router-dom";
import { TASKS_ROUTE } from "../../index";
import { Input } from "../../../../shared/ui/input";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { tasksActions, tasksSelectors } from "../../../../entities/tasks";

export const SubheaderLeftComponent = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const task = useAppSelector(tasksSelectors.selectTaskByIdWithUnsavedChanges(String(id)));

  const handleTaskNameChange = (value: string) => {
    dispatch(tasksActions.updateTask({
      id,
      name: value,
    }))
  }

  return (
    <div>
      <Link to={TASKS_ROUTE}>Back to Tasks</Link>
      <br />
      <Input value={task ? task.name : ''} onChange={handleTaskNameChange} />
    </div>
  )
}
