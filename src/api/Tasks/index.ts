import {
  create,
  getAll,
  getById,
  setArchived,
  setComplete,
  update,
} from "./TaskService";
import { deserialize } from "./TaskFactory";
import { transform } from "./TaskTransformer";

export {
  create,
  update,
  getAll,
  getById,
  setArchived,
  setComplete,
  deserialize,
  transform,
};
