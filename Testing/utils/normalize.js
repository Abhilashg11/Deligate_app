import { Dimensions, PixelRatio } from 'react-native';

const { width } = Dimensions.get('window');
const guidelineBaseWidth = 375; // base iPhone 11 width

export const normalize = (size) => {
  return Math.round(PixelRatio.roundToNearestPixel(size * (width / guidelineBaseWidth)));
};
