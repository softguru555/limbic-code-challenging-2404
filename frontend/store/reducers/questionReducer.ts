import { UPDATEQUESTION, DELETEQUESTION, INITIATEQUESTION } from '../actions/types';

const initialState = {
  questions: []
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIATEQUESTION:
      return {
        ...state,
        questions: action.payload
      };
    case UPDATEQUESTION:
      return {
        ...state,
        questions: [...state.questions].map(question => question._id === action.payload._id ? action.payload : question)
      };
    case DELETEQUESTION:
      return {
        ...state,
        questions: state.questions.filter(question => question._id !== action.payload)
      }
    default:
      return state;
  }
};

export default questionReducer;
