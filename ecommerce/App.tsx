import {View, Text} from 'react-native';
import React from 'react';
import Home from './app/screens/Home';
import HomeStack from './app/screens/HomeStack';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './app/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
