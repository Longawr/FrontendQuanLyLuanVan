import {
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

const initialState = {
  items: [],
  page: 1,
  total: 0,
  pageSize: 0,
  loading: false,
  error: null,
  editGroup: null,
  selectedFile: null,
};

const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GROUPS_PAGING_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOAD_GROUPS_PAGING_SUCCESS: {
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
    case LOAD_GROUPS_PAGING_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case GET_GROUP_BY_ID_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_GROUP_BY_ID_SUCCESS: {
      return {
        ...state,
        editGroup: action.payload,
        loading: false,
        error: null,
      };
    }
    case GET_GROUP_BY_ID_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case UPDATE_GROUP_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case UPDATE_GROUP_SUCCESS: {
      let newgroup = { ...state.editGroup, ...action.payload };
      return {
        ...state,
        editGroup: newgroup,
        loading: false,
        error: null,
      };
    }
    case UPDATE_GROUP_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case DELETE_GROUPS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case DELETE_GROUPS_SUCCESS: {
      return {
        ...state,
        error: null,
      };
    }
    case DELETE_GROUPS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case DOWNLOAD_FILE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case DOWNLOAD_FILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }
    case DOWNLOAD_FILE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case DELETE_FILE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case DELETE_FILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }
    case DELETE_FILE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case UPLOAD_FILE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case UPLOAD_FILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }
    case UPLOAD_FILE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case DELETE_MEMBERS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case DELETE_MEMBERS_SUCCESS: {
      return {
        ...state,
        error: null,
      };
    }
    case DELETE_MEMBERS_FAILURE: {
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

export { groupsReducer };
