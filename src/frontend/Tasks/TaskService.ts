import { Task } from "~/src/common/Tasks/types";
import { PaginationResponse } from "~/src/common/Pagination/types";
import { hydrateTask } from "./TaskHydrator";

const endpoint = "http://localhost:8123/api";
const jsonContentType = { "Content-Type": "application/json" };

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${endpoint}/tasks`);
  const parsed: PaginationResponse = await response.json();

  return parsed.items.map(hydrateTask);
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

export const saveContent = async (
  taskId: number,
  content: string
): Promise<void> => {
  await fetch(`${endpoint}/task/${taskId}`, {
    method: "PATCH",
    headers: { ...jsonContentType },
    body: JSON.stringify({ content }),
  });
};
