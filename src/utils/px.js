import {Dimensions, Platform, PixelRatio} from 'react-native';

const dimen = Dimensions.get('window');
const deviceWidth = dimen.width;
const rate = 1; // Global.isTablet ? 0.65 : 1;

export default function px(size) {
  if (PixelRatio.get() >= 3 && Platform.OS === 'ios' && size === 1) {
    return size;
  }
  return (deviceWidth / 750) * rate * size;
}
