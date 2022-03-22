/**
 * Description : 首页Tab导航
 * Created on : 2022/1/13
 * Author : Victor Huang
 */

import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';
import { useTranslation } from 'react-i18next';

import Icon from '../components/EasyIcon';

import Tutorial from '../views/tutorial/Tutorial';
import Me from '../views/me/Me';

const Tab = createBottomTabNavigator();

function HomeTabNavigator() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { position: 'absolute' },
        tabBarBackground: () => (
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={20}
            blurRadius={25}
            overlayColor="transparent"
          />
        ),
      }}
    // tabBar={props => <TabBar {...props} />}
    >
      <Tab.Screen
        name="HomeTab"
        options={{
          title: t('home.tab_home'),
          tabBarLabel: t('home.tab_home'),
          tabBarIcon: ({ color }) => <Icon name="book" color={color} size={22} />,
        }}
        component={Tutorial}
      />
      <Tab.Screen
        name="MeTab"
        options={{
          title: '我',
          tabBarLabel: '我',
          tabBarIcon: ({ color }) => (
            <Icon name="person" color={color} size={22} />
          ),
        }}
        component={Me}
      />
    </Tab.Navigator>
  );
}

export default HomeTabNavigator;
