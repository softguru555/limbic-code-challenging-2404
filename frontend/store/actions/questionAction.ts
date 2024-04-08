
import { INITIATEQUESTION, UPDATEQUESTION, DELETEQUESTION } from './types';

export const initiateQuestion = (questions) => ({
  type: INITIATEQUESTION,
  payload: questions,
});

export const updateQuestion = (questions) => ({
  type: UPDATEQUESTION,
  payload: questions,
});

export const deleteQuestion = (id) => ({
  type: DELETEQUESTION,
  payload: id,
});
