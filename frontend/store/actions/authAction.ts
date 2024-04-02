
import { LOGIN_SUCCESS,UPDATEAUTH, LOGOUT } from './types';

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const updateAuth = (user) => ({
  type: UPDATEAUTH,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
});
