export const getLocalStorage = (key) => localStorage.getItem(key);

export const setLocalStorage = (key, value) => localStorage.setItem(key, value);

export const removeLocalStorage = (key) => localStorage.removeItem(key);

export const objectKeys = (object) => Object.keys(object);

export const objectValues = (object) => Object.values(object);

export const objectEntries = (object) => Object.entries(object);
