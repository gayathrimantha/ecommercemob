import {View, Text, StyleSheet, TextInput, Image} from 'react-native';
import React from 'react';
import {theme} from '../themes/light/properties/colors';
import {rs, wp} from '../themes/ResponsiveScreen';

const Home = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.containerOne}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.nameText}>Hey, Rahul</Text>
          <Image
            source={require('../assets/icons/Cart_Icon.png')}
            style={{
              width: rs(25),
              height: rs(25),
              marginTop: rs(35),
              marginRight: rs(20),
            }}
          />
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
            marginTop: rs(20),
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
            allowFontScaling={false}
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
          <View>
            <Text>DELIVERY TO</Text>
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
          <View>
            <Text>Within</Text>
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
    </View>
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
});
