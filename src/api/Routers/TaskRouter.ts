import { Router } from "express";
import * as Tasks from "~/src/api/Tasks";
import * as Pagination from "~/src/api/Pagination";
import { HttpCode } from "~/src/api/Runtime/types";

export const router = Router();
export const MAX_PAGE_SIZE = 100;

router.get("/tasks", async (req, res) => {
  const limit = Pagination.getLimit(req.query, MAX_PAGE_SIZE);
  const offset = Pagination.getOffset(req.query);
  const tasks = await Tasks.getAll(limit, offset);

  res.json(
    Pagination.transform(req, tasks.map(Tasks.transform), limit, offset)
  );
});

router.patch("/task/:id", async (req, res) => {
  const id = parseInt(req.params.id as string, 10);
  const task = await Tasks.getById(id);

  if (task === null) {
    res.sendStatus(HttpCode.NOT_FOUND);
    return;
  }

  // TODO: validate body
  const updatedTask = await Tasks.update(task, req.body);

  res.json(Tasks.transform(updatedTask));
});
