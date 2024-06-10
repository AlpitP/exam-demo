export const getLocalStorage = (key) => localStorage.getItem(key);

export const setLocalStorage = (key, value) => localStorage.setItem(key, value);

export const removeLocalStorage = (key) => localStorage.removeItem(key);

export const capitalize = (text) => text[0].toUpperCase() + text.slice(1);

export const objectKeys = (object) => Object.keys(object);

export const objectValues = (object) => Object.values(object);

export const objectEntries = (object) => Object.entries(object);
