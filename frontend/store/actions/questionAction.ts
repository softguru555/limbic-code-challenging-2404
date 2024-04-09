
import { INITIATEQUESTION, UPDATEQUESTION, DELETEQUESTION } from './types';

export const initiateQuestion = (questions) => ({
  type: INITIATEQUESTION,
  payload: questions,
});

export const updateQuestion = (questions) => ({
  type: UPDATEQUESTION,
  payload: questions,
});

export const deleteQuestion = (_id) => ({
  type: DELETEQUESTION,
  payload: _id,
});
