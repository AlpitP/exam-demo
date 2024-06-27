import {
  getStateFromLocalStorage,
  objectEntries,
  removeStateFromLocalStorage,
  setStateToLocalStorage,
} from "./javascript";

export const isLoggedIn = () => {
  const result = JSON.parse(getStateFromLocalStorage("isLoggedIn"));
  return result || false;
};
export const setLoggedIn = () => setStateToLocalStorage("isLoggedIn", true);

export const setLoggedOut = () => removeStateFromLocalStorage("isLoggedIn");

export const getUserFromLocalStorage = () => {
  const keys = ["token", "name", "role"];

  return keys.reduce((acc, key) => {
    acc[key] = getStateFromLocalStorage(key);
    return acc;
  }, {});
};

export const addUserToLocalStorage = (obj) =>
  objectEntries(obj).forEach(([key, value]) => {
    setStateToLocalStorage(key, value);
  });

export const removeUserFromLocalStorage = (...rest) =>
  rest.forEach((key) => removeStateFromLocalStorage(key));
