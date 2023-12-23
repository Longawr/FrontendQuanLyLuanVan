import {
  EDIT_USER_FAILURE,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  SEARCH_USERS_FAILURE,
  SEARCH_USERS_REQUEST,
  SEARCH_USERS_SUCCESS,
  SET_SEARCH_USER,
  USER_DETAILS_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "./constants";
import { accountService } from "../../services/account.service";

let refreshTokenRequest = null;

export const login = (id, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
      payload: { id, password },
    });

    const data = await accountService.login(id, password);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  await accountService.logout();
  dispatch({ type: USER_LOGOUT });
};

export const refreshToken = () => async (dispatch) => {
  try {
    dispatch({
      type: REFRESH_TOKEN_REQUEST,
    });
    refreshTokenRequest = refreshTokenRequest
      ? refreshTokenRequest
      : accountService.refreshToken();
    const { data } = await refreshTokenRequest;
    refreshTokenRequest = null;
    dispatch({
      type: REFRESH_TOKEN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REFRESH_TOKEN_FAILURE,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
    dispatch(logout());
  }
};

export const getCurrentUser = () => async (dispatch) => {
  dispatch({
    type: USER_DETAILS_REQUEST,
  });
  try {
    const data = await accountService.getCurrentUser();
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch(logout());
  }
};

export const searchUsers = (searchText, groupID) => async (dispatch) => {
  dispatch({
    type: SEARCH_USERS_REQUEST,
  });
  try {
    const data = await accountService.getUsersbyID(searchText, groupID);
    dispatch({
      type: SEARCH_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_USERS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const selectedSearch = (_id, role) => async (dispatch) => {
  dispatch({
    type: SET_SEARCH_USER,
    payload: { _id, role },
  });
};

export const editCurrentUser = (user) => async (dispatch) => {
  dispatch({
    type: EDIT_USER_REQUEST,
  });
  try {
    const data = await accountService.editCurrentUser(user);
    dispatch({
      type: EDIT_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_USER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
