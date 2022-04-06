/**
 * Description : 在进入 APP 主界面之前，初始化 APP 数据
 * Created on : 2022/3/26
 * Author : Victor Huang
 */

import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';

import log from '../utils/Logger';
import initI18next from '../languages/I18next';
import { getAuthLS, getConfigLS, getUsersLS, logAllStorage } from '../utils/Storage';
import { setConfig } from '../store/actions/base/baseAction';
import { initialState as baseInitialState } from '../store/reducers/base/baseReducer';
import { setUsers, signIn } from '../store/actions/base/authAction';

type Props = {
  onLoaded: () => void;
};

const Loading: React.FC<Props> = ({ onLoaded }) => {
  const dispatch = useDispatch();
  const statusBarHeight = StatusBar.currentHeight;

  useEffect(() => {
    console.log('statusBarHeight in loading:', statusBarHeight);
    init();
  }, []);

  /**
   * 初始化 APP
   */
  async function init() {
    try {
      // TODO: 非调试环境记得注释掉以下代码
      await logAllStorage();
      
      const configLs = await getConfigLS();
      let config = configLs ? configLs : baseInitialState.config;
      // 初始化语言环境，从本地存储读取上次用户选择的语言
      const initLang = initI18next(config.language);
      config.language = initLang;
      // 将配置文件放入 redux
      dispatch(setConfig(config));

      // 从本地存储恢复注册用户列表到 redux 中
      const users = await getUsersLS();
      dispatch(setUsers(users || []));

      // 从本地存储恢复当前登录用户到 redux 中（保持登录）
      const auth = await getAuthLS();
      if (auth)
        dispatch(signIn(auth.token, auth.currUser));

      // 回调父界面初始化完成
      onLoaded();
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
