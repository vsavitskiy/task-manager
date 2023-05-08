// TODO: remove it
// @ts-nocheck
import React, { SyntheticEvent, useState } from 'react';
import { Cell, useTable, useSortBy } from 'react-table';

import { useAppSelector } from "../../app/hooks";
import { usersSelectors } from '../../entities/users';
import { Task } from "../../entities/tasks";
import { Modal } from "../../shared/ui/modal";
import { Preloader } from "../../shared/ui/preloader";
import { PreviewTask } from "../../features/previewTask";
import { TaskActions } from "../../features/taskActions";
import { Filters, filtersSelectors } from "../../features/filters";
import { SortingButton } from "./ui/sortingButton";
import { formatDate } from "./helpers";

import styles from './tasksList.module.scss';


export const TasksList: React.FC = () => {
  const [taskModalIsOpen, setTaskModalIsOpen] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const tasks = useAppSelector(filtersSelectors.selectFilteredTasks);
  const status = useAppSelector(usersSelectors.selectStatus);
  const usersNameIdMapping = useAppSelector(usersSelectors.selectUsersNameIdMapping);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Task name',
        accessor: 'name',
      },
      {
        Header: 'Assignee',
        accessor: 'assignee',
        Cell: (cell: any) => usersNameIdMapping[cell.value]
      },
      {
        Header: 'Starts at',
        accessor: 'starts_at',
        Cell: (cell: any) => cell.value ? formatDate(cell.value) : ''
      },
      {
        Header: 'Due at',
        accessor: 'due_at',
        Cell: (cell: any) => cell.value ? formatDate(cell.value) : ''
      },
      {
        Header: () => null,
        id: 'actions',
        Cell: (cell: Cell) => (
          <div className={styles.actions}>
            <TaskActions task={cell.row.original as Task} />
          </div>
        )
      },
    ],
    [usersNameIdMapping]
  );

  const handlePreviewTask = (e: SyntheticEvent, task: Task) => {
    e.preventDefault();
    e.stopPropagation();

    if ((e.target as HTMLInputElement).getAttribute('role') === 'cell') {
      setCurrentTask(task);
      setTaskModalIsOpen(true);
    }
  }

  const handleTaskModalClose = () => {
    setTaskModalIsOpen(false);
  }

  const tableInstance = useTable<Task>({ columns, data: tasks }, useSortBy)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div className={styles.tasksList}>
      <Filters />

      {
        status === 'loading'
          ? <Preloader />
          : (
            <table {...getTableProps()}>
              <thead>
              {
                headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {
                      headerGroup.headers.map(column => {
                        if (column.id === 'actions') {
                          return <th {...column.getHeaderProps(column.getSortByToggleProps())} />
                        }

                        return (
                          <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                            { column.render('Header') }
                            {
                              column.isSorted
                                ? column.isSortedDesc
                                  ? <SortingButton state='active' direction='up' />
                                  : <SortingButton state='active' />
                                : <SortingButton state='inactive' />
                            }
                          </th>
                        )
                      })
                    }
                  </tr>
                ))
              }
              </thead>

              <tbody {...getTableBodyProps()}>
              {
                rows.map(row => {
                  prepareRow(row);

                  return (
                    <tr
                      {...row.getRowProps()}
                      onClick={(e) => handlePreviewTask(e, row.original)}
                    >
                      {
                        row.cells.map(cell => (
                          <td {...cell.getCellProps()}>
                            { cell.render('Cell') }
                          </td>
                        ))}
                    </tr>
                  )
                })
              }
              </tbody>
            </table>
          )
      }

      <Modal
        className={styles.taskModal}
        isOpen={taskModalIsOpen}
        onClose={handleTaskModalClose}
        showActionButtons={false}
      >
        <PreviewTask task={currentTask as Task} />
      </Modal>
    </div>
  )
}
