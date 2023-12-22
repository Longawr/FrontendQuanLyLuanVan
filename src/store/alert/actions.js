import { ALERT_ERROR, ALERT_SUCCESS, CLEAR_ALERT } from "./constants";

const alertSuccess = (message) => {
  return { type: ALERT_SUCCESS, payload: { message } };
};

const alertError = (message) => {
  return { type: ALERT_ERROR, payload: { message } };
};

const clearAlert = () => {
  return { type: CLEAR_ALERT };
};

export { alertSuccess, alertError, clearAlert };
