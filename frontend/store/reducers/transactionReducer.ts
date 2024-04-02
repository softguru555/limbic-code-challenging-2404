import { UPDATETRANSACTION, DELETETRANSACTION, INITIATETRANSACTION } from '../actions/types';

const initialState = {
  transactions: []
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIATETRANSACTION:
      return {
        ...state,
        transactions: action.payload
      };
    case UPDATETRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions].map(transaction => transaction._id === action.payload._id ? action.payload : transaction)
      };
    case DELETETRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
      }
    default:
      return state;
  }
};

export default transactionReducer;
