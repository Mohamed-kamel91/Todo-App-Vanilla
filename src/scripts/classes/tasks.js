import Task from './task.js';
import { 
  getLocalStorage, 
  setLocalStorage,
} from '../utils/localStorage.js';

class Tasks {
  constructor() {
    this.tasks = this.initializeTasks();
    this.sortBy = "all";
  }

  initializeTasks() {
    // Get tasks from local storage or initialize with an empty array
    const storedTasks = getLocalStorage("tasks");
    return storedTasks ?? [];
  }  

  sortTasksBy(type) {
    this.sortBy = type;
  }

  getActiveTasks() {
    return this.tasks.filter((task) => !(task.completed));
  }

  getCompletedTasks() {
    return this.tasks.filter((task) => task.completed);
  }

  add(text) {
    const newTask = new Task(text);
    this.tasks.push(newTask);
    this.#updateLocalStorage();
  }

  edit(id, text) {
    this.#updateTask(id, (task) => {
      task.text = text;
    });
  }

  complete(id, isCompleted = true) {
    this.#updateTask(id, (task) => {
      task.completed = isCompleted;
    });
  }

  delete(id) {
    this.#updateTask(id, (_) => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }

  #updateTask(id, updateCallback) {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index !== -1) {
      const task = this.tasks[index];
      updateCallback(task, index);
      this.#updateLocalStorage();
      return;
    }

    new Error("This task is not found!");
  }

  #updateLocalStorage() {
    setLocalStorage("tasks", this.tasks);
  }
}

const tasks = new Tasks();

export default tasks;
