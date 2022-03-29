/**
 * Description :
 * Created on : 2022/1/1
 * Author : Victor Huang
 */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigator/RootStackParamList';

// 堆栈导航 Prop 类型
// 建议：CompNavigationProp 中的 'Comp' 改为本组件对应名称
// <RootStackParamList, 'Test'> 中的 'Test' 给为本组件在 RootNavigator 中注册的路由名称
type CompNavigationProp = StackNavigationProp<RootStackParamList, 'Test'>;
type Props = {
  navigation: CompNavigationProp,
};

const Comp: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.root}>
      <Text>这是一个ts组件</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#ffffff',
  },
});

export default Comp;
