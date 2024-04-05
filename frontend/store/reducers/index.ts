import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import questionReducer from './questionReducer';
import tradeReducer from './tradeReducer';
import transactionReducer from './transactionReducer';
import answerReducer from './answerReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  question: questionReducer,
  trade: tradeReducer,
  transaction: transactionReducer,
  answer: answerReducer,
});

export default rootReducer;
