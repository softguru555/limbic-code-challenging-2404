
import { INITIATEANSWER, UPDATEANSWER, DELETEANSWER } from './types';

export const initiateAnswer = (answer) => ({
  type: INITIATEANSWER,
  payload: answer,
});

export const updateAnswer = (answer) => ({
  type: UPDATEANSWER,
  payload: answer,
});

export const deleteAnswer = (_id) => ({
  type: DELETEANSWER,
  payload: _id,
});
