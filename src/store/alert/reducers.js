import { ALERT_ERROR, ALERT_SUCCESS, CLEAR_ALERT } from "./constants";

const initialState = {
  type: null,
  message: null,
};
const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALERT_SUCCESS:
      return {
        type: "alert-success",
        message: action.payload.message,
      };
    case ALERT_ERROR:
      return {
        type: "alert-danger",
        message: action.payload.message,
      };
    case CLEAR_ALERT:
      return {
        type: null,
        message: null,
      };
    default:
      return state;
  }
};
export { alertReducer };
