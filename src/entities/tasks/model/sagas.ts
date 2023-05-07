import { put, call, takeEvery, select } from 'redux-saga/effects'
import { toast } from 'react-toastify';
import { tasksActions } from "./slice";
import {
  selectTaskByIdWithUnsavedChangesMerged,
  selectTasks
} from "./selectors";
import { Task } from "../types";
import {
  createTaskApiRequest,
  deleteTaskApiRequest,
  getTasksApiRequest,
  updateTaskApiRequest
} from "./api";

export interface RemoveTaskAction {
  type: string;
  payload: string;
}

export interface CreateTaskAction {
  type: string;
  payload: Task;
}

export interface SaveTaskAction {
  type: string;
  payload: string;
}

export function* fetchTasks() {
  try {
    yield put(tasksActions.updateStatus('loading'));
    const tasks: Task[] = yield call(getTasksApiRequest);
    yield put(tasksActions.update(tasks));
    yield put(tasksActions.updateStatus('idle'));
  } catch (e) {
    yield put(tasksActions.updateStatus('failed'));
  }
}

export function* removeTask(action: RemoveTaskAction) {
  const { payload } = action;

  try {
    const tasks: Task[] = yield select(selectTasks);
    yield put(tasksActions.updateStatus('loading'));
    yield call(() => deleteTaskApiRequest(payload));
    const updatedTasks = tasks.filter((task: Task) => task.id !== payload);
    yield put(tasksActions.update(updatedTasks));
    yield put(tasksActions.updateStatus('idle'));
  } catch (e) {
    yield put(tasksActions.updateStatus('failed'));
  }
}

export function* createTask(action: CreateTaskAction) {
  const { payload } = action;
  const tasks: Task[] = yield select(selectTasks);

  try {
    yield put(tasksActions.updateStatus('loading'));
    const response: Task = yield call(() => createTaskApiRequest(payload));
    const updatedTasks = [...tasks, response];
    yield put(tasksActions.update(updatedTasks));
    yield put(tasksActions.created(response.id as string));
    yield put(tasksActions.updateStatus('idle'));
  } catch (e) {
    yield put(tasksActions.updateStatus('failed'));
  }
}

export function* saveTask(action: SaveTaskAction) {
  const { payload } = action;
  const task: Task = yield select(selectTaskByIdWithUnsavedChangesMerged(payload));

  try {
    yield put(tasksActions.updateStatus('loading'));
    const response: Task = yield call(() => updateTaskApiRequest(task));
    yield put(tasksActions.taskSaved(response));
    yield call(() => toast.success('Task added successfully', {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      pauseOnHover: true,
    }));
    yield put(tasksActions.updateStatus('idle'));
  } catch (e) {

    yield put(tasksActions.updateStatus('failed'));
  }
}

export function* tasksSagas() {
  yield takeEvery(tasksActions.fetch, fetchTasks);
  yield takeEvery(tasksActions.remove, removeTask);
  yield takeEvery(tasksActions.create, createTask);
  yield takeEvery(tasksActions.save, saveTask);
}
