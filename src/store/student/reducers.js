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

const initialState = {
  items: [],
  page: 1,
  total: 0,
  pageSize: 0,
  loading: false,
  deletedCount: 0,
  error: null,
  editStudent: null,
};

const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_STUDENTS_PAGING_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOAD_STUDENTS_PAGING_SUCCESS: {
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
        page: action.payload.page,
        pageSize: action.payload.pageSize,
        loading: false,
        error: null,
      };
    }
    case LOAD_STUDENTS_PAGING_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case GET_STUDENT_BY_ID_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_STUDENT_BY_ID_SUCCESS: {
      return {
        ...state,
        editStudent: action.payload,
        loading: false,
        error: null,
      };
    }
    case GET_STUDENT_BY_ID_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case UPDATE_STUDENT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case UPDATE_STUDENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }
    case UPDATE_STUDENT_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case DELETE_STUDENTS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case DELETE_STUDENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }
    case DELETE_STUDENTS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case ADD_STUDENT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case ADD_STUDENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }
    case ADD_STUDENT_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export { studentsReducer };
