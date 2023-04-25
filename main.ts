import { AI } from "./deps.ts";

const objective = "Survive asteroid impact";
const executedTasks: string[] = [];

const taskCreatorBot = new AI({
  instruction:
    "You are a task creation agent. You are tasked with creating tasks for the AI system to complete. You will be given an objective. You will be asked to create tasks to accomblish the objective. Be concise. Do not elaborate.",
});

const taskPrioritizerBot = new AI({
  instruction:
    "You are a task prioritization agent. You are tasked with prioritizing tasks for the AI system to complete a given objective. You will be given a list of tasks. You will be asked to prioritize the tasks. Be concise. Do not elaborate.",
});

const taskExecutorBot = new AI({
  instruction:
    "You are a task execution agent. You are tasked with executing tasks for the AI system to complete a given objective. You will be given a task and asked to execute it.",
});

const taskCreatorBotResponse = await taskCreatorBot.ask(
    `Objective: ${objective}\n\n
        Create tasks to be completed by the AI system in order to accomplish the objective.
        Return the tasks as an unordered list.`,
    { chatId: "baby-agi", temperature: 0 },
  );
  const tasks = taskCreatorBotResponse!.content;
  console.log(tasks, "\n");

  const taskPrioritizerBotResponse = await taskPrioritizerBot.ask(
    `Objective:${objective}\n\nTasks: ${tasks!}\n\nPrioritize the tasks. Return the tasks as an unordered list.`,
    { chatId: "baby-agi", temperature: 0 },
  );
  const prioritizedTasks = taskPrioritizerBotResponse!.content;
  console.log(prioritizedTasks, "\n");

  const prioritizedTasksList = prioritizedTasks.split("\n").map((
    task,
  ) => task.slice(1).trim());

let shouldProceed = true;

while (shouldProceed) {
  const nextTask = prioritizedTasksList.shift();

  const taskExecutionResult = await taskExecutorBot.ask(
    `Objective:${objective}\n\nTask: ${nextTask}\n\nExecute the task. Return the result.`,
    { chatId: "baby-agi", temperature: .8 },
  );

  executedTasks.push(taskExecutionResult!.content);

  console.log(taskExecutionResult!.content, "\n");

  shouldProceed = confirm("Do you want to proceed?");
}
