import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {rs} from '../themes/ResponsiveScreen';
import {theme} from '../themes/light/properties/colors';
import {connect} from 'react-redux';
import {adjustQuantity, removeFromCart} from '../redux/actions';

const CartItem = ({
  id,
  productName,
  productCost,
  quantity,
  adjustQuantity,
  thumbnail,
  removeFromCart,
}: any) => {
  //   const [quantityOne, setQuantityOne] = useState(0);
  console.log(quantity, 'quanity');
  const increaseQuantity = () => {
    console.log('Increasing Quantity:', id, quantity + 1);
    adjustQuantity(id, quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      console.log('Decreasing Quantity:', id, quantity - 1);
      adjustQuantity(id, quantity - 1);
    } else {
      removeFromCart(id);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: thumbnail}}
          style={{
            width: rs(20),
            height: rs(30),
            marginTop: rs(5),
            marginRight: rs(10),
          }}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{productName}</Text>
          <Text style={styles.productCost}>{`$${productCost}`}</Text>
        </View>
      </View>

      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={decreaseQuantity}>
          <Image
            source={require('../assets/icons/Remove.png')}
            style={{
              width: rs(30),
              height: rs(30),
              marginTop: rs(5),
              marginRight: rs(10),
            }}
          />
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={increaseQuantity}>
          <Image
            source={require('../assets/icons/Add.png')}
            style={{
              width: rs(30),
              height: rs(30),
              marginTop: rs(5),
              marginRight: rs(10),
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: rs(12),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.black10,
  },
  infoContainer: {
    flexDirection: 'column',
    marginLeft: rs(20),
  },
  productName: {
    fontSize: rs(14),

    color: theme.colors.blackGrey,
  },
  productCost: {
    fontSize: rs(12),
    color: 'grey',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    marginHorizontal: rs(10),
    fontSize: rs(14),
    color: theme.colors.black45,
  },
});

const mapDispatchToProps = {
  adjustQuantity,
  removeFromCart,
};

export default connect(null, mapDispatchToProps)(CartItem);
