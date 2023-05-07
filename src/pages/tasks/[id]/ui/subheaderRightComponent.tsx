import React, { SyntheticEvent, useState } from "react";
import { generatePath } from "react-router";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { tasksActions, tasksSelectors} from "../../../../entities/tasks";
import { Button } from "../../../../shared/ui/button";
import { Modal } from "../../../../shared/ui/modal";
import { TASKS_ROUTE } from "../../index";

export const SubheaderRightComponent = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const task = useAppSelector(tasksSelectors.selectTaskById(String(id)));
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (task?.unsaved_changes) {
      setIsModalOpen(true);
    } else {
      navigate(generatePath(TASKS_ROUTE));
    }
  }

  const handleSave = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: tasksActions.save, payload: id });
    navigate(generatePath(TASKS_ROUTE));
  }

  const handleModalClosing = () => {
    setIsModalOpen(false)
  }

  const handleDiscardChanges = () => {
    dispatch(tasksActions.clearTaskChanges(String(id)));
    navigate(generatePath(TASKS_ROUTE));
  }

  return (
    (
      <div>
        <Button onClick={handleSave}>SAVE</Button>
        <Button onClick={handleCancel}>CANCEL</Button>
        {
          isModalOpen ? (
            <Modal
              isOpen={isModalOpen}
              discardButtonCaption="CANCEL"
              submitButtonCaption="DISCARD"
              onClose={handleModalClosing}
              onDiscard={handleModalClosing}
              onSubmit={handleDiscardChanges}
            >
              Discard unsaved changes
            </Modal>
          ) : null
        }
      </div>
    )
  )
}
