import {
  ADD_STUDENT_FAILURE,
  ADD_STUDENT_REQUEST,
  ADD_STUDENT_SUCCESS,
  DELETE_STUDENTS_FAILURE,
  DELETE_STUDENTS_REQUEST,
  DELETE_STUDENTS_SUCCESS,
  GET_STUDENT_BY_ID_FAILURE,
  GET_STUDENT_BY_ID_REQUEST,
  GET_STUDENT_BY_ID_SUCCESS,
  LOAD_STUDENTS_PAGING_FAILURE,
  LOAD_STUDENTS_PAGING_REQUEST,
  LOAD_STUDENTS_PAGING_SUCCESS,
  UPDATE_STUDENT_FAILURE,
  UPDATE_STUDENT_REQUEST,
  UPDATE_STUDENT_SUCCESS,
} from "./constants";
import { alertError, alertSuccess, clearAlert } from "../alert/actions";

import { studentService } from "../../services";

export const loadStudentsPaging = (keyword, currentPage) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOAD_STUDENTS_PAGING_REQUEST,
      });

      const data = await studentService.getStudentsPaging(keyword, currentPage);

      dispatch({
        type: LOAD_STUDENTS_PAGING_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOAD_STUDENTS_PAGING_FAILURE,
        payload: error.response?.data?.message
          ? error.response.data.message
          : error.message,
      });
    }
  };
};

export const addStudent = (student) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ADD_STUDENT_REQUEST,
      });

      await studentService.addStudent(student);

      dispatch({
        type: ADD_STUDENT_SUCCESS,
      });

      dispatch(alertSuccess("Thêm người dùng thành công"));
    } catch (error) {
      dispatch({
        type: ADD_STUDENT_FAILURE,
        payload: { error: error.toString() },
      });
      dispatch(alertError("Thêm người dùng thất bại"));
    }
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  };
};

export const updateStudent = (id, student) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_STUDENT_REQUEST,
      });

      await studentService.updateStudent(id, student);

      dispatch({
        type: UPDATE_STUDENT_SUCCESS,
      });
      dispatch(alertSuccess("Cập nhật người dùng thành công"));
    } catch (error) {
      dispatch({
        type: UPDATE_STUDENT_FAILURE,
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

export const getStudentById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_STUDENT_BY_ID_REQUEST,
      });

      const data = await studentService.getStudentById(id);

      dispatch({
        type: GET_STUDENT_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_STUDENT_BY_ID_FAILURE,
        payload: error.response?.data?.message
          ? error.response.data.message
          : error.message,
      });
    }
  };
};

export const deleteStudents = (studentIds) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_STUDENTS_REQUEST,
      });

      await studentService.deleteStudents(studentIds);

      dispatch({
        type: DELETE_STUDENTS_SUCCESS,
      });
      dispatch(loadStudentsPaging("", 1));
    } catch (error) {
      dispatch({
        type: DELETE_STUDENTS_FAILURE,
        payload: error.response?.data?.message
          ? error.response.data.message
          : error.message,
      });
    }
  };
};
