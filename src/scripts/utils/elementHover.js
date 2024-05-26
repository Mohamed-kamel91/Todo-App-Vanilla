// Mouseover handler
export function handleAddHover(childElements) {
  const hoverableElements =
    typeof childElements === "string"
      ? [childElements]
      : Array.isArray(childElements)
      ? [...childElements]
      : [];

  return function (event) { 
    const target = event.target;
    let hoverableChild = null;

    if (hoverableElements?.length > 0) {
      // Check if the target hovered on is same or a descendant of the passed children.
      hoverableChild = target.closest(hoverableElements.join(","));
    }

    // Add "hovered" class only if target is same as element
    // or target is not same or a descendant of the passed children,
    // otherwise remove class.
    if (target === this || !hoverableChild) {
      this.classList.add("hovered");
    } else {
      this.classList.remove("hovered");
    }
  };
}

// Mouseleave handler
export function handleRemoveHover() {
  this.classList.remove("hovered");
}
