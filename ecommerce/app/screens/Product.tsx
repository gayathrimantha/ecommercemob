import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../themes/light/properties/colors';
import {rp, rs} from '../themes/ResponsiveScreen';
import {
  useNavigation,
  NavigationProp,
  RouteProp,
} from '@react-navigation/native';
import {HomeStackParamList} from './HomeStack';
import {FlatList} from 'react-native-gesture-handler';
import {addToCart, addToFav, removeFromFav} from '../redux/actions';
import {connect} from 'react-redux';
import {Rating} from 'react-native-ratings';

type ProductRouteProp = RouteProp<HomeStackParamList, 'Product'>;

type Props = {
  route: ProductRouteProp;
  addToCart: typeof addToCart;
  addToFav: typeof addToFav;
  removeFromFav: typeof removeFromFav;
};
const windowWidth = Dimensions.get('window').width;

const Product = ({
  route,
  addToCart,
  id,
  quantity,
  addToFav,
  removeFromFav,
}: any) => {
  const [isFav, setIsFav] = useState(false);

  const handleAddToCart = () => {
    addToCart({...item, quantity: 1});
  };
  type HomeNavigationProp = NavigationProp<HomeStackParamList, 'Product'>;
  const navigation = useNavigation<HomeNavigationProp>();
  const item = route.params.item;
  console.log(item, 'item');
  const [activeIndex, setActiveIndex] = useState(0); // State to track the active image index
  const handleFavIconClick = () => {
    if (isFav) {
      removeFromFav(item.id);
      setIsFav(false);
    } else {
      addToFav(item);
      setIsFav(true);
    }
  };

  const renderIndicator = () => {
    return (
      <View style={styles.indicatorContainer}>
        {item.images.map((image: any, index: any) => (
          <View
            key={index}
            style={[
              styles.indicator,
              activeIndex === index ? styles.activeIndicator : null,
            ]}
          />
        ))}
      </View>
    );
  };

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
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Image
            source={require('../assets/icons/Cart.png')}
            style={{
              height: rs(25),
              width: rs(25),
            }}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.titleName}>{item.title}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: rs(20),
          justifyContent: 'space-between',
        }}>
        <Rating
          type="star"
          ratingCount={5}
          imageSize={15}
          readonly
          startingValue={item.rating}
          // onFinishRating={ratingCompleted}
          // Additional styling or properties can be added here
        />
        <TouchableOpacity onPress={handleFavIconClick}>
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
      </View>

      <FlatList
        data={item.images}
        renderItem={({item}) => (
          <Image source={{uri: item}} style={styles.image} />
        )}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={true}
        onScroll={e => {
          const contentOffset = e.nativeEvent.contentOffset.x;
          const viewSize = e.nativeEvent.layoutMeasurement.width;
          const activeIndexOne = Math.floor(contentOffset / viewSize);
          console.log(activeIndexOne, 'activeIndexOne');
          setActiveIndex(activeIndexOne);
        }}
        scrollEventThrottle={1}
        style={{marginTop: rs(25)}}
      />
      {renderIndicator()}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: rs(16),
          backgroundColor: 'white', // Or any other background color
          elevation: 1, // for Android
          shadowColor: '#000', // for iOS
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          padding: rs(5),
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.priceText}>${item.price}</Text>
          <View
            style={{
              backgroundColor: theme.colors.bgBlue,
              width: rs(65),
              marginLeft: rs(10),
              borderRadius: rs(10),
              height: rs(22),
            }}>
            <Text
              style={{
                color: theme.colors.greyWhite,
                alignContent: 'center',
                justifyContent: 'center',
                padding: rs(3),
                fontSize: rs(10),
                marginLeft: rs(2),
              }}>
              {item.discountPercentage}% OFF
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              color: theme.colors.bgBlue,
              marginRight: rs(20),
              fontSize: rs(12),
            }}>
            Only {item.stock} left
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: rs(5),
        }}>
        <TouchableOpacity
          style={styles.addTocartContainer}
          onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowContainer}>
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: rs(10)}}>
        <Text
          style={{
            color: theme.colors.blackGrey,
            marginLeft: rs(10),
            fontSize: rs(13),
          }}>
          Details
        </Text>
        <Text
          style={{
            color: theme.colors.black45,
            marginLeft: rs(10),
            fontSize: rs(12),
            marginTop: rs(5),
          }}>
          {item.description}
        </Text>
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = {
  addToCart,
  removeFromFav,
  addToFav,
};
export default connect(null, mapDispatchToProps)(Product);

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
  titleName: {
    fontSize: rs(50),
    color: theme.colors.lightBlack,
    marginLeft: rs(20),
  },
  image: {
    width: windowWidth,
    height: rs(250),
    resizeMode: 'contain',
    padding: rs(5),
  },
  indicatorContainer: {
    flexDirection: 'row',

    marginTop: rs(-40),
    marginBottom: rs(15),
    marginLeft: rs(5),
  },
  indicator: {
    width: rs(20),
    height: rs(5),
    borderRadius: rs(5),
    backgroundColor: theme.colors.black20,
    marginHorizontal: rs(5),
  },
  activeIndicator: {
    backgroundColor: theme.colors.yellow,
  },
  priceText: {
    color: theme.colors.bgBlue,
    marginLeft: rs(20),
    fontSize: rs(14),
  },
  addTocartContainer: {
    borderColor: theme.colors.bgBlue,
    borderWidth: 1,
    height: rs(35),
    width: rs(110),
    backgroundColor: theme.colors.greyWhite,
    borderRadius: rs(10),
    marginLeft: rs(15),
    marginTop: rs(15),
    textAlign: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: theme.colors.bgBlue,
    fontSize: rs(10),
    textAlign: 'center',
    justifyContent: 'center',
  },
  buyNowContainer: {
    borderWidth: 1,
    height: rs(35),
    width: rs(110),
    backgroundColor: theme.colors.bgBlue,
    borderRadius: rs(10),
    marginRight: rs(15),
    marginTop: rs(15),
    textAlign: 'center',
    justifyContent: 'center',
  },
  buyNowText: {
    color: theme.colors.greyWhite,
    fontSize: rs(10),
    textAlign: 'center',
    justifyContent: 'center',
  },
});
