import { INITIATEUSER, UPDATEUSER, DELETEUSER } from '../actions/types';

const initialState = {
  user: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIATEUSER:
      return {
        ...state,
       user: action.payload
      };
    case UPDATEUSER:
      return {
        ...state,
        user: [...state.user, action.payload]
      };
    case DELETEUSER:
      return {
        ...state,
        user: state.user.filter(user => user.id !== action.payload)
      }
    default:
      return state;
  }
};

export default userReducer;
