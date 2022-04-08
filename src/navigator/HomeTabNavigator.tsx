/**
 * Description : 首页Tab导航
 * Created on : 2022/1/13
 * Author : Victor Huang
 */

import React, { useCallback, useEffect } from 'react';
import { StyleSheet, Image, StatusBar, Platform, BackHandler } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';
import { useTranslation } from 'react-i18next';
import { useIsFocused, useNavigationState } from '@react-navigation/native';

import type { HomeTabParamList, RootStackScreenProps } from './types';

import Global from '../Global';
import Icon from '../components/EasyIcon';
import Images from '../assets/Images';
import log from '../utils/Logger';

import Tutorial from '../views/tutorial/Tutorial';
import Search from '../views/tutorial/Search';
import Me from '../views/me/Me';
import Toast from 'react-native-root-toast';

// status bar component aware of screen focus
export function FocusAwareStatusBar(props: any) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const Tab = createBottomTabNavigator<HomeTabParamList>();

function HomeTabNavigator({ navigation }: RootStackScreenProps<'Home'>) {
  const { t } = useTranslation();
  const state = useNavigationState(state => state);
  let lastBackPressed: number = Date.now();

  useEffect(
    useCallback(() => {
      const onAndroidBackPress = () => {
        // log.debug('HomeTabNavigator > onAndroidBackPress() > navigation state : ', state);
        const tabIndex = state.routes[0].state ? state.routes[0].state.index : 0;
        // log.debug('HomeTabNavigator > onAndroidBackPress() > tabIndex : ', tabIndex);
        if (state.index < 1 && tabIndex! < 1) {
          if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
            // 最近2秒内按过back键，可以退出应用。
            return false;
          }
          lastBackPressed = Date.now();
          Toast.show("再按一次后退将退出应用");
          return true;
        }
        if (state.index >= 1 || tabIndex! >= 1) {
          navigation.goBack();
        }
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
    }, [state])
  );
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { position: 'absolute' },
        tabBarActiveTintColor: Global.colors.PRIMARY_TEXT,
        tabBarInactiveTintColor: Global.colors.SECONDARY_TEXT,
        tabBarBackground: () => {
          if (Platform.OS === 'ios') return <BlurView
              style={StyleSheet.absoluteFill}
              blurType='light'
              blurAmount={20}
              blurRadius={25}
              overlayColor='transparent'
            />
          else
            return null;
        },
      }}
    >
      <Tab.Screen
        name='TurorialTab'
        options={{
          title: t('turorial.title'),
          tabBarLabel: t('home.tabName.tutorial'),
          tabBarIcon: ({ color }) => (
            <Image
              source={Images.reactLogo}
              resizeMode='contain'
              style={[styles.icon, {tintColor: color}]}
            />
          ),
        }}
        component={Tutorial}
      />
      <Tab.Screen
        name='SearchTab'
        options={{
          title: t('search.title'),
          tabBarLabel: t('home.tabName.search'),
          tabBarIcon: ({ color }) => (
            <Icon iconLib='fa5' name='search' color={color} size={20} />
          ),
        }}
        component={Search}
      />
      <Tab.Screen
        name='MeTab'
        options={{
          title: t('me.title'),
          tabBarLabel: t('home.tabName.me'),
          tabBarIcon: ({ focused, color }) => (
            focused ?
              <Icon iconLib='fa5' name='grin-alt' color={color} size={22} solid /> :
              <Icon iconLib='fa5' name='grin' color={color} size={22} />
          ),
          headerShown: false,
        }}
        component={Me}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
  },
});

export default HomeTabNavigator;
