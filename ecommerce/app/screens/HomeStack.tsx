import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home'; // Assuming Home is a .tsx file
import Product from './Product';
import Cart from './Cart';

export type HomeStackParamList = {
  Home: any;
  Product: any;
  Cart: any;
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
};

export default HomeStack;
