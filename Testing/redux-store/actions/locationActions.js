import { SET_LOCATION_NAME, SET_USER_COORDS, DROP_PIN_COORDINATES } from '../types/locationTypes';

export const setUserCoords = (coords) => ({
  type: SET_USER_COORDS,
  payload: coords,
});

export const setLocationName = (name) => ({
  type: SET_LOCATION_NAME,
  payload: name,
});

export const dropPinCoordinates = (dropCoords) => ({
  type: DROP_PIN_COORDINATES,
  payload: dropCoords,
});
