import {Platform} from 'react-native';

export const typography = {
  Main: Platform.select({
    ios: 'Manrope-Regular',
    android: 'Manrope-Regular',
  }),
  Title: Platform.select({
    ios: 'Manrope-Bold',
    android: 'Manrope-Bold',
  }),
  Sub: Platform.select({
    ios: 'Manrope-Light',
    android: 'Manrope-Light',
  }),
  Semi: Platform.select({
    ios: 'Manrope-SemiBold',
    android: 'Manrope-SemiBold',
  }),
};
