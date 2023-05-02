import React, { SyntheticEvent, useState } from "react";
import { generatePath } from "react-router";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { Task, tasksActions } from "../../entities/tasks";
import { Modal } from "../../shared/ui/modal";

import { TASK_ROUTE } from "../../pages/tasks/[id]/constants";

import { ReactComponent as PencilIcon } from "../../features/taskActions/icons/pencil.svg";
import { ReactComponent as BinIcon } from "../../features/taskActions/icons/bin.svg";

import styles from './taskActions.module.scss';

export interface TaskActionsProps {
  task: Task;
}

export const TaskActions: React.FC<TaskActionsProps> = (props) => {
  const { task } = props;
  const dispatch = useAppDispatch();
  const [removingModalIsOpen, setRemovingModalIsOpen] = useState<boolean>(false);

  const handleRemovingConfirmation = () => {
    dispatch({ type: tasksActions.remove, payload: task.id });
  }

  const handleRemovingConfirmationClose = () => {
    setRemovingModalIsOpen(false);
  }

  const handleRemoveButtonClick = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setRemovingModalIsOpen(true);
  }

  return (
    <div className={styles.taskActions}>
      <Link to={generatePath(TASK_ROUTE, { id: task.id || '' })}>
        <PencilIcon width={15} height={17}/>
      </Link>

      <a
        href="#"
        onClick={(e) => handleRemoveButtonClick(e)}
      >
        <BinIcon width={14} height={18} />
      </a>

      <Modal
        isOpen={removingModalIsOpen}
        onClose={handleRemovingConfirmationClose}
        onSubmit={handleRemovingConfirmation}
      >
        <h3>Are you sure you want to delete?</h3>
      </Modal>
    </div>
  )
}
