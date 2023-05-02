import { all, put } from 'redux-saga/effects'
import { tasksActions, tasksSagas } from "../../entities/tasks";
import { usersActions, usersSagas } from "../../entities/users";

function* initApp() {
  yield put({ type: tasksActions.fetch });
  yield put({ type: usersActions.fetch });
}

export function* rootSaga() {
  yield all([
    tasksSagas(),
    usersSagas(),
    initApp(),
  ])
}
