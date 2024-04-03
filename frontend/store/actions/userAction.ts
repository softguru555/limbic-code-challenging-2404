
import { INITIATEUSER, UPDATEUSER, DELETEUSER } from '../actions/types';

export const initiateUser = (users) => ({
  type: INITIATEUSER,
  payload: users,
});

export const updateUser = (user) => ({
  type: UPDATEUSER,
  payload: user,
});

export const deleteUser = (_id) => ({
  type: DELETEUSER,
  payload: _id,
});
