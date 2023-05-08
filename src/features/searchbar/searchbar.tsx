import React from 'react';
import { Link } from "react-router-dom";
import { generatePath } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSearchModalState, selectSearchQuery, selectSearchResults } from "./model/selectors";
import { searchActions } from './model/slice';
import { Input } from "../../shared/ui/input";
import { Modal } from "../../shared/ui/modal";

import { TASK_ROUTE } from "../../pages/tasks/[id]/constants";
import { ReactComponent as ZoomIcon } from "./icons/zoom.svg";
import { ReactComponent as OpenIcons } from "./icons/open.svg";

import type { FC } from 'react';

import styles from './searchbar.module.scss';

export const Searchbar: FC = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectSearchQuery);
  const isModalVisible = useAppSelector(selectSearchModalState);
  const foundTasks = useAppSelector(selectSearchResults);

  const handleChange = (value: string) => {
    dispatch(searchActions.setValue(value));
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      dispatch(searchActions.toggleModal());
    }
  }

  const handleModalClose = () => {
    dispatch(searchActions.toggleModal());
  }

  return (
    <div className={styles.searchbar}>
      <ZoomIcon width={12} height={12} />
      <Input
        placeholder="Search..."
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <Modal
        isOpen={isModalVisible}
        onClose={handleModalClose}
        showActionButtons={false}
      >
        <div>
          <h3>Results</h3>
          <div>Tasks containing “{value}”</div>

          <ul>
            {
              foundTasks.map((task) => (
                <li key={task.id}>
                  <span>{task.name}</span>
                  <Link
                    to={generatePath(TASK_ROUTE, { id: task.id as string })}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <OpenIcons width={14} height={14} />
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </Modal>
    </div>
  );
}
