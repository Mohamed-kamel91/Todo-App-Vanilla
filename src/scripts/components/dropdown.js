import Dropdown from '../classes/dropdown.js';
import { createSvgElement } from '../utils/createSvg.js'; 
const doc = document;

export function createDropdown({ id, className = "" }) {
  const dropdown = doc.createElement("div");

  dropdown.classList.add(className ? `${className} dropdown` : "dropdown");
  dropdown.setAttribute("id", id);

  return dropdown;
}

export function createDropdownTrigger({
  icon, 
  label,
  className = "",
  id, 
} = {}) {
  const dropdownTrigger = doc.createElement("button");
  const dropdownSvg = icon && createSvgElement(icon);
  const dropdownLabel = label && doc.createElement("span");

  dropdownTrigger.classList.add(
    className,
    "dropdown__btn",
    "button"
  );

  id && dropdownTrigger.setAttribute("id", "task-dropdown-button");


  if (dropdownSvg) {
    dropdownTrigger.appendChild(dropdownSvg);
  }

  if (dropdownLabel) {
    dropdownLabel.textContent = label;
    dropdownTrigger.appendChild(dropdownLabel);
  }

  dropdownTrigger.setAttribute("aria-haspopup", "true");
  dropdownTrigger.setAttribute("aria-expanded", "false");

  return dropdownTrigger;
}

export function createDropdownMenu(items, props) {
  const { id: menuId, className: menuClass = "" } = props; 

  const dropdownMenu = doc.createElement("ul");
  const dropdownItems = createDropdownItems(items);

  dropdownMenu.classList.add(
    menuClass ? `${menuClass} dropdown__menu` : "dropdown__menu"
  );
  dropdownMenu.setAttribute("id", `${menuId}-`);

  dropdownMenu.append(...dropdownItems);

  return dropdownMenu;
}

export function createDropdownItems(actions) {
  const dropdownItems = actions.map((action) => {
    const dropdownItem = createDropdownItem();
    dropdownItem.appendChild(action);
    return dropdownItem;
  });

  return dropdownItems;
}

function createDropdownItem() {
  const dropdownItem = doc.createElement("li");
  dropdownItem.classList.add("dropdown__menu-item");
  return dropdownItem;
} 