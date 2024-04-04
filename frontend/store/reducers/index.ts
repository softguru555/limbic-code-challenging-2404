import { combineReducers } from 'redux';
import authReducer from './authReducer'; 
import userReducer from './userReducer';
import questionReducer from './questionReducer';
import tradeReducer from './tradeReducer';
import transactionReducer from './transactionReducer';
import stockCodeReducer from './stockCodeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  question: questionReducer,
  trade:tradeReducer,
  transaction: transactionReducer,
  stockCode: stockCodeReducer,
});

export default rootReducer;
