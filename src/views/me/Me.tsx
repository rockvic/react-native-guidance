/**
 * Description :
 * Created on : 2022/1/1
 * Author : Victor Huang
 */

import React, { FC } from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { StateType } from '../../store/reducers';
import { setLocale } from '../../store/actions/base/baseAction';

import log from '../../utils/Logger';

export type Props = {};

const Tutorial: FC<Props> = () => {
  const { locale } = useSelector((state: StateType) => state.base);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  log.info(locale);

  function switchLanguage() {
    const tmpLocal = locale === 'cn' ? 'en' : 'cn';
    dispatch(setLocale(tmpLocal));
    i18n.changeLanguage(tmpLocal);
  }

  return (
    <View style={styles.root}>
      <Text>locale is : {locale}</Text>
      <Text>{t('home.exit')}</Text>
      <Text>{t('home.currDate', {date: new Date()})}</Text>
      <TouchableOpacity
        onPress={switchLanguage}
        style={{
          borderWidth: 1,
          paddingHorizontal: 20,
          paddingVertical: 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
          borderRadius: 6,
        }}>
        <Text>Switch language to {locale === 'cn' ? 'EN' : 'CN'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    borderColor: '#0000ff',
    padding: 20,
  },
});

export default Tutorial;
