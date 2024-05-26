import tasks from '../classes/tasks.js';
import tasksDOM from '../classes/tasksDOM.js';

import { createSvgElement } from '../utils/createSvg.js';

import {
  markAsActiveIcon,
  editTaskIcon,
  completeTaskIcon,
  deleteTaskIcon,
  taskCopyIcon,
} from "../constants/taskConstants.js";

// EditTask component
export function EditTask(taskId) {
  const actionBtn = document.createElement("button");
  const actionLabel = document.createElement("span");
  const actionSvg = createSvgElement(editTaskIcon);

  actionBtn.classList.add(
    "task__dropdown-action-button",
    "button",
    "button--default",
    "button--sm"
  );
  actionLabel.textContent = "Edit task";
  actionBtn.append(actionSvg, actionLabel);

  actionBtn.addEventListener("click", handleEditTask);

  function handleEditTask() {
    const taskInput = document.getElementById(`task-input-${taskId}`);

    taskInput.removeAttribute("disabled");
    handleFocus(taskInput);
  }
  
  // Focus on input and place cursor at the end
  function handleFocus(taskInput) { 
    const inputValue = taskInput.value;

    taskInput.value = "";
    taskInput.focus();
    taskInput.value = inputValue;
  }

  return actionBtn;
}

// CompleteTask component
export function CompleteTask(taskId, isTaskcompleted) {
  const actionBtn = document.createElement("button");
  const actionLabel = document.createElement("span");
  const actionIcon = isTaskcompleted ? markAsActiveIcon : completeTaskIcon;
  const actionSvg = createSvgElement(actionIcon);

  actionBtn.classList.add(
    "task__dropdown-action-button",
    "button",
    "button--default",
    "button--sm"
  );
  actionLabel.textContent = isTaskcompleted
    ? "Mark as active"
    : "Mark as completed";

  actionBtn.append(actionSvg, actionLabel);

  actionBtn.addEventListener("click", handleCompleteTask);

  function handleCompleteTask() {
    tasks.complete(taskId, !isTaskcompleted);
    tasksDOM.renderTasks();
  }

  return actionBtn;
}

// DeleteTask component
export function DeleteTask(taskId) {
  const actionBtn = document.createElement("button");
  const actionLabel = document.createElement("span");
  const actionSvg = createSvgElement(deleteTaskIcon);

  actionBtn.classList.add(
    "task__dropdown-action-button",
    "button",
    "button--default",
    "button--sm",
    "button--danger"
  );
  actionLabel.textContent = "Delete task";
  actionBtn.append(actionSvg, actionLabel);

  actionBtn.addEventListener("click", handleDeleteTask);

  function handleDeleteTask() {
    tasks.delete(taskId);
    tasksDOM.renderTasks();
  }

  return actionBtn;
}

// CopyTask component
export function CopyTask(taskText) {
  const actionBtn = document.createElement("button");
  const actionSvg = createSvgElement(taskCopyIcon);

  actionBtn.classList.add("task__copy-button");
  actionBtn.appendChild(actionSvg);

  actionBtn.addEventListener("click", handleCopyToClipboard);

  function handleCopyToClipboard() {
    navigator.clipboard
      .writeText(taskText)
      .then(() => window.alert(taskText))
      .catch((error) => {
        console.error("copy failed: " + error);
        window.alert("Copying task to clipboard failed. Please try again!");
      });
  }

  return actionBtn;
}
