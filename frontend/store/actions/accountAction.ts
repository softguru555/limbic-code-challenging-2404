
import { INITIATEACCOUNT, UPDATEACCOUNT, DELETEACCOUNT } from '../actions/types';

export const initiateAccount = (accounts) => ({
  type: INITIATEACCOUNT,
  payload: accounts,
});

export const updateAccount = (account) => ({
  type: UPDATEACCOUNT,
  payload: account,
});

export const deleteAccount = (_id) => ({
  type: DELETEACCOUNT,
  payload: _id,
});
