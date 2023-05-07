import { runSaga } from "redux-saga";
import { Action } from "@reduxjs/toolkit";
import { fetchUsers } from "./sagas";
import * as api from './api';
import { usersActions } from "./slice";

const dummyUsers = [
  {
    "id": "1",
    "first_name": "Andrew",
    "last_name": "Delarue"
  },
  {
    "id": "2",
    "first_name": "Szymon",
    "last_name": "Jefferson"
  },
  {
    "id": "3",
    "first_name": "Frankie",
    "last_name": "Conrad"
  },
];

describe('fetchUsers',  () => {
  it('Should wait for every "users/fetch" action and call api request', async () => {
    const dispatched: Action[] = [];
    const requestUsers = jest
      .spyOn(api, 'getUsersApiRequest')
      .mockImplementation(() => Promise.resolve(dummyUsers));

    await runSaga({
      dispatch: (action: Action) => dispatched.push(action),
      // @ts-ignore
    }, fetchUsers);

    expect(requestUsers).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([
      usersActions.updateStatus('loading'),
      usersActions.update(dummyUsers),
      usersActions.updateStatus('idle')
    ]);
    requestUsers.mockClear();
  });

  it('Should call api and dispatch error action', async () => {
    const dispatched: Action[] = [];
    const requestUsers = jest
      .spyOn(api, 'getUsersApiRequest')
      .mockImplementation(() => Promise.reject());

    await runSaga({
      dispatch: (action: Action) => dispatched.push(action),
      // @ts-ignore
    }, fetchUsers);

    expect(requestUsers).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([
      usersActions.updateStatus('loading'),
      usersActions.updateStatus('failed')
    ]);
    requestUsers.mockClear();
  });
});
