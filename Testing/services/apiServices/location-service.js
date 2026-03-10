import { axiosInstance } from './axiosInstance';
import { FIND_LOCATION } from './constants';

export const findLocation = async (coords) => {
  try {
    const response = await axiosInstance.post(FIND_LOCATION, {
      lat: 13.15,
      lng: 75.63,
    });

    // lat: coords.latitude,
    // lng: coords.longitude,

    return response.data;
  } catch (err) {
    console.error('Error finding location', err);
    return { found: false, locationName: null };
  }
};
