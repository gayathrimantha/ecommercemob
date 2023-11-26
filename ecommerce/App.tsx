import {View, Text} from 'react-native';
import React from 'react';
import Home from './app/screens/Home';
import HomeStack from './app/screens/HomeStack';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};

export default App;
