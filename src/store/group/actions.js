import {
  ADD_GROUP_FAILURE,
  ADD_GROUP_REQUEST,
  ADD_GROUP_SUCCESS,
  DELETE_FILE_FAILURE,
  DELETE_FILE_REQUEST,
  DELETE_FILE_SUCCESS,
  DELETE_GROUPS_FAILURE,
  DELETE_GROUPS_REQUEST,
  DELETE_GROUPS_SUCCESS,
  DELETE_MEMBERS_FAILURE,
  DELETE_MEMBERS_REQUEST,
  DELETE_MEMBERS_SUCCESS,
  DOWNLOAD_FILE_FAILURE,
  DOWNLOAD_FILE_REQUEST,
  DOWNLOAD_FILE_SUCCESS,
  GET_GROUP_BY_ID_FAILURE,
  GET_GROUP_BY_ID_REQUEST,
  GET_GROUP_BY_ID_SUCCESS,
  LOAD_GROUPS_PAGING_FAILURE,
  LOAD_GROUPS_PAGING_REQUEST,
  LOAD_GROUPS_PAGING_SUCCESS,
  UPDATE_GROUP_FAILURE,
  UPDATE_GROUP_REQUEST,
  UPDATE_GROUP_SUCCESS,
  UPLOAD_FILE_FAILURE,
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
} from "./constants";
import { groupService } from "../../services";

export const loadGroupsPaging = (keyword, currentPage) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_GROUPS_PAGING_REQUEST,
    });

    const data = await groupService.getgroupsPaging(keyword, currentPage);

    dispatch({
      type: LOAD_GROUPS_PAGING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_GROUPS_PAGING_FAILURE,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const addGroup = (groupName) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_GROUP_REQUEST,
    });

    await groupService.addGroup(groupName);

    dispatch({
      type: ADD_GROUP_SUCCESS,
    });
    await dispatch(loadGroupsPaging("", 1));
  } catch (error) {
    dispatch({
      type: ADD_GROUP_FAILURE,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const updateGroup = (id, groupName, projectName) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_GROUP_REQUEST,
    });

    await groupService.updateGroup(id, groupName, projectName);

    let payload = {};
    if (projectName.trim()) payload.projectName = projectName.trim();
    if (groupName.trim()) payload.name = groupName.trim();

    dispatch({
      type: UPDATE_GROUP_SUCCESS,
      payload,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_GROUP_FAILURE,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const getGroupById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_GROUP_BY_ID_REQUEST,
    });

    const res = await groupService.getGroupById(id);

    dispatch({
      type: GET_GROUP_BY_ID_SUCCESS,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: GET_GROUP_BY_ID_FAILURE,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const deleteGroups = (groupIds) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_GROUPS_REQUEST,
    });

    await groupService.deleteGroups(groupIds);

    dispatch({
      type: DELETE_GROUPS_SUCCESS,
    });
    dispatch(loadGroupsPaging("", 1));
  } catch (error) {
    dispatch({
      type: DELETE_GROUPS_FAILURE,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const downloadFile = (groupID, fileID) => async (dispatch) => {
  try {
    dispatch({
      type: DOWNLOAD_FILE_REQUEST,
    });

    await groupService.downloadFile(groupID, fileID);

    dispatch({
      type: DOWNLOAD_FILE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DOWNLOAD_FILE_FAILURE,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const deleteFiles = (groupID, fileIDs) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_FILE_REQUEST,
    });

    await groupService.deleteFiles(groupID, fileIDs);

    dispatch({
      type: DELETE_FILE_SUCCESS,
    });
    dispatch(getGroupById(groupID));
  } catch (error) {
    dispatch({
      type: DELETE_FILE_FAILURE,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const uploadFile = (groupID, file) => async (dispatch) => {
  try {
    dispatch({
      type: UPLOAD_FILE_REQUEST,
    });

    await groupService.uploadFile(groupID, file);

    dispatch({
      type: UPLOAD_FILE_SUCCESS,
    });
    dispatch(getGroupById(groupID));
  } catch (error) {
    dispatch({
      type: UPLOAD_FILE_FAILURE,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const deleteMembers = (groupId, memberIDs) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_MEMBERS_REQUEST,
    });

    await groupService.deleteMembers(groupId, memberIDs);

    dispatch({
      type: DELETE_MEMBERS_SUCCESS,
    });
    dispatch(getGroupById(groupId));
  } catch (error) {
    dispatch({
      type: DELETE_MEMBERS_FAILURE,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
  }
};
