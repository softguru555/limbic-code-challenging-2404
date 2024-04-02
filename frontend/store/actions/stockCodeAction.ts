
import { INITIATESTOCKCODE, UPDATESTOCKCODE, DELETESTOCKCODE } from '../actions/types';

export const initiateStockCode = (stockCodes) => ({
  type: INITIATESTOCKCODE,
  payload: stockCodes,
});

export const updateStockCode = (stockCode) => ({
  type: UPDATESTOCKCODE,
  payload: stockCode,
});

export const deleteStockCode = (_id) => ({
  type: DELETESTOCKCODE,
  payload: _id,
});
