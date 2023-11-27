import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {
  useNavigation,
  NavigationProp,
  RouteProp,
} from '@react-navigation/native';
import {HomeStackParamList} from './HomeStack';
import {rs} from '../themes/ResponsiveScreen';
import {theme} from '../themes/light/properties/colors';
import {FlatList} from 'react-native-gesture-handler';
import CartItem from './CartItem';
import {connect} from 'react-redux';

type CartRouteProp = {
  route: RouteProp<HomeStackParamList, 'Cart'>;
  cartItems: any[]; // Define the type according to your cart item structure
};

type Props = {
  route: CartRouteProp;
};

const Cart = ({cartItems}: CartRouteProp) => {
  console.log(cartItems, 'Cart Items');
  type HomeNavigationProp = NavigationProp<HomeStackParamList, 'Cart'>;
  const navigation = useNavigation<HomeNavigationProp>();
  const products = [
    {
      id: 1,
      name: 'Apple',
      cost: 0.99,
    },
    {
      id: 2,
      name: 'Banana',
      cost: 0.5,
    },
    {
      id: 3,
      name: 'Orange',
      cost: 0.75,
    },
    {
      id: 4,
      name: 'Grapes',
      cost: 2.99,
    },
    {
      id: 5,
      name: 'Bread',
      cost: 1.99,
    },
  ];

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
        <Text style={styles.shoppingCartText}>Shopping Cart</Text>
      </View>
      <View style={{marginTop: rs(20)}}>
        <FlatList
          horizontal={false}
          data={cartItems}
          renderItem={({item}) => (
            <CartItem
              productName={item.title}
              productCost={item.price}
              thumbnail={item.thumbnail}
              quantity={item.quantity}
              id={item.id}
            />
          )}
          keyExtractor={(item: any) => item.id}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={refreshing}
          //     onRefresh={handleRefresh}
          //   />
          // }
          contentContainerStyle={{paddingBottom: rs(70)}}
          numColumns={1}
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.totalBoxStyle}>Subtotal</Text>
          <Text style={styles.totalBoxStyleBlack}>$1</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.totalBoxStyle}>Delivery</Text>
          <Text style={styles.totalBoxStyleBlack}>$1</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.totalBoxStyle}>Total</Text>
          <Text style={styles.totalBoxStyleBlack}>$1</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.proceedtoPay}>
            <Text style={styles.proceedtoPayText}>Proceed to Checkout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state: any) => ({
  cartItems: state.cart, // Adjust this according to your Redux state structure
});

export default connect(mapStateToProps)(Cart);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  containerOne: {
    marginTop: rs(30),
    marginHorizontal: rs(10),
    flexDirection: 'row',
  },
  shoppingCartText: {
    color: theme.colors.blackGrey,
    marginLeft: rs(20),
    marginTop: rs(4),
    fontSize: rs(14),
  },
  bottomContainer: {
    marginTop: rs(0),
    marginHorizontal: rs(10),
    height: rs(200),
    backgroundColor: theme.colors.black10,
    borderRadius: rs(10),
  },
  totalBoxStyle: {
    color: theme.colors.black45,
    margin: rs(10),
    fontSize: rs(14),
    paddingHorizontal: rs(10),
  },
  totalBoxStyleBlack: {
    color: theme.colors.blackGrey,
    margin: rs(10),
    fontSize: rs(14),
    paddingHorizontal: rs(10),
  },
  proceedtoPay: {
    backgroundColor: theme.colors.bgBlue,
    marginHorizontal: rs(25),
    marginTop: rs(20),
    height: rs(35),
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: rs(10),
  },
  proceedtoPayText: {
    color: theme.colors.background,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: rs(13),
  },
});
