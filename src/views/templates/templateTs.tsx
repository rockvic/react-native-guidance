/**
 * Description :
 * Created on : 2022/1/1
 * Author : Victor Huang
 */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export type Props = {};

const Comp: React.FC<Props> = () => {
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
