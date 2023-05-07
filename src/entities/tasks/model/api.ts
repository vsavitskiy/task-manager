import { callAPI } from "../../../shared/helpers/callApi";
import { PayloadTask, Task } from "../types";

export const getTasksApiRequest = () => {
  return callAPI<PayloadTask[]>({
    url: 'http://localhost:3001/tasks',
    method: 'GET',
  })
}

export const deleteTaskApiRequest = (payload: string) => callAPI<void>({
  url: `http://localhost:3001/tasks/${payload}`,
  method: 'DELETE',
})

export const createTaskApiRequest = (payload: Task) => {
  return callAPI<PayloadTask>({
    url: `http://localhost:3001/tasks`,
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export const updateTaskApiRequest = (payload: Task) => {
  return callAPI<PayloadTask>({
    url: `http://localhost:3001/tasks/${payload.id}`,
    method: 'PUT',
    body: JSON.stringify(payload)
  });
}
