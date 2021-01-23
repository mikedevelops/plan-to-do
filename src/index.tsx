import {createTask} from "./Managers/TaskManager";


(async () => {
  const task = await createTask({ content: "Hello, World!" });
  console.log(task)
})();
