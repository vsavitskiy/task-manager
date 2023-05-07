import { User } from "../types";
import { callAPI } from "../../../shared/helpers/callApi";

export const getUsersApiRequest = () => {
  return callAPI<User[]>({
    url: 'http://localhost:3001/users',
    method: 'GET',
  })
}
