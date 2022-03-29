import React, { FC, useEffect, useState } from 'react';
import { View, StatusBar, Platform } from 'react-native';

import RootNavigator from '../navigator/RootNavigator';
import Loading from './Loading';

type Props = {};

const MainView: FC<Props> = () => {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#ffffff');
    }
  }, []);

  /**
   * 初始化完成后回调
   */
  function onLoaded() {
    setLoaded(true);
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle='dark-content' />
      {/* 如果还未初始化，显示 Loading，初始化完成后显示 RootNavigator */}
      {loaded ? <RootNavigator /> : <Loading onLoaded={onLoaded} />}
    </View>
  );
};

export default MainView;
