/**
 * Description :
 * Created on : 2022/1/1
 * Author : Victor Huang
 */

import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import log from '../../utils/Logger';

export type Props = {};

const Tutorial: FC<Props> = () => {
  const appState = useSelector(state => state);

  log.debug('11111');
  log.debug('Tutorial() > appState:', appState);
  return <View style={styles.root} />;
};

const styles = StyleSheet.create({
  root: {
    borderColor: '#0000ff',
  },
});

export default Tutorial;
