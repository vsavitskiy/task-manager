import { RootState } from "../../../app/store";

export const selectUsers = (state: RootState) => state.users.users;
export const selectUserById = (id: string) => {
  return (state: RootState) => state.users.users.find((user) => user.id === id);
}

export const selectStatus = (state: RootState) => state.users.status;
