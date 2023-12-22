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
} from "./constants";

const initialState = {
  loading: false,
  error: null,
  auth: null,
  user: null,
  searchItems: [],
  selectedItem: null,
};

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    //login
    case USER_LOGIN_REQUEST:
      return { searchItems: [], loading: true };
    case USER_LOGIN_SUCCESS:
      return { searchItems: [], loading: false, auth: action.payload };
    case USER_LOGIN_FAILURE:
      return { loading: false, error: action.payload };
    // refresh token
    case REFRESH_TOKEN_REQUEST:
      return { ...state, loading: true };
    case REFRESH_TOKEN_SUCCESS:
      return { ...state, loading: false, error: null, auth: action.payload };
    case REFRESH_TOKEN_FAILURE:
      return { loading: false, error: action.payload };
    //get user detail
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { ...state, loading: false, error: null, user: action.payload };
    case USER_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    //search for user
    case SEARCH_USERS_REQUEST:
      return { ...state, loading: true };
    case SEARCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        searchItems: action.payload,
      };
    case SEARCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        searchItems: [],
      };
    case SET_SEARCH_USER:
      return {
        ...state,
        loading: false,
        searchItems: [],
        selectedItem: action.payload,
      };
    //edit user
    case EDIT_USER_REQUEST:
      return { ...state, loading: true };
    case EDIT_USER_SUCCESS:
      return { ...state, loading: false, error: null, user: action.payload };
    case EDIT_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
