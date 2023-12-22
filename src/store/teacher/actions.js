import {
  ADD_TEACHER_FAILURE,
  ADD_TEACHER_REQUEST,
  ADD_TEACHER_SUCCESS,
  DELETE_TEACHERS_FAILURE,
  DELETE_TEACHERS_REQUEST,
  DELETE_TEACHERS_SUCCESS,
  GET_TEACHER_BY_ID_FAILURE,
  GET_TEACHER_BY_ID_REQUEST,
  GET_TEACHER_BY_ID_SUCCESS,
  LOAD_TEACHERS_PAGING_FAILURE,
  LOAD_TEACHERS_PAGING_REQUEST,
  LOAD_TEACHERS_PAGING_SUCCESS,
  UPDATE_TEACHER_FAILURE,
  UPDATE_TEACHER_REQUEST,
  UPDATE_TEACHER_SUCCESS,
} from "./constants";
import { alertError, alertSuccess, clearAlert } from "../alert/actions";

import { teacherService } from "../../services";

export const loadTeachersPaging = (keyword, currentPage) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOAD_TEACHERS_PAGING_REQUEST,
      });

      const data = await teacherService.getTeachersPaging(keyword, currentPage);

      dispatch({
        type: LOAD_TEACHERS_PAGING_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOAD_TEACHERS_PAGING_FAILURE,
        payload: error.response?.data?.message
          ? error.response.data.message
          : error.message,
      });
    }
  };
};

export const addTeacher = (teacher) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ADD_TEACHER_REQUEST,
      });

      await teacherService.addTeacher(teacher);

      dispatch({
        type: ADD_TEACHER_SUCCESS,
      });

      dispatch(alertSuccess("Thêm người dùng thành công"));
    } catch (error) {
      dispatch({
        type: ADD_TEACHER_FAILURE,
        payload: { error: error.toString() },
      });
      dispatch(alertError("Thêm người dùng thất bại"));
    }
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  };
};

export const updateTeacher = (id, teacher) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_TEACHER_REQUEST,
      });

      await teacherService.updateTeacher(id, teacher);

      dispatch({
        type: UPDATE_TEACHER_SUCCESS,
      });
      dispatch(alertSuccess("Cập nhật người dùng thành công"));
    } catch (error) {
      dispatch({
        type: UPDATE_TEACHER_FAILURE,
        payload: error.response?.data?.message
          ? error.response.data.message
          : error.message,
      });
      dispatch(alertError("Cập nhật người dùng thất bại"));
    }
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  };
};

export const getTeacherById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_TEACHER_BY_ID_REQUEST,
      });

      const data = await teacherService.getTeacherById(id);

      dispatch({
        type: GET_TEACHER_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_TEACHER_BY_ID_FAILURE,
        payload: error.response?.data?.message
          ? error.response.data.message
          : error.message,
      });
    }
  };
};

export const deleteTeachers = (teacherIds) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_TEACHERS_REQUEST,
      });

      await teacherService.deleteTeachers(teacherIds);

      dispatch({
        type: DELETE_TEACHERS_SUCCESS,
      });
      dispatch(loadTeachersPaging("", 1));
    } catch (error) {
      dispatch({
        type: DELETE_TEACHERS_FAILURE,
        payload: error.response?.data?.message
          ? error.response.data.message
          : error.message,
      });
    }
  };
};
