import { serialiseDate } from "~/src/api/Time";
import { Task, TaskResponseModel } from "~/src/common/Tasks/types";

export const transform = (task: Task): TaskResponseModel => {
  return {
    id: task.id,
    content: task.content,
    archived: task.archived,
    complete: task.complete,
    created: serialiseDate(task.created),
    modified: serialiseDate(task.modified),
  };
};
