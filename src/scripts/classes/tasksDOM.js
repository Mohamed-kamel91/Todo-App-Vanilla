import tasks from './tasks.js';

import { TaskComponent } from '../components/task.js';
import { RenderTasksCount } from '../components/tasksNav.js';

import { 
  NO_ACTIVE_TASKS_MSG, 
  NO_COMPLETED_TASKS_MSG,
} from '../constants/taskConstants.js';

class TasksDOM {
  constructor(tasks) { 
    this.tasks = tasks;
  }

  renderTasks() {
    this.clearTaskLists();

    switch (this.tasks.sortBy) {
      case "all": {
        this.renderAllTasks();
        break;
      }
      case "active": {
        this.renderActiveTasks();
        break;
      }
      case "completed": {
        this.renderCompletedTasks();
        break;
      }
    }

    RenderTasksCount();
  }

  renderAllTasks() { 
    this.renderActiveTasks();
    this.renderCompletedTasks();
  }

  renderActiveTasks() {
    const activeTasks = this.tasks.getActiveTasks();

    const todoTasksContainer = document.getElementById("todo-tasks");
    const completedTasksWrapper = document.createElement("div");
    const completedTasksTitle = document.createElement("h2");

    completedTasksTitle.classList.add("todo__tasks-list-title");
    completedTasksTitle.textContent = "Active";
    completedTasksWrapper.classList.add("todo__active-tasks");
    completedTasksWrapper.appendChild(completedTasksTitle);

    if (activeTasks.length === 0) {
      const noTasksElement = document.createElement("p");
      noTasksElement.textContent = NO_ACTIVE_TASKS_MSG;
      noTasksElement.style.margin = "20px 0";
      completedTasksWrapper.appendChild(noTasksElement);
    } else {
      const activeTasksList = document.createElement("ul");
      const activeTasksListItems = this.appendTasksToFragment(activeTasks);
      
      activeTasksList.classList.add("todo__tasks-list");
      activeTasksList.setAttribute("id", "active-tasks-list");

      this.clearTasks(activeTasksList);

      activeTasksList.appendChild(activeTasksListItems);
      completedTasksWrapper.appendChild(activeTasksList);
    }

    todoTasksContainer.appendChild(completedTasksWrapper);
  }
  
  renderCompletedTasks() {
    const completedTasks = this.tasks.getCompletedTasks();

    const todoTasksContainer = document.getElementById("todo-tasks");
    const completedTasksWrapper = document.createElement("div");
    const completedTasksTitle = document.createElement("h2");

    completedTasksTitle.classList.add("todo__tasks-list-title");
    completedTasksTitle.textContent = "Completed";
    completedTasksWrapper.classList.add("todo__completed-tasks");
    completedTasksWrapper.appendChild(completedTasksTitle);

    if (completedTasks.length === 0) {
      const noTasksElement = document.createElement("p");
      noTasksElement.textContent = NO_COMPLETED_TASKS_MSG;
      noTasksElement.style.margin = "20px 0";
      completedTasksWrapper.appendChild(noTasksElement);
    } else {
      const completedTasksList = document.createElement("ul");
      const completedTasksListItems = this.appendTasksToFragment(completedTasks);
      
      completedTasksList.classList.add("todo__tasks-list");
      completedTasksList.setAttribute("id", "completed-tasks-list");

      this.clearTasks(completedTasksList);

      completedTasksList.appendChild(completedTasksListItems);
      completedTasksWrapper.appendChild(completedTasksList);
    }

    todoTasksContainer.appendChild(completedTasksWrapper);
  }

  appendTasksToFragment(tasks) {
    const listFragment = document.createDocumentFragment();

    for(let i = tasks.length - 1; i >= 0; i--) {
      const taskItem = TaskComponent(tasks[i]);
      listFragment.appendChild(taskItem);
    }

    return listFragment;
  }

  clearTasks(list) {
    while(list.firstChild) {
      list.removeChild(list.firstChild);
    }
  }

  clearTaskLists() {
    const todoTasksContainer = document.getElementById("todo-tasks");

    while(todoTasksContainer.firstChild) {
      todoTasksContainer.removeChild(todoTasksContainer.firstChild);
    } 
  }
}

const tasksDOM = new TasksDOM(tasks);

document.addEventListener("DOMContentLoaded", () => tasksDOM.renderTasks());

export default tasksDOM; 
