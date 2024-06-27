export const getStateFromLocalStorage = (key) => localStorage.getItem(key);

export const setStateToLocalStorage = (key, value) =>
  localStorage.setItem(key, value);

export const removeStateFromLocalStorage = (key) =>
  localStorage.removeItem(key);

export const objectKeys = (object) => Object.keys(object);

export const objectValues = (object) => Object.values(object);

export const objectEntries = (object) => Object.entries(object);
