  export function setActiveElement(parent, elements) {
    // Convert nodelist/HtmlCollection to array
    const els = Array.from(elements);

    // Delegate event to parent element
    parent.addEventListener("click", handleActive);

    // Event handler
    function handleActive(event) {
      els.forEach(el => {
        const isSelectedItem = event.target === el || el.contains(event.target);
        
        if (isSelectedItem) {
          toggleActive(el);
        } 
      });
    }

    function toggleActive(item) {
      if (!hasActiveClass(item)) {
        clearActiveClass();
        item.classList.add("active");
      }
    }

    function clearActiveClass() {
      els.forEach(el => {
        if (el.classList.contains("active")) {
          el.classList.remove("active");
        }
      });
    }

    function hasActiveClass(item) { 
      return item.classList.contains("active");
    }
  }