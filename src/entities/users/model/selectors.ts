import { createSelector, Selector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { User } from "../types";

type GetStateFromSelector<S> = S extends Selector<infer State> ? State : never

export const selectStatus = (state: RootState) => state.users.status;

export const selectUsers = (state: RootState) => state.users.users;

export const selectUserById = (id: string) => {
  return (state: RootState) => state.users.users.find((user) => user.id === id);
}

export const selectUsersNameIdMapping: Selector<
  GetStateFromSelector<typeof selectUsers>, Record<string, string>
  >  = createSelector(
  selectUsers,
  (users: User[]) => users.reduce((acc, user) => ({
    ...acc,
    [user.id]: `${user.first_name} ${user.last_name}`
  }), {})
)
