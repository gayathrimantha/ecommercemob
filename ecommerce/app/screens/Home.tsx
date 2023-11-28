import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {theme} from '../themes/light/properties/colors';
import {rs, wp} from '../themes/ResponsiveScreen';
import {toGet} from '../config/api/ApiServices';
import {useNavigation} from '@react-navigation/native';
import {HomeStackParamList} from './HomeStack';
import {StackNavigationProp} from '@react-navigation/stack';
import {addToCart, addToFav, removeFromFav} from '../redux/actions';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {typography} from '../themes/light/properties/typography';
import Loader from './Loader';

interface HomeProps {
  addToCart: typeof addToCart;
  favItems: any[]; // Ideally, replace any with a more specific type
  addToFav: typeof addToFav;
  removeFromFav: typeof removeFromFav;
  cartItems: any[];
}

// Define ProductCardProps if needed
interface ProductCardProps {
  product: any; // Replace any with specific type
  isFav: boolean;
}

const Home: React.FC<HomeProps> = ({
  addToCart,
  favItems,
  addToFav,
  removeFromFav,
  cartItems,
}) => {
  const [searchText, setSearchText] = useState('');

  const handleAddToCart = (product: any) => {
    addToCart({...product, quantity: 1});
    Toast.show(`${product.title} added to cart!`, Toast.LONG);
  };
  const navigation =
    useNavigation<StackNavigationProp<HomeStackParamList, 'Home'>>();
  const [listData, setListData] = useState<any[]>([]); // Replace any with specific type
  const [isLoading, setIsLoading] = useState(false);

  const isItemFavorited = (itemId: string) =>
    favItems.some(item => item.id === itemId);

  const ProductCard = ({product, isFav}: any) => {
    const handleFavIconClick = () => {
      if (isFav) {
        removeFromFav(product.id);
        Toast.show('Item removed!', Toast.LONG);
      } else {
        addToFav(product);
        Toast.show('Item added!', Toast.LONG);
      }
    };
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Product', {item: product})}>
        <TouchableOpacity onPress={handleFavIconClick} style={styles.favIcon}>
          <Image
            source={
              isFav
                ? require('../assets/icons/Vector_Red.png')
                : require('../assets/icons/Vector.png')
            }
            style={{
              height: rs(12),
              width: rs(13),
            }}
          />
        </TouchableOpacity>
        <Image source={{uri: product?.thumbnail}} style={styles.image} />

        <View style={styles.buttonContainer}>
          <Text style={styles.price}>${product.price}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAddToCart(product)}>
            <Image source={require('../assets/icons/plus.png')} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{product.title}</Text>
      </TouchableOpacity>
    );
  };

  const getListItems = async () => {
    setIsLoading(true);
    const response: any = await toGet();
    console.log(response.products, 'response');
    setListData(response.products);
    setIsLoading(false);
  };
  useEffect(() => {
    getListItems();
  }, []);

  const filteredListData = listData.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()),
  );
  if (isLoading) {
    return (
      <Loader
        lottie={true}
        lottieuri={require('../assets/lottie/loading.json')}
      />
    );
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.containerOne}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.nameText}>Hey, Rahul</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={() => navigation.navigate('Fav')}>
                <Image
                  source={require('../assets/icons/Vector.png')}
                  style={{
                    width: rs(20),
                    height: rs(18),
                    marginTop: rs(40),
                    marginRight: rs(20),
                    tintColor: theme.colors.background,
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  marginTop: rs(37),
                  marginRight: rs(20),
                }}>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                  <MaterialIcons
                    name="shopping-cart"
                    size={rs(25)}
                    color="white"
                  />
                </TouchableOpacity>
                {
                  <View style={styles.cartCountContainer}>
                    <Text style={styles.cartCountText}>{cartItems.length}</Text>
                  </View>
                }
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',

              width: rs(320),
              height: rs(45),
              backgroundColor: theme.colors.darkBlue,
              // fontSize: rs(12),
              paddingLeft: rs(10),
              borderRadius: rs(20),

              marginHorizontal: rs(10),
              marginTop: rs(30),
            }}>
            <Image
              source={require('../assets/icons/Search_Icon.png')}
              style={{
                width: rs(15),
                height: rs(15),
                marginTop: rs(15),
                marginRight: rs(10),
              }}
            />
            <TextInput
              returnKeyType="done"
              allowFontScaling={true}
              placeholder="Search Products or store"
              placeholderTextColor="#b0b0b0"
              onChangeText={text => setSearchText(text)}
              value={searchText}
              style={{color: theme.colors.background}}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: rs(10),
            }}>
            <TouchableOpacity style={styles.deliveryContainer}>
              <Text style={styles.deliveryContainerText}>DELIVERY TO</Text>
              <Image
                source={require('../assets/icons/Frame_8676.png')}
                style={{
                  width: rs(155),
                  height: rs(15),
                  marginTop: rs(5),
                  marginRight: rs(10),
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deliveryContainer}>
              <Text style={styles.deliveryContainerText}>Within</Text>
              <Image
                source={require('../assets/icons/Frame_8677.png')}
                style={{
                  width: rs(55),
                  height: rs(15),
                  marginTop: rs(5),
                  marginRight: rs(10),
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Image
            source={require('../assets/icons/Card.png')}
            style={{
              width: rs(269),
              height: rs(123),
              marginTop: rs(15),
              marginLeft: rs(10),
            }}
          />
        </View>
        <View>
          <Text
            style={{
              color: theme.colors.blackGrey,
              fontSize: rs(30),
              lineHeight: rs(38),
              marginTop: rs(10),
              marginLeft: rs(10),
              fontFamily: typography.Sub,
            }}>
            Recommended
          </Text>
        </View>
        <View>
          <FlatList
            horizontal={false}
            data={searchText ? filteredListData : listData}
            renderItem={({item}) => (
              <ProductCard product={item} isFav={isItemFavorited(item.id)} />
            )}
            keyExtractor={(item: any) => item.id}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={refreshing}
            //     onRefresh={handleRefresh}
            //   />
            // }
            contentContainerStyle={{paddingBottom: rs(70)}}
            numColumns={2}
            key={'two-columns'}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: any) => ({
  // Replace any with the specific state type
  favItems: state.fav,
  cartItems: state.cart, // Ensure this matches your Redux state structure
});

const mapDispatchToProps = {
  addToCart,
  addToFav,
  removeFromFav,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  containerOne: {
    backgroundColor: theme.colors.bgBlue,
    flex: 0.3,
  },
  nameText: {
    fontSize: rs(22),
    color: theme.colors.greyWhite,
    marginTop: rs(35),
    marginLeft: rs(20),
    fontFamily: typography.Main,
  },
  deliveryContainer: {
    marginTop: rs(20),
    marginLeft: rs(5),
    paddingBottom: rs(10),
  },
  deliveryContainerText: {
    fontSize: rs(11),
    color: theme.colors.background,
    fontFamily: typography.Main,
  },
  card: {
    backgroundColor: theme.colors.lightGrey,
    borderRadius: rs(8),
    padding: rs(10),
    marginLeft: rs(10),
    width: '46%',
    alignItems: 'center',
    marginTop: rs(10),
  },
  image: {
    width: rs(100),
    height: rs(80),
    resizeMode: 'contain',
  },
  title: {
    marginTop: rs(5),
    color: theme.colors.blackGrey,
    fontFamily: typography.Sub,
  },
  price: {
    color: theme.colors.lightBlack,
    marginTop: rs(10),
    fontFamily: typography.Sub,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: rs(10),
  },
  button: {
    padding: rs(10),
    borderRadius: rs(5),
    marginHorizontal: rs(5),
  },
  buttonText: {
    color: '#fff',
  },
  favIcon: {
    position: 'absolute',
    top: rs(10),
    left: rs(10),
    zIndex: 1, // ensures the icon is above other elements
  },
  cartCountContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: theme.colors.yellow,
    borderRadius: rs(7.5), // Adjust for a circular shape
    width: rs(15),
    height: rs(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCountText: {
    color: 'white',
    fontSize: rs(10),
    fontWeight: 'bold',
  },
});
