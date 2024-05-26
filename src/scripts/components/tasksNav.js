import tasks from "../classes/tasks.js";
import tasksDOM from "../classes/tasksDOM.js";

import { setActiveElement } from "../utils/elementsActive.js";

const sortByList = document.getElementById("nav-sortby-tasks");
const sortbyButtons = sortByList.querySelectorAll(".todo__nav-task-btn");

// Initial render of sortBy tasks buttons in nav
(function () {
  "use strict";

  // Register click event to each sort button
  sortbyButtons.forEach((sortbyButton) => {
    const buttonLabel = sortbyButton.querySelector(
      "span.todo__nav-task-btn-label"
    );

    const labelText = buttonLabel.textContent.toLowerCase();

    sortbyButton.addEventListener("click", handleSortby);

    function handleSortby() {
      if (tasks.sortBy !== labelText) {
        tasks.sortTasksBy(labelText);
        tasksDOM.renderTasks();
      }
    }
  });

  // Set Active sortby button
  setActiveElement(sortByList, sortbyButtons);
})();

// Tasks count component used in TaskDom to keep count updated
export function RenderTasksCount() {
  sortbyButtons.forEach((sortbyButton) => {
    const buttonLabel = sortbyButton.querySelector(
      "span.todo__nav-task-btn-label"
    );

    const buttonCount = sortbyButton.querySelector(
      "span.todo__nav-tasks-count"
    );

    const labelText = buttonLabel.textContent;

    let tasksCount;

    switch (labelText.toLowerCase()) {
      case "all": {
        tasksCount = tasks.tasks.length;
        break;
      }
      case "active": {
        tasksCount = tasks.getActiveTasks().length;
        break;
      }
      case "completed": {
        tasksCount = tasks.getCompletedTasks().length;
        break;
      }
    }

    buttonCount.textContent = tasksCount;
  });
}
