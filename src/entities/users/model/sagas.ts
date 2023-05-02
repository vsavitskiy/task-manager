import { call, put, takeEvery } from 'redux-saga/effects'
import { usersActions } from "./slice";

interface CallAPIParameters {
  url: string;
  method: string;
  body?: BodyInit;
}

let callAPI = async (params: CallAPIParameters) => {
  const { url, method, body } = params;
  const response = await fetch(url, { method, body });
  return await response.json();
}

function* fetchUsers() {
  try {
    yield put(usersActions.updateStatus('loading'));
    // @ts-ignore
    const users = yield call(() => {
      return callAPI({
        url: 'http://localhost:3001/users',
        method: 'GET',
      })
    });

    yield put(usersActions.update(users));
  } catch (e) {
    console.error(e);
    yield put(usersActions.updateStatus('failed'));
  } finally {
    yield put(usersActions.updateStatus('idle'));
  }
}

export function* usersSagas() {
  yield takeEvery(usersActions.fetch, fetchUsers);
}
