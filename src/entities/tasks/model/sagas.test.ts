import { Action } from "@reduxjs/toolkit";
import { runSaga } from "redux-saga";
import { omit } from "lodash";
import { toast } from "react-toastify";
import { createTask, fetchTasks, removeTask, saveTask } from "./sagas";
import { tasksActions } from "./slice";
import * as api from "../../tasks/model/api";

import type { PayloadTask, Task } from "../types";

const dummyTasks: PayloadTask[] = [
  {
    "id": "0",
    "name": "Cleaning after every reservation",
    "assignee": "1",
    "starts_at": "2023-05-01T18:05:31Z",
    "due_at": "2023-05-01T20:05:31Z",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
  },
  {
    "id": "1",
    "name": "Maintenance services",
    "assignee": "2",
    "starts_at": "2023-05-01T18:05:31Z",
    "due_at": "2023-05-01T20:05:31Z",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
  },
  {
    "id": "2",
    "name": "Security patrol222",
    "assignee": "3",
    "starts_at": "2023-05-01T18:05:31Z",
    "due_at": "2023-05-01T20:05:31Z",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
  },
  {
    "id": "3",
    "name": "Maintenance services II",
    "assignee": "4",
    "starts_at": "2023-05-01T18:05:31Z",
    "due_at": "2023-05-01T20:05:31Z",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
  },
  {
    "id": "4",
    "name": "Cleaning before every reservation",
    "assignee": "5",
    "starts_at": "2023-05-01T18:05:31Z",
    "due_at": "2023-05-01T20:05:31Z",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
  },
];

describe('Fetch Tasks',  () => {
  it('Should wait for every "tasksActions.fetch" action and call api request', async () => {
    const dispatched: Action[] = [];
    const fetchTasksMockFn = jest
      .spyOn(api, 'getTasksApiRequest')
      .mockImplementation(() => Promise.resolve(dummyTasks));

    await runSaga({
      dispatch: (action: Action) => dispatched.push(action),
      // @ts-ignore
    }, fetchTasks);

    expect(fetchTasksMockFn).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([
      tasksActions.updateStatus('loading'),
      tasksActions.update(dummyTasks),
      tasksActions.updateStatus('idle')
    ]);
    fetchTasksMockFn.mockClear();
  });

  it('Should call api and dispatch error action', async () => {
    const dispatched: Action[] = [];
    const fetchTasksMockFn = jest
      .spyOn(api, 'getTasksApiRequest')
      .mockImplementation(() => Promise.reject());

    await runSaga({
      dispatch: (action: Action) => dispatched.push(action),
      // @ts-ignore
    }, fetchTasks);

    expect(fetchTasksMockFn).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([
      tasksActions.updateStatus('loading'),
      tasksActions.updateStatus('failed')
    ]);
    fetchTasksMockFn.mockClear();
  });
});

describe('Delete Task',  () => {
  const mockTaskId = '0';

  it('Should wait for every "tasksActions.remove" action and call api request', async () => {
    const dispatched: Action[] = [];
    const removeTaskMockFn = jest
      .spyOn(api, 'deleteTaskApiRequest')
      .mockImplementation(() => Promise.resolve());

    await runSaga({
      dispatch: (action: Action) => dispatched.push(action),
      getState: () => ({ tasks: { tasks: dummyTasks }}),
      // @ts-ignore
    }, removeTask, { payload: mockTaskId });

    expect(removeTaskMockFn).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([
      tasksActions.updateStatus('loading'),
      tasksActions.update(dummyTasks.slice(1)),
      tasksActions.updateStatus('idle')
    ]);
    removeTaskMockFn.mockClear();
  });

  it('Should call api and dispatch error action', async () => {
    const dispatched: Action[] = [];
    const removeTaskMockFn = jest
      .spyOn(api, 'deleteTaskApiRequest')
      .mockImplementation(() => Promise.reject());

    await runSaga({
      dispatch: (action: Action) => dispatched.push(action),
      getState: () => ({ tasks: { tasks: dummyTasks }}),
      // @ts-ignore
    }, removeTask, { payload: mockTaskId });

    expect(removeTaskMockFn).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([
      tasksActions.updateStatus('loading'),
      tasksActions.updateStatus('failed')
    ]);
    removeTaskMockFn.mockClear();
  });
});

