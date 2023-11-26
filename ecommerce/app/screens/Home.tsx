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

type HomeProps = {
  navigation: StackNavigationProp<HomeStackParamList, 'Home'>;
};

const Home = () => {
  const navigation = useNavigation<HomeProps['navigation']>();
  const [isLoading, setIsLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [isFavIconClicked, setFavIconClicked] = useState(false);

  const handleFavIconClick = () => {
    setFavIconClicked(!isFavIconClicked);
  };
  const ProductCard = ({product}: any) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Product', {item: product})}>
        <TouchableOpacity onPress={handleFavIconClick} style={styles.favIcon}>
          <Image
            source={
              isFavIconClicked
                ? require('../assets/icons/Vector.png')
                : require('../assets/icons/Vector_Red.png')
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
          <TouchableOpacity style={styles.button}>
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.containerOne}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.nameText}>Hey, Rahul</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
              <Image
                source={require('../assets/icons/Cart_Icon.png')}
                style={{
                  width: rs(25),
                  height: rs(25),
                  marginTop: rs(35),
                  marginRight: rs(20),
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',

              width: rs(330),
              height: rs(45),
              backgroundColor: theme.colors.darkBlue,
              // fontSize: rs(12),
              paddingLeft: rs(10),
              borderRadius: rs(20),
              marginLeft: rs(10),
              marginRight: rs(5),
              marginTop: rs(30),
            }}>
            <Image
              source={require('../assets/icons/Search_Icon.png')}
              style={{
                width: rs(15),
                height: rs(15),
                marginTop: rs(15),
                marginRight: rs(5),
              }}
            />
            <TextInput
              returnKeyType="done"
              allowFontScaling={true}
              placeholder="Search Products or store"
              placeholderTextColor="#b0b0b0"
              // onChangeText={setUserId}
              // value={userId}
              // style={{
              //   width: rs(330),
              //   height: rs(45),
              //   backgroundColor: theme.colors.darkBlue,
              //   fontSize: rs(12),
              //   paddingLeft: rs(10),
              //   borderRadius: rs(20),
              //   marginLeft: rs(10),
              //   marginRight: rs(5),
              //   marginTop: rs(20),
              // }}
            />
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.deliveryContainer}>
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
            </View>
            <View style={styles.deliveryContainer}>
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
            </View>
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
              marginLeft: rs(5),
              fontWeight: '400',
            }}>
            Recommended
          </Text>
        </View>
        <View>
          <FlatList
            horizontal={false}
            data={listData}
            renderItem={({item}) => <ProductCard product={item} />}
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

export default Home;

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
  },
  deliveryContainer: {
    marginTop: rs(20),
    marginLeft: rs(5),
    paddingBottom: rs(10),
  },
  deliveryContainerText: {
    fontSize: rs(11),
  },
  card: {
    backgroundColor: theme.colors.lightGrey,
    borderRadius: rs(8),
    padding: rs(10),
    margin: rs(5),
    width: '47%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: rs(100),
    height: rs(80),
    resizeMode: 'contain',
  },
  title: {
    marginTop: rs(5),
    color: theme.colors.blackGrey,
  },
  price: {
    color: theme.colors.lightBlack,
    marginTop: rs(10),
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
});
