
import { INITIATETRANSACTION, UPDATETRANSACTION, DELETETRANSACTION } from '../actions/types';

export const initiateTransaction = (transactions) => ({
  type: INITIATETRANSACTION,
  payload: transactions,
});

export const updateTransaction = (transaction) => ({
  type: UPDATETRANSACTION,
  payload: transaction,
});

export const deleteTransaction = (_id) => ({
  type: DELETETRANSACTION,
  payload: _id,
});
