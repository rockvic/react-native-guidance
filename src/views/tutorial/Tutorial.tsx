/**
 * Description :
 * Created on : 2022/1/1
 * Author : Victor Huang
 */
import React, { FC, useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';

import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import type { HomeTabParamList } from '../../navigator/HomeTabParamList';
import type { RootStackParamList } from '../../navigator/RootStackParamList';

import { setBarHeights } from '../../store/actions/base/baseAction';

import log from '../../utils/Logger';

type TutorialNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Home'>,
  BottomTabNavigationProp<HomeTabParamList, 'MeTab'>
>;

type Props = {
  navigation: TutorialNavigationProp;
};

const Tutorial: FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const statusBarHeight = StatusBar.currentHeight;
  const headerBarHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    dispatch(setBarHeights({ statusBarHeight, headerBarHeight, tabBarHeight }));
  }, []);

  return <View style={styles.root} />;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Tutorial;
