/**
 * Description :
 * Created on : 2022/1/1
 * Author : Victor Huang
 */

import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import log from '../../utils/Logger';

type Props = {};

const Search: FC<Props> = () => {
  const appState = useSelector(state => state);

  log.debug('11111');
  log.debug('Search() > appState:', appState);
  return <View style={styles.root} />;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Search;
