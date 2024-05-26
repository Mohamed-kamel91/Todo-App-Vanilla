/**
 * Retrieves the value associated with the specified key from local storage.
 * @param {string} key - The key to retrieve the value for.
 * @returns {*} The value retrieved from local storage, or null if the key is not found.
 */
export function getLocalStorage(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error retrieving from local storage:', error);
  }
}

/**
 * Sets the value associated with the specified key in local storage.
 * @param {string} key - The key to set the value for.
 * @param {*} value - The value to be stored in local storage.
 */
export function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting to local storage:', error);
  }
}