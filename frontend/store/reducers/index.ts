import { combineReducers } from 'redux';
import authReducer from './authReducer'; 
import stationReducer from './stationReducer';
import accountReducer from './accountReducer';
import tradeReducer from './tradeReducer';
import transactionReducer from './transactionReducer';
import stockCodeReducer from './stockCodeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  station: stationReducer,
  account: accountReducer,
  trade:tradeReducer,
  transaction: transactionReducer,
  stockCode: stockCodeReducer,
});

export default rootReducer;
