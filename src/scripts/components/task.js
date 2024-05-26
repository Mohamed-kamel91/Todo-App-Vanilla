import tasks from '../classes/tasks.js';
import tasksDOM from '../classes/tasksDOM.js';
import Dropdown from '../classes/dropdown.js';
import { 
  createDropdown, 
  createDropdownTrigger,
  createDropdownMenu,
} from './dropdown.js';
import {
  EditTask,
  CompleteTask, 
  DeleteTask, 
  CopyTask, 
} from './taskActions.js';

import { 
  handleAddHover, 
  handleRemoveHover,
} from '../utils/elementHover.js';

import { taskdropdownIcon } from '../constants/taskConstants.js';

export function TaskComponent(task) { 
  const taskItem = createTaskItem(task);

  taskItem.addEventListener(
    "mouseover",
    handleAddHover([".task__dropdown", ".task__copy"])
  );

  taskItem.addEventListener("mouseleave", handleRemoveHover);

  return taskItem;
}

export function createTaskItem(task) { 
  const taskItem = document.createElement("li");
  const taskItemWrapper = createTaskWrapper(task);

  taskItem.classList.add("task");
  taskItem.setAttribute("id", task.id);
  taskItem.appendChild(taskItemWrapper);

  return taskItem;
}

function createTaskWrapper(task) {
  const taskWrapper = document.createElement("div");
  const taskInputs = createTaskInputs(task);
  const taskActions = createTaskActions(task);

  taskWrapper.classList.add("task__wrapper");
  taskWrapper.append(taskInputs, taskActions);

  return taskWrapper;
}

function createTaskInputs(task) {
  const taskInputs = document.createElement("div");
  const taskCheckbox = createTaskCheckbox(task);
  const taskText = createTaskTextInput(task);

  taskInputs.classList.add("task__inputs");
  taskInputs.append(taskCheckbox, taskText);

  return taskInputs;
}

function createTaskCheckbox(task) {
  const taskCheckboxlabel = document.createElement("label");
  const taskCheckboxInput= document.createElement("input");

  taskCheckboxlabel.classList.add("task__checkbox-label", "form-label");
  taskCheckboxInput.classList.add("task__checkbox-input", "form-input");
  taskCheckboxInput.setAttribute("id", `task-checkbox-${task.id}`);
  taskCheckboxInput.setAttribute("type", "checkbox");
  taskCheckboxInput.setAttribute("name", "isTaskCompleted");
  taskCheckboxInput.checked = task.completed;
  taskCheckboxlabel.appendChild(taskCheckboxInput);

  taskCheckboxInput.addEventListener("change", handleChange);

  function handleChange(e) {
    const { target } = e;

    tasks.complete(task.id, target.checked);
    tasksDOM.renderTasks();
  }

  return taskCheckboxlabel;
}

function createTaskTextInput(task) {
  const taskTextlabel = document.createElement("label");
  const taskTextInput = document.createElement("input");

  taskTextlabel.classList.add("task__text-label", "form-label");
  taskTextInput.classList.add("task__text-input", "form-input");
  taskTextInput.setAttribute("id", `task-input-${task.id}`);
  taskTextInput.setAttribute("type", "text");
  taskTextInput.setAttribute("name", "taskText");
  taskTextInput.setAttribute("value", task.text);
  taskTextInput.setAttribute("disabled", false);
  taskTextInput.style.textDecoration = task.completed ? "line-through" : "none";
  taskTextlabel.appendChild(taskTextInput);

  taskTextInput.addEventListener("blur", handleBlur);
  taskTextInput.addEventListener("keydown", handleKeydown);

  function handleBlur() {
    const inputVal = taskTextInput.value.trim();
    
    taskTextInput.blur();
    taskTextInput.disabled = true;

    if (inputVal === task.text) return;

    tasks.edit(task.id, inputVal);
  }

  function handleKeydown(e) {
    if (e.key === "Enter") {
      handleBlur();
    }
  }

  return taskTextlabel;
}

function createTaskActions(task) {
  const taskActions = document.createElement("div");
  const taskCopy = createTaskCopy(task);
  const taskDropdown = createTaskDropdown(task);

  taskActions.classList.add("task__actions");
  taskActions.append(taskCopy, taskDropdown);

  return taskActions;
}

function createTaskCopy(task) {
  const copyWrapper = document.createElement("div");
  const copyButton = CopyTask(task.text);

  copyWrapper.classList.add("task__copy");
  copyWrapper.setAttribute("id", "task-copy");
  copyWrapper.appendChild(copyButton);
  
  return copyWrapper;
}

function createTaskDropdown(task) {
  // Variables
  const dropdownMenuId = `task-dropdown-menu-${task.id}`;
  const dropdownActionBtns = [
    EditTask(task.id, task.text),
    CompleteTask(task.id, task.completed),
    DeleteTask(task.id),
  ];

  // Cache dom
  const taskDropdownWrapper = document.createElement("div");
  const dropdown = createDropdown({ id: `task-dropdown-${task.id}` });
  const dropdownTrigger = createDropdownTrigger({
    icon: taskdropdownIcon,
    className: "task__dropdown-button",
  });
  const dropdownMenu = createDropdownMenu(
    dropdownActionBtns, 
    { id: dropdownMenuId }
  );

  dropdownTrigger.setAttribute("aria-controls", dropdownMenuId);
  dropdownTrigger.setAttribute("aria-label", "Open task dropdown menu");
  taskDropdownWrapper.classList.add("task__dropdown");
  taskDropdownWrapper
    .appendChild(dropdown)
    .append(dropdownTrigger, dropdownMenu);

  new Dropdown(dropdown);
  
  return taskDropdownWrapper;
}