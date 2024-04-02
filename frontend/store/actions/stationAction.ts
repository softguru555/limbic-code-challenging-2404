
import { INITIATESTATION, UPDATESTATION, DELETESTATION } from '../actions/types';

export const initiateStation = (stations) => ({
  type: INITIATESTATION,
  payload: stations,
});

export const updateStation = (station) => ({
  type: UPDATESTATION,
  payload: station,
});

export const deleteStation = (_id) => ({
  type: DELETESTATION,
  payload: _id,
});
