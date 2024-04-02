
import { INITIATETRADE, UPDATETRADE, DELETETRADE } from '../actions/types';

export const initiateTrade = (trades) => ({
  type: INITIATETRADE,
  payload: trades,
});

export const updateTrade = (trade) => ({
  type: UPDATETRADE,
  payload: trade,
});

export const deleteTrade = (_id) => ({
  type: DELETETRADE,
  payload: _id,
});
