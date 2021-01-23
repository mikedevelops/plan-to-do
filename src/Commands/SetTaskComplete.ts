import meow from "meow";
import {setTaskComplete, getTask} from "../Managers/TaskManager";

const cli = meow("Set a task (in)complete", {
  flags: {
    task: {
      type: "number",
      alias: "t",
      isRequired: true
    },
    complete: {
      type: "boolean",
      alias: "c",
      default: true
    }
  }
});

(async () => {
  let task = await getTask(cli.flags.task);

  if (task === null) {
    console.log(`Unable to find task with id "${cli.flags.task}`);
    process.exit(0);
    return;
  }

  task = await setTaskComplete(task, cli.flags.complete);
  console.log("Updated 1 Task", task);
})();
