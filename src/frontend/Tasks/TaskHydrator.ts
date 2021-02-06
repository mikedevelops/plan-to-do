import { Task, TaskResponseModel } from "~/src/common/Tasks/types";

export const hydrateTask = (taskResponse: TaskResponseModel): Task => {
  return {
    id: taskResponse.id,
    content: taskResponse.content,
    modified: new Date(taskResponse.modified),
    created: new Date(taskResponse.created),
    archived: taskResponse.archived,
    complete: taskResponse.complete,
  };
};
