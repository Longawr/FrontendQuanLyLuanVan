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

const initialState = {
  items: [],
  page: 1,
  total: 0,
  pageSize: 0,
  loading: false,
  deletedCount: 0,
  error: null,
  editTeacher: null,
};

const teachersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TEACHERS_PAGING_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOAD_TEACHERS_PAGING_SUCCESS: {
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
    case LOAD_TEACHERS_PAGING_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case GET_TEACHER_BY_ID_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_TEACHER_BY_ID_SUCCESS: {
      return {
        ...state,
        editTeacher: action.payload,
        loading: false,
        error: null,
      };
    }
    case GET_TEACHER_BY_ID_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case UPDATE_TEACHER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case UPDATE_TEACHER_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }
    case UPDATE_TEACHER_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case DELETE_TEACHERS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case DELETE_TEACHERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }
    case DELETE_TEACHERS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case ADD_TEACHER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case ADD_TEACHER_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }
    case ADD_TEACHER_FAILURE: {
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

export { teachersReducer };
