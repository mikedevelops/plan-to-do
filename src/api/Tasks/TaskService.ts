import { sql, getConnection } from "~/src/api/Database";
import { serialiseDate } from "~/src/api/Time";
import { deserialize } from "./TaskFactory";
import assert from "assert";
import type { SerialisedTask, Task } from "./TaskTypes";

interface TaskParams {
  content: string;
}

export const getById = async (id: number): Promise<Task | null> => {
  const task = await sql.getOne<SerialisedTask>(
    await getConnection(),
    `SELECT * from tasks where id=${id}`
  );

  if (task === undefined) {
    return null;
  }

  return deserialize(task);
};

export const create = async (params: TaskParams): Promise<Task> => {
  const updated: number = await sql.run(
    await getConnection(),
    `INSERT INTO tasks (content) VALUES ('${params.content}')`
  );

  assert.strictEqual(updated, 1, "createTask should update 1 row");

  const task = await sql.getOne<SerialisedTask>(
    await getConnection(),
    `SELECT * FROM tasks ORDER BY id DESC LIMIT 1`
  );

  return deserialize(task);
};

export const setComplete = async (
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

export const setArchived = async (
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

export const getAll = async (
  limit: number,
  offset: number
): Promise<Task[]> => {
  const tasks = await sql.getAll<SerialisedTask>(
    await getConnection(),
    `SELECT * from tasks 
          ORDER BY created
          LIMIT ${limit} 
          OFFSET ${offset}`
  );

  return tasks.map(deserialize);
};
