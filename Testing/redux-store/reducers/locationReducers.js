import { DROP_PIN_COORDINATES, SET_LOCATION_NAME, SET_USER_COORDS } from '../types/locationTypes';

const initialState = {
  coords: null,
  locationName: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER_COORDS:
      return { ...state, coords: action.payload };

    case SET_LOCATION_NAME:
      return { ...state, locationName: action.payload };

    case DROP_PIN_COORDINATES:
      return { ...state, dropCoords: action.payload };

    default:
      return state;
  }
}
