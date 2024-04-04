
import { INITIATEQUESTION, UPDATEQUESTION, DELETEQUESTION } from './types';

export const initiateQuestion = (question) => ({
  type: INITIATEQUESTION,
  payload: question,
});

export const updateQuestion = (question) => ({
  type: UPDATEQUESTION,
  payload: question,
});

export const deleteQuestion = (_id) => ({
  type: DELETEQUESTION,
  payload: _id,
});
