import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeTabNavigator from './HomeTabNavigator';
import Loading from '../views/Loading';
import Test from '../views/examples/Test';
import Test1 from '../views/examples/Test1';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Test" component={Test} options={{ title: '测试' }} />
        <Stack.Screen name="Test1" component={Test1} options={{ title: '测试1' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
