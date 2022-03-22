import React, { FC } from 'react';
import { View, StatusBar } from 'react-native';

import RootNavigator from '../navigator/RootNavigator';

export type Props = {};

const MainView: FC<Props> = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" /*  hidden */ />
      <RootNavigator />
    </View>
  );
};

export default MainView;
