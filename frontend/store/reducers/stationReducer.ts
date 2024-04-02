import { INITIATESTATION, UPDATESTATION, DELETESTATION } from '../actions/types';

const initialState = {
  stations: []
};

const stationReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIATESTATION:
      return {
        ...state,
       stations: action.payload
      };
    case UPDATESTATION:
      return {
        ...state,
        stations: [...state.stations, action.payload]
      };
    case DELETESTATION:
      return {
        ...state,
        stations: state.stations.filter(station => station._id !== action.payload)
      }
    default:
      return state;
  }
};

export default stationReducer;
