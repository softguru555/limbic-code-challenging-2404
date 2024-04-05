import { UPDATEANSWER, DELETEANSWER, INITIATEANSWER } from '../actions/types';

const initialState = {
  answers: []
};

const answerReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIATEANSWER:
      return {
        ...state,
        answers: action.payload
      };
    case UPDATEANSWER:
      return {
        ...state,
        answers: [...state.answers].map(answer => answer._id === action.payload._id ? action.payload : answer)
      };
    case DELETEANSWER:
      return {
        ...state,
        answers: state.answers.filter(answer => answer._id !== action.payload)
      }
    default:
      return state;
  }
};

export default answerReducer;
