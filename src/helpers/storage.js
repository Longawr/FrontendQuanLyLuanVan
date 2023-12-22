// storage.js
export const AUTH = "auth";
export const CURRENT_USER = "current_user";

export const loadObjState = (stateName) => {
  try {
    const serializedState = JSON.parse(localStorage.getItem(stateName));
    if (serializedState === null) {
      return undefined;
    }
    return serializedState;
  } catch (err) {
    return undefined;
  }
};

export const saveObjState = (stateName, state) => {
  try {
    const stringifyState = JSON.stringify(state);
    localStorage.setItem(stateName, stringifyState);
  } catch {
    // ignore write errors
  }
};

export const removeState = (stateName) => {
  try {
    localStorage.removeItem(stateName);
  } catch (err) {}
};
