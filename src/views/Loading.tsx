/**
 * Description : 在进入 APP 主界面之前，初始化 APP 数据
 * Created on : 2022/3/26
 * Author : Victor Huang
 */

import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { StackActions, useNavigation } from '@react-navigation/native';

import log from '../utils/Logger';
import initI18next from '../languages/I18next';
import { getLanguageLS, logAllStorage } from '../utils/Storage';
import { setLanguage } from '../store/actions/base/baseAction';

export type Props = {};

const Loading: React.FC<Props> = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    init();
  }, []);

  /**
   * 初始化 APP
   */
  async function init() {
    try {
      // TODO: 非调试环境记得注释掉以下代码
      logAllStorage();

      // 初始化语言环境，从本地存储读取上次用户选择的语言
      const language = await getLanguageLS();
      const initLang = initI18next(language);
      // 将所选语言放入 redux
      dispatch(setLanguage(initLang));

      // 所有初始化工作完成后，跳转到主界面
      // 使用 replace 函数，用 Home 替代 Loading，使首页成为导航堆栈的第 0 项
      navigation.dispatch(
        StackActions.replace('Home')
      );
    } catch(e) {
      log.error('Loading.init() > catch error:', e);
    }
  }

  return (
    <View style={styles.root}>
      <ActivityIndicator size='small' />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
