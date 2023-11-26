import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {theme} from '../themes/light/properties/colors';
import {rs} from '../themes/ResponsiveScreen';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {HomeStackParamList} from './HomeStack';

const Product = ({item}: any) => {
  type HomeNavigationProp = NavigationProp<HomeStackParamList, 'Product'>;
  const navigation = useNavigation<HomeNavigationProp>();

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.containerOne}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/icons/Group_82.png')}
            style={{
              height: rs(30),
              width: rs(30),
            }}
          />
        </TouchableOpacity>
        <Image
          source={require('../assets/icons/Cart.png')}
          style={{
            height: rs(25),
            width: rs(25),
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Product;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  containerOne: {
    marginTop: rs(30),
    marginHorizontal: rs(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
