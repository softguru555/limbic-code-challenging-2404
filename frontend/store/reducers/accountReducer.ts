import { UPDATEACCOUNT, DELETEACCOUNT, INITIATEACCOUNT } from '../actions/types';

const initialState = {
  accounts: []
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIATEACCOUNT:
      return {
        ...state,
        accounts: action.payload
      };
    case UPDATEACCOUNT:
      return {
        ...state,
        accounts: [...state.accounts].map(account => account._id === action.payload._id ? action.payload : account)
      };
    case DELETEACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter(account => account._id !== action.payload)
      }
    default:
      return state;
  }
};

export default accountReducer;
