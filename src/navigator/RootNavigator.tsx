import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import Global from '../Global';

// screens
import HomeTabNavigator from './HomeTabNavigator';
import { RootStackParamList } from './RootStackParamList';
import ChangeBg from '../views/me/ChangeBg';
import Test from '../views/examples/Test';
import Test1 from '../views/examples/Test1';

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { t } = useTranslation();
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerBackTitle: t('navigation.backText'),
          headerTintColor: Global.colors.PRIMARY_FONT,
        }}
      >
        <Stack.Screen name="Home" component={HomeTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="ChangeBg" component={ChangeBg} options={{ title: t('changeBg.title') }} />
        <Stack.Screen name="Test" component={Test} options={{ title: '测试' }} />
        <Stack.Screen name="Test1" component={Test1} options={{ title: '测试1' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
