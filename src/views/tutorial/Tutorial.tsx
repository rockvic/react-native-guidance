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

import type { HomeTabScreenProps } from '../../navigator/types';

import log from '../../utils/Logger';
import { setBarHeights } from '../../store/actions/base/baseAction';

function Tutorial({ navigation }: HomeTabScreenProps<'TurorialTab'>) {
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
