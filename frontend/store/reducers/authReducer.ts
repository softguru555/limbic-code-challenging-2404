import { LOGIN_SUCCESS, UPDATEAUTH, LOGOUT } from '../actions/types';

const initialState = {
  _id: null,
  isAuthenticated: false,
  role: null,
  username: null,
  email: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        _id: action.payload.id,
        isAuthenticated: true,
        role: action.payload.role,
        username: action.payload.username,
        email: action.payload.email,
      };

    case UPDATEAUTH:
      return {
        ...state,
        _id: action.payload.id,
        isAuthenticated: true,
        role: action.payload.role,
        username: action.payload.username,
        email: action.payload.email,
      };
    case LOGOUT:
      return {
        ...state,
        _id: null,
        isAuthenticated: false,
        role: null,
        username: null,
        email: null,
      };
    default:
      return state;
  }
};

export default authReducer;
