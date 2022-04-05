/**
 * Description :
 * Created on : 2022/1/1
 * Author : Victor Huang
 */

import React from 'react';
import { StyleSheet, View, Text, StatusBar, Platform } from 'react-native';

import type { RootStackScreenProps } from '../../navigator/types';

function ChangePassword({ navigation, route }: RootStackScreenProps<'ChangePassword'>) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'} />
      <Text>这是一个ts组件</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#ffffff',
  },
});

export default ChangePassword;
