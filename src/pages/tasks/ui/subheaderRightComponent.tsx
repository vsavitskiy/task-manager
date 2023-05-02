import React, {SyntheticEvent, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../shared/ui/button";
import { Modal } from "../../../shared/ui/modal";
import { CreateTaskForm } from "../../../features/createTask";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import { tasksActions } from "../../../entities/tasks";
import {selectCreatedTask} from "../../../entities/tasks/model/selectors";
import {TASK_ROUTE} from "../[id]/constants";
import {generatePath} from "react-router";

export const SubheaderRightComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>('');

  const createdTask = useAppSelector(selectCreatedTask);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (createdTask) {
      dispatch(tasksActions.created(null))
      navigate(generatePath(TASK_ROUTE, { id: createdTask }), { replace: true });
    }
  }, [createdTask, navigate]);

  const createTask = () => {
    const task = {
      name: taskName,
      assignee: '',
      starts_at: null,
      due_at: null,
      description: ''
    };

    dispatch({ type: tasksActions.create, payload: task });
    handleModalClose();
  }

  return (
    <>
      <Button variant="primary" onClick={handleClick}>ADD TASK</Button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        showDiscardButton={false}
        actionButtons={<a href="#" onClick={createTask}>CREATE TASK</a>}
      >
        <CreateTaskForm onChange={setTaskName} value={taskName} />
      </Modal>
    </>
  )
}
