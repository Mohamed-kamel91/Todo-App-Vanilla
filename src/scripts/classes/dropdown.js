export default class Dropdown {
  constructor(dropdown) {
    this.dropdown = dropdown;
    this.button = this.dropdown.querySelector(".dropdown__btn");
    this.menu = this.dropdown.querySelector(".dropdown__menu");

    this.button.addEventListener("click", this.handleToggleMenu.bind(this));
    this.menu.addEventListener("click", this.handleCloseMenu.bind(this));
    document.addEventListener("click", this.handleClickOutside.bind(this));
  }

  handleCloseMenu() {
    this.menu.classList.remove("open");
    this.button.setAttribute("aria-expanded", "false");
  }

  handleOpenMenu() {
    this.menu.classList.add("open");
    this.button.setAttribute("aria-expanded", "true");
  }

  handleToggleMenu() {
    const isOpen = this.menu.classList.contains("open");
    if (isOpen) {
      this.handleCloseMenu();
    } else {
      this.handleOpenMenu();
    }
  }

  handleClickOutside(event) {
    const isInsideMenu = this.menu.contains(event.target);
    const isButton =
      event.target === this.button || this.button.contains(event.target);
    
    if (!isInsideMenu && !isButton) {
      this.handleCloseMenu();
    }
  }
}
