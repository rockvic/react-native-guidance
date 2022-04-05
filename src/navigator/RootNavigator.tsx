import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import Global from '../Global';
import px from '../utils/px';

// screens
import HomeTabNavigator from './HomeTabNavigator';
import { RootStackParamList } from './types';
import ChangeBg from '../views/me/ChangeBg';
import SignUp from '../views/me/SignUp';
import ChangePassword from '../views/me/ChangePassword';
import ResetPassword from '../views/me/ResetPassword';

// modals
import CameraRoll from '../views/base/CameraRoll';
import ChooseAlbum from '../views/base/ChooseAlbum';
import SignIn from '../views/me/SignIn';

import Test from '../views/examples/Test';
import Test1 from '../views/examples/Test1';

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { t } = useTranslation();
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Home'
        screenOptions={{
          headerBackTitle: t('navigation.backText'),
          headerBackTitleStyle: { fontSize: px(28), fontWeight: '700' },
          headerTintColor: Global.colors.PRIMARY_TEXT,
          headerTitleStyle: { fontSize: px(32), fontWeight: '700' },
        }}
      >
        <Stack.Screen name='Home' component={HomeTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name='ChangeBg' component={ChangeBg} options={{ title: t('changeBg.title') }} />

        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name='CameraRoll' component={CameraRoll} options={{ title: t('cameraRoll.title') }} />
          <Stack.Screen name='ChooseAlbum' component={ChooseAlbum} options={{ title: t('chooseAlbum.title') }} />
          <Stack.Screen name='SignIn' component={SignIn} options={{ headerShown: false }} />
          <Stack.Screen name='SignUp' component={SignUp} options={{ title: t('signUp.title') }} />
          <Stack.Screen name='ChangePassword' component={ChangePassword} options={{ title: t('changePassword.title') }} />
          <Stack.Screen name='ResetPassword' component={ResetPassword} options={{ title: t('resetPassword.title') }} />
        </Stack.Group>

        <Stack.Screen name='Test' component={Test} options={{ title: '测试' }} />
        <Stack.Screen name='Test1' component={Test1} options={{ title: '测试1' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
