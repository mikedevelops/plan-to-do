import { Task, TaskResponseModel } from "~/src/common/Tasks/types";
import { PaginationResponse } from "~/src/common/Pagination/types";
import { hydrateTask } from "./TaskHydrator";
import { TemporaryTask } from "~/src/frontend/Tasks/types";

const endpoint = "http://localhost:8123/api";
const jsonContentType = { "Content-Type": "application/json" };

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${endpoint}/tasks`);
  const parsed: PaginationResponse = await response.json();

  return parsed.items.map(hydrateTask);
};

export const createTask = async (task: TemporaryTask): Promise<Task> => {
  const response = await fetch(`${endpoint}/task`, {
    headers: { ...jsonContentType },
    method: "POST",
    body: JSON.stringify(task),
  });
  const parsed: TaskResponseModel = await response.json();

  return hydrateTask(parsed);
};

export const setTaskComplete = async (
  taskId: number,
  complete: boolean
): Promise<void> => {
  await fetch(`${endpoint}/task/${taskId}`, {
    method: "PATCH",
    headers: { ...jsonContentType },
    body: JSON.stringify({ complete }),
  });
};

export const updateTask = async (task: Task): Promise<Task> => {
  const response = await fetch(`${endpoint}/task/${task.id}`, {
    method: "PATCH",
    headers: { ...jsonContentType },
    body: JSON.stringify(task),
  });
  const updatedTask = await response.json();

  return hydrateTask(updatedTask);
};

export const deleteTask = async (task: Task): Promise<Task> => {
  // TODO: handle a delete that didn't work!
  await fetch(`${endpoint}/task/${task.id}`, {
    method: "DELETE",
    headers: { ...jsonContentType },
    body: JSON.stringify(task),
  });

  return task;
};
