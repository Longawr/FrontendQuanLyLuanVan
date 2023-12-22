import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { AUTH, CURRENT_USER, loadObjState } from "../helpers";
import { accountReducer } from "./account/reducers";
import { groupsReducer } from "./group/reducers";
import { invitesReducer } from "./invite/reducers";
import { studentsReducer } from "./student/reducers";
import { teachersReducer } from "./teacher/reducers";
import { USER_LOGOUT } from "./account/constants";

const auth = loadObjState(AUTH);
const user = loadObjState(CURRENT_USER);
const preloadedState = {
  account: { auth, user, searchItems: [] },
};

const reducer = combineReducers({
  account: accountReducer,
  groups: groupsReducer,
  invites: invitesReducer,
  students: studentsReducer,
  teachers: teachersReducer,
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined;
  }
  return reducer(state, action);
};

export const store = configureStore({
  devTools: true,
  preloadedState,
  reducer: rootReducer,
});
