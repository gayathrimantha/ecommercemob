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
import FavItem from './FavItem';
import {connect} from 'react-redux';

type FavRouteProp = {
  route: RouteProp<HomeStackParamList, 'Fav'>;
  favItems: any[];
};

type Props = {
  route: FavRouteProp;
};

const Fav = ({favItems}: FavRouteProp) => {
  console.log(favItems, 'Cart Items');
  type HomeNavigationProp = NavigationProp<HomeStackParamList, 'Fav'>;
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
        <Text style={styles.shoppingCartText}>Favourites</Text>
      </View>
      {favItems.length > 0 ? (
        <View style={{marginTop: rs(20)}}>
          <FlatList
            horizontal={false}
            data={favItems}
            renderItem={({item}) => (
              <FavItem
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
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Favourites is empty</Text>
        </View>
      )}
    </ScrollView>
  );
};

const mapStateToProps = (state: any) => ({
  favItems: state.fav,
});

export default connect(mapStateToProps)(Fav);

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
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: rs(20),
  },
  emptyCartText: {
    fontSize: rs(15),
    color: theme.colors.black45,
  },
});
