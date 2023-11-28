import {View, Text, Image} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Loader = (props: any) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      {props.image ? (
        <View>
          <Image source={{uri: props.uri}} style={{width: 100, height: 100}} />
        </View>
      ) : null}
      {props.lottie ? (
        <View>
          <LottieView
            style={{width: 200, height: 200}}
            source={props.lottieuri}
            autoPlay
            loop
          />
        </View>
      ) : null}
    </View>
  );
};

export default Loader;
