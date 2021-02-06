import type { TaskSerialised } from "./types";
import { Task } from "~/src/common/Tasks/types";

export const deserialize = (task: TaskSerialised): Task => {
  return {
    id: task.id,
    content: task.content,
    archived: !!task.archived,
    complete: !!task.complete,
    modified: new Date(task.modified),
    created: new Date(task.created),
  };
};
