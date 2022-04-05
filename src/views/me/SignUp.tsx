/**
 * Description :
 * Created on : 2022/1/1
 * Author : Victor Huang
 */

import React from 'react';
import { StyleSheet, View, Text, StatusBar, Platform } from 'react-native';
import Card from '../../components/Card';

import type { RootStackScreenProps } from '../../navigator/types';
import px from '../../utils/px';

function SignUp({ navigation, route }: RootStackScreenProps<'SignUp'>) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'} />
      <Card style={styles.card}>
        <Text>card</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '90%',
    padding: px(20),
  },
});

export default SignUp;
