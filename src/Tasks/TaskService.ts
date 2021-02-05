import * as sql from "~/src/Database/DatabaseService";
import getConnection from "~/src/Database/ConnectionFactory";
import { serialiseDate } from "~/src/Utils/Date";
import { SerialisedTask, Task } from "./TaskTypes";
import { parseTask } from "./TaskParser";
import assert from "assert";

interface TaskParams {
  content: string;
}

export const getTask = async (id: number): Promise<Task | null> => {
  const task = await sql.get<SerialisedTask>(
    await getConnection(),
    `SELECT * from tasks where id=${id}`
  );

  if (task === undefined) {
    return null;
  }

  return parseTask(task);
};

export const createTask = async (params: TaskParams): Promise<Task> => {
  const updated: number = await sql.run(
    await getConnection(),
    `INSERT INTO tasks (content) VALUES ('${params.content}')`
  );

  assert.strictEqual(updated, 1, "createTask should update 1 row");

  const task = await sql.get<SerialisedTask>(
    await getConnection(),
    `SELECT * FROM tasks ORDER BY id DESC LIMIT 1`
  );

  return parseTask(task);
};

export const setTaskComplete = async (
  task: Task,
  complete: boolean
): Promise<Task> => {
  const now = new Date();
  const updated = await sql.run(
    await getConnection(),
    `UPDATE tasks 
      set complete=${complete ? 1 : 0},
        modified='${serialiseDate(now)}'
      where id=${task.id}
  `
  );

  assert.strictEqual(updated, 1, "setTaskComplete should update 1 row");

  return Object.assign({}, task, { complete, modified: now });
};

export const setTaskArchived = async (
  task: Task,
  archive: boolean
): Promise<Task> => {
  const now = new Date();
  const updated = await sql.run(
    await getConnection(),
    `UPDATE tasks 
      set archived=${archive ? 1 : 0}, 
        modified='${serialiseDate(now)}'
      where id=${task.id}
  `
  );

  assert.strictEqual(updated, 1, "setTaskArchived should update 1 row");

  return Object.assign({}, task, { archived: archive, modified: now });
};
