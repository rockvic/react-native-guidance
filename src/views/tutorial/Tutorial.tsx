/**
 * Description :
 * Created on : 2022/1/1
 * Author : Victor Huang
 */
import React, { FC, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { HomeTabScreenProps } from '../../navigator/types';

import log from '../../utils/Logger';
import { setBarHeights } from '../../store/actions/base/baseAction';
import { FocusAwareStatusBar } from '../../navigator/HomeTabNavigator';

function Tutorial({ navigation }: HomeTabScreenProps<'TurorialTab'>) {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  const headerBarHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    dispatch(setBarHeights({ statusBarHeight, headerBarHeight, tabBarHeight }));
  }, []);

  return <View style={styles.root}>
    <FocusAwareStatusBar barStyle='dark-content' />
  </View>;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default Tutorial;
