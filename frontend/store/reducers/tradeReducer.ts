import { UPDATETRADE, DELETETRADE, INITIATETRADE } from '../actions/types';

const initialState = {
  trades: []
};

const tradeReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIATETRADE:
      return {
        ...state,
        trades: action.payload
      };
    case UPDATETRADE:
      return {
        ...state,
        trades: [...state.trades].map(trade => trade._id === action.payload._id ? action.payload : trade)
      };
    case DELETETRADE:
      return {
        ...state,
        trades: state.trades.filter(trade => trade._id !== action.payload)
      }
    default:
      return state;
  }
};

export default tradeReducer;
