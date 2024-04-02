import { INITIATESTOCKCODE, UPDATESTOCKCODE, DELETESTOCKCODE } from '../actions/types';

const initialState = {
  stockCodes: []
};

const stockCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIATESTOCKCODE:
      return {
        ...state,
        stockCodes: action.payload
      };
    case UPDATESTOCKCODE:
      return {
        ...state,
        stockCodes: [...state.stockCodes, action.payload]
      };
    case DELETESTOCKCODE:
      return {
        ...state,
        stockCodes: state.stockCodes.filter(stockCode => stockCode._id !== action.payload)
      }
    default:
      return state;
  }
};

export default stockCodeReducer;
