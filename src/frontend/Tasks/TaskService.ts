import { Task } from "~/src/common/Tasks/types";
import { PaginationResponse } from "~/src/common/Pagination/types";
import { hydrateTask } from "./TaskHydrator";

const endpoint = "http://localhost:8123/api";

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${endpoint}/tasks`);
  const parsed: PaginationResponse = await response.json();

  return parsed.items.map(hydrateTask);
};

export const setTaskComplete = async (
  complete: boolean,
  task: Task
): Promise<void> => {
  await fetch(`${endpoint}/task/${task.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ complete }),
  });
};
