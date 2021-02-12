import {
  create,
  getAll,
  getById,
  setArchived,
  setComplete,
  update,
  remove,
} from "./TaskService";
import { deserialize } from "./TaskFactory";
import { transform } from "./TaskTransformer";

export {
  create,
  remove,
  update,
  getAll,
  getById,
  setArchived,
  setComplete,
  deserialize,
  transform,
};
