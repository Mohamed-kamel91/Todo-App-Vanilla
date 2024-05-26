import tasks from '../classes/tasks.js';
import tasksDOM from '../classes/tasksDOM.js';

(function () {
  "use strict";
  
  const addTaskForm = document.getElementById("add-task-form");
  const addTaskInput = addTaskForm.querySelector("#add-task-input");
  
  addTaskForm.addEventListener("submit", handleAddTask);
  
  function handleAddTask(e) {
    const inputVal = addTaskInput.value;

    e.preventDefault();
    
    if (inputVal.trim().length > 0) {
      tasks.add(inputVal.trim());
      tasksDOM.renderTasks();
      addTaskInput.value = "";
    }
  }
})();