import { put, call, takeEvery, select } from 'redux-saga/effects'
import { tasksActions } from "./slice";
import { selectTaskByIdWithUnsavedChanges, selectTasks} from "./selectors";
import { Task } from "../types";
import { toast } from 'react-toastify';

interface RemoveTaskAction {
  type: string;
  payload: string;
}

interface CreateTaskAction {
  type: string;
  payload: Task;
}

interface SaveTaskAction {
  type: string;
  payload: string;
}

interface CallAPIParameters {
  url: string;
  method: string;
  body?: BodyInit;
  headers?: Record<string, string>
}

let callAPI = async (params: CallAPIParameters) => {
  const { url, method, body, headers } = params;
  const response = await fetch(
    url,
    {
      method,
      body,
      headers: { "Content-type": "application/json", ...headers }
  });

  return await response.json();
}

function* fetchTasks() {
  try {
    yield put(tasksActions.updateStatus('loading'));

    // @ts-ignore
    const tasks = yield call(() => {
      return callAPI({
        url: 'http://localhost:3001/tasks',
        method: 'GET',
      })
    });

    yield put(tasksActions.update(tasks));
  } catch (e) {
    console.error(e);
    yield put(tasksActions.updateStatus('failed'));
  } finally {
    yield put(tasksActions.updateStatus('idle'));
  }
}

function* removeTask(action: RemoveTaskAction) {
  const { payload } = action;

  try {
    const tasks: Task[] = yield select(selectTasks);

    yield put(tasksActions.updateStatus('loading'));
    yield call(() => {
      return callAPI({
        url: `http://localhost:3001/tasks/${payload}`,
        method: 'DELETE',
      })
    });
    const updatedTasks = tasks.filter((task: Task) => task.id !== payload);
    yield put(tasksActions.update(updatedTasks));
  } catch (e) {
    console.error(e);
    yield put(tasksActions.updateStatus('failed'));
  } finally {
    yield put(tasksActions.updateStatus('idle'));
  }
}

function* createTask(action: CreateTaskAction) {
  const { payload } = action;
  const tasks: Task[] = yield select(selectTasks);

  try {
    yield put(tasksActions.updateStatus('loading'));
    // @ts-ignore
    const response = yield call(() => {
      return callAPI({
        url: `http://localhost:3001/tasks`,
        method: 'POST',
        body: JSON.stringify(payload)
      });
    });
    const updatedTasks = [...tasks, response];
    yield put(tasksActions.update(updatedTasks));
    yield put(tasksActions.created(response.id));
  } catch (e) {
    console.error(e);
    yield put(tasksActions.updateStatus('failed'));
  } finally {
    yield put(tasksActions.updateStatus('idle'));
  }
}

function* saveTask(action: SaveTaskAction) {
  const { payload } = action;
  const task: Task = yield select(selectTaskByIdWithUnsavedChanges(payload));

  try {
    yield put(tasksActions.updateStatus('loading'));
    // @ts-ignore
    const response = yield call(() => {
      return callAPI({
        url: `http://localhost:3001/tasks/${payload}`,
        method: 'PUT',
        body: JSON.stringify(task)
      });
    });

    yield put(tasksActions.taskSaved(response));
    toast.success('Task added successfully', {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      pauseOnHover: true,
    });
  } catch (e) {
    console.error(e);
    yield put(tasksActions.updateStatus('failed'));
  } finally {
    yield put(tasksActions.updateStatus('idle'));
  }
}

export function* tasksSagas() {
  yield takeEvery(tasksActions.fetch, fetchTasks);
  yield takeEvery(tasksActions.remove, removeTask);
  yield takeEvery(tasksActions.create, createTask);
  yield takeEvery(tasksActions.save, saveTask);
}
