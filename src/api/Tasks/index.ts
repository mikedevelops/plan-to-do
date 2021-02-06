import {
  create,
  getAll,
  getById,
  setArchived,
  setComplete,
} from "./TaskService";
import { deserialize } from "~/src/api/Tasks/TaskFactory";

export { create, getAll, getById, setArchived, setComplete, deserialize };
