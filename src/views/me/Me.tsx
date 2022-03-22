/**
 * Description :
 * Created on : 2022/1/1
 * Author : Victor Huang
 */

import React, { FC, useEffect, useState, useRef } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import MarkDown from 'react-native-markdown-display';
// @ts-ignore
import loadLocalResource from 'react-native-local-resource';
import moment from 'moment';

// import Global from '../../Global';
import log from '../../utils/Logger';
import { StateType } from '../../store/reducers';
import { setLocale } from '../../store/actions/base/baseAction';

export type Props = {};

const Tutorial: FC<Props> = () => {
  const preV = useRef(0);
  const { locale } = useSelector((state: StateType) => state.base);
  const [md, setMd] = useState<string>('');
  const [v, setV] = useState<number>(0);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const bottomTabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    preV.current = v;
  });

  useEffect(() => {
    loadMd();
  }, []);

  function loadMd() {
    const RNGitignore = require('../../tutorialMd/RNGitignore.md');
    loadLocalResource(RNGitignore).then((content: any) => {
      // log.debug('content', content);
      log.debug('...before setMd().');
      setMd(content);
    });
  }

  function switchLanguage() {
    const tmpLocal = locale === 'cn' ? 'en' : 'cn';
    dispatch(setLocale(tmpLocal));
    i18n.changeLanguage(tmpLocal);
  }

  return (
    <ScrollView style={styles.rootSv}>
      <View style={[styles.root, { marginBottom: bottomTabBarHeight }]}>
        <Text>locale is : {locale}</Text>
        <Text>{t('home.exit')}</Text>
        <Text>{t('home.currDate', { date: moment().format('YYYY/MM/DD HH:mm:ss') })}</Text>
        <TouchableOpacity
          onPress={switchLanguage}
          style={{
            borderWidth: 1,
            paddingHorizontal: 20,
            paddingVertical: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 20,
            borderRadius: 6,
          }}>
          <Text>Switch language to {locale === 'cn' ? 'EN' : 'CN'}</Text>
        </TouchableOpacity>
        <Text>preV : {preV.current} | v : {v}</Text>
        <TouchableOpacity
          onPress={() => setV(v + 1)}
          style={{
            borderWidth: 1,
            paddingHorizontal: 20,
            paddingVertical: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            borderRadius: 6,
          }}>
          <Text>变更 V</Text>
        </TouchableOpacity>
        <MarkDown>
          {md}
        </MarkDown>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootSv: {
  },
  root: {
    padding: 20,
  },
});

export default Tutorial;
