import uuid from 'react-native-uuid';

export function getUUID() {
  return uuid.v4(); // This usually works without the 'get-random-values' dependency
}