describe('Create Task',  () => {
  it('Should wait for every "tasksActions.create" action and call api request', async () => {
    const dispatched: Action[] = [];
    const mockTask = dummyTasks[0];
    const createTaskMockFn = jest
    .spyOn(api, 'createTaskApiRequest')
    .mockImplementation(() => Promise.resolve(mockTask))

    await runSaga({
      dispatch: (action: Action) => dispatched.push(action),
      getState: () => ({ tasks: { tasks: dummyTasks }}),
      // @ts-ignore
    }, createTask, { payload: mockTask });

    expect(createTaskMockFn).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([
      tasksActions.updateStatus('loading'),
      tasksActions.update([...dummyTasks, mockTask]),
      tasksActions.created(mockTask.id as string),
      tasksActions.updateStatus('idle')
    ]);
    createTaskMockFn.mockClear();
  });

  it('Should call api and dispatch error action', async () => {
    const dispatched: Action[] = [];
    const mockTask = dummyTasks[0];
    const createTaskMockFn = jest
    .spyOn(api, 'createTaskApiRequest')
    .mockImplementation(() => Promise.reject(mockTask));

    await runSaga({
      dispatch: (action: Action) => dispatched.push(action),
      getState: () => ({ tasks: { tasks: dummyTasks }}),
      // @ts-ignore
    }, createTask, { payload: mockTask });

    expect(createTaskMockFn).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([
      tasksActions.updateStatus('loading'),
      tasksActions.updateStatus('failed')
    ]);
    createTaskMockFn.mockClear();
  });
});

describe('Update Task',  () => {
  it('Should wait for every "tasksActions.save" action and call api request', async () => {
    const mockTask: Task = {
      "id": "0",
      "name": "Cleaning after every reservation",
      "assignee": "1",
      "starts_at": "2023-05-01T18:05:31Z",
      "due_at": "2023-05-01T20:05:31Z",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      unsaved_changes: {
        "id": "0",
        "name": "New Name",
        "assignee": "1",
        "starts_at": "2023-05-01T18:05:31Z",
        "due_at": "2023-05-01T20:05:31Z",
        "description": "New Description",
      }
    };

    const dispatched: Action[] = [];
    const task = dummyTasks[0];
    const updateTaskMockFn = jest
      .spyOn(api, 'updateTaskApiRequest')
      .mockImplementation(() => Promise.resolve(task));

    const toastMockMethod = jest
      .spyOn(toast, 'success');

    await runSaga({
      dispatch: (action: Action) => dispatched.push(action),
      getState: () => ({
        tasks: {
          tasks: [mockTask],
        }
      }),
      // @ts-ignore
    }, saveTask, {payload: mockTask.id});

    expect(updateTaskMockFn).toHaveBeenCalledTimes(1);
    expect(toastMockMethod).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([
      tasksActions.updateStatus('loading'),
      tasksActions.taskSaved(task),
      tasksActions.updateStatus('idle')
    ]);
    updateTaskMockFn.mockClear();
  });

  it('Should call api and dispatch error action', async () => {
    const mockTask: Task = {
      "id": "0",
      "name": "Cleaning after every reservation",
      "assignee": "1",
      "starts_at": "2023-05-01T18:05:31Z",
      "due_at": "2023-05-01T20:05:31Z",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      unsaved_changes: {
        "id": "0",
        "name": "New Name",
        "assignee": "1",
        "starts_at": "2023-05-01T18:05:31Z",
        "due_at": "2023-05-01T20:05:31Z",
        "description": "New Description",
      }
    };
    const dispatched: Action[] = [];
    const updateTaskMockFn = jest
      .spyOn(api, 'updateTaskApiRequest')
      .mockImplementation(() => Promise.reject());

    await runSaga({
      dispatch: (action: Action) => dispatched.push(action),
      getState: () => ({
        tasks: {
          tasks: [mockTask],
        }
      }),
      // @ts-ignore
    }, saveTask, {payload: mockTask.id});

    expect(updateTaskMockFn).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([
      tasksActions.updateStatus('loading'),
      tasksActions.updateStatus('failed')
    ]);
    updateTaskMockFn.mockClear();
  });
});
