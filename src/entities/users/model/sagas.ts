import { call, put, takeEvery } from 'redux-saga/effects'
import { usersActions } from "./slice";
import { getUsersApiRequest } from "./api";
import { User } from "../types";

export function* fetchUsers() {
  try {
    yield put(usersActions.updateStatus('loading'));
    const users: User[] = yield call(getUsersApiRequest);
    yield put(usersActions.update(users));
    yield put(usersActions.updateStatus('idle'));
  } catch (e) {
    yield put(usersActions.updateStatus('failed'));
  }
}

export function* usersSagas() {
  yield takeEvery(usersActions.fetch, fetchUsers);
}
