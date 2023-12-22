import {
  ACCEPT_INVITE_FAILURE,
  ACCEPT_INVITE_REQUEST,
  ACCEPT_INVITE_SUCCESS,
  ADD_RECEIVED_INVITE,
  INVITE_FAILURE,
  INVITE_REQUEST,
  INVITE_SUCCESS,
  MARK_READ_FAILURE,
  MARK_READ_REQUEST,
  MARK_READ_SUCCESS,
  RECEIVED_INVITE_FAILURE,
  RECEIVED_INVITE_REQUEST,
  RECEIVED_INVITE_SUCCESS,
  REMOVE_INVITE_FAILURE,
  REMOVE_INVITE_REQUEST,
  REMOVE_INVITE_SUCCESS,
  REMOVE_RECEIVED_INVITE,
  REMOVE_SENT_INVITE,
  SENT_INVITE_FAILURE,
  SENT_INVITE_REQUEST,
  SENT_INVITE_SUCCESS,
} from "./constants";
import { inviteService } from "../../services";
import { loadGroupsPaging } from "../group/actions";

export const invite = (groupID, userID, role) => async (dispatch) => {
  try {
    dispatch({
      type: INVITE_REQUEST,
    });

    const data = await inviteService.invite(groupID, userID, role);

    dispatch({
      type: INVITE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INVITE_FAILURE,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const getReceivedInvitation = () => async (dispatch) => {
  try {
    dispatch({
      type: RECEIVED_INVITE_REQUEST,
    });

    const data = await inviteService.getReiceivedInvitation();

    dispatch({
      type: RECEIVED_INVITE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RECEIVED_INVITE_FAILURE,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const getSentInvitation = () => async (dispatch) => {
  try {
    dispatch({
      type: SENT_INVITE_REQUEST,
    });

    const data = await inviteService.getSentInvitation();

    dispatch({
      type: SENT_INVITE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SENT_INVITE_FAILURE,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const addReceivedInvitation = (data) => async (dispatch) => {
  dispatch({ type: ADD_RECEIVED_INVITE, payload: data });
};

export const markAsRead = (id) => async (dispatch) => {
  try {
    dispatch({ type: MARK_READ_REQUEST });

    await inviteService.markAsRead(id);

    return dispatch({ type: MARK_READ_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: MARK_READ_FAILURE,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const acceptInvite = (id) => async (dispatch) => {
  try {
    dispatch({ type: ACCEPT_INVITE_REQUEST });

    await inviteService.acceptInvite(id);

    dispatch({ type: ACCEPT_INVITE_SUCCESS, payload: id });
    dispatch(loadGroupsPaging("", 1));
  } catch (error) {
    dispatch({
      type: ACCEPT_INVITE_FAILURE,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const removeInvite = (id, isReceivedInv) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_INVITE_REQUEST });

    await inviteService.removeInvite(id);

    dispatch({ type: REMOVE_INVITE_SUCCESS });
    const action = isReceivedInv ? REMOVE_RECEIVED_INVITE : REMOVE_SENT_INVITE;
    dispatch({ type: action, payload: id });
  } catch (error) {
    dispatch({
      type: REMOVE_INVITE_FAILURE,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const removeReceivedInvite = (id) => async (dispatch) => {
  dispatch({ type: REMOVE_RECEIVED_INVITE, payload: id });
};

export const removeSentInvite = (id) => async (dispatch) => {
  dispatch({ type: REMOVE_SENT_INVITE, payload: id });
};
