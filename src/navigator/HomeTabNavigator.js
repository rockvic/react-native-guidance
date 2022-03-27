/**
 * Description : 首页Tab导航
 * Created on : 2022/1/13
 * Author : Victor Huang
 */

import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';
import { useTranslation } from 'react-i18next';

import Icon from '../components/EasyIcon';

import Tutorial from '../views/tutorial/Tutorial';
import Search from '../views/tutorial/Search';
import Me from '../views/me/Me';

const Tab = createBottomTabNavigator();

function HomeTabNavigator() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { position: 'absolute' },
        tabBarActiveTintColor: 'rgb(28, 30, 33)',
        tabBarBackground: () => (
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType='light'
            blurAmount={20}
            blurRadius={25}
            overlayColor='transparent'
          />
        ),
      }}
    >
      <Tab.Screen
        name='HomeTab'
        options={{
          title: t('turorial.title'),
          tabBarLabel: t('home.tabName.tutorial'),
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/images/react.png')}
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
