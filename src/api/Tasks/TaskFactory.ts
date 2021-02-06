import type { SerialisedTask, Task } from "./TaskTypes";

export const deserialize = (task: SerialisedTask): Task => {
  return {
    id: task.id,
    content: task.content,
    archived: !!task.archived,
    complete: !!task.archived,
    modified: new Date(task.modified),
    created: new Date(task.created),
  };
};
