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

const initialState = {
  loading: false,
  error: null,
  receivedInvites: [],
  sentInvites: [],
};

const invitesReducer = (state = initialState, action) => {
  switch (action.type) {
    case INVITE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case INVITE_SUCCESS: {
      const invs = [...state.sentInvites, action.payload];
      return {
        ...state,
        loading: false,
        error: null,
        sentInvites: invs,
      };
    }
    case INVITE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case ADD_RECEIVED_INVITE: {
      const invs = [...state.receivedInvites, action.payload];
      return {
        ...state,
        receivedInvites: invs,
      };
    }
    case RECEIVED_INVITE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case RECEIVED_INVITE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        receivedInvites: action.payload,
      };
    }
    case RECEIVED_INVITE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case MARK_READ_REQUEST: {
      return { ...state, loading: true };
    }
    case MARK_READ_SUCCESS: {
      const invs = [...state.receivedInvites].map((invite) =>
        invite._id === action.payload ? { ...invite, isSeen: true } : invite
      );
      return { ...state, loading: false, error: null, receivedInvites: invs };
    }
    case MARK_READ_FAILURE: {
      return { ...state, loading: false, error: action.payload };
    }
    case ACCEPT_INVITE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case ACCEPT_INVITE_SUCCESS: {
      const invs = [...state.receivedInvites].filter(
        (invitation) => invitation._id !== action.payload
      );
      return {
        ...state,
        loading: false,
        error: null,
        receivedInvites: invs,
      };
    }
    case ACCEPT_INVITE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case REMOVE_INVITE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case REMOVE_INVITE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }
    case REMOVE_INVITE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case REMOVE_RECEIVED_INVITE: {
      const invs = [...state.receivedInvites].filter(
        (invitation) => invitation._id !== action.payload
      );
      return {
        ...state,
        receivedInvites: invs,
      };
    }
    case REMOVE_SENT_INVITE: {
      const invs = [...state.sentInvites].filter(
        (invitation) => invitation._id !== action.payload
      );
      return {
        ...state,
        sentInvites: invs,
      };
    }
    case SENT_INVITE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case SENT_INVITE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        sentInvites: action.payload,
      };
    }
    case SENT_INVITE_FAILURE: {
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

export { invitesReducer };
