/**
 * Description :
 * Created on : 2022/1/1
 * Author : Victor Huang
 */

import React, {PureComponent} from 'react';
import {View, StyleSheet, Text} from 'react-native';

class Comp extends PureComponent {
  render() {
    return (
      <View style={styles.root}>
        <Text>这是一个组件</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#ffffff',
  },
});

export default Comp;
