import React, { FC } from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { RootSiblingParent } from 'react-native-root-siblings';

import MainView from './views/Main';
import store from './store';
import './utils/Logger';
import './languages/I18next';

// 禁用部分黄框警告
LogBox.ignoreLogs([
  'componentWillReceiveProps has been renamed',
  'componentWillMount has been renamed, and is not recommended for use.',
  'Remote debugger is in a background tab which may cause apps to perform slowly',
  'Require cycle: node_modules/rn-fetch-blob/index.js',
  'ListView is deprecated and will be removed in a future release',
  'WebView has been extracted from react-native core and will be removed in a future release',
  '`-[RCTRootView cancelTouches]` is deprecated and will be deleted soon',
  'Battery state `unknown` and monitoring disabled, this is normal for simulators and tvOS',
  'Animated: `useNativeDriver` was not specified',
  'ViewPager: Calling `getNode()` on the ref of an Animated component is no longer necessary.',
  'startLoadWithResult invoked with invalid lockIdentifier',
  'Did not receive response to shouldStartLoad in time',
  'i18next: init: i18next is already initialized',
  'Non-serializable values were found in the navigation state',
  'Task orphaned for request',
]);

type Props = {};

const App: FC<Props> = () => {
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <MainView />
      </RootSiblingParent>
    </Provider>
  );
};

/**
 * 崩溃处理
 * @param {*} e
 * @param {*} isFatal
 */
/* function errorHandler(e, isFatal) {
  log.error('App > errorHandler() 程序面临崩溃, error : ', e);
  if (isFatal) {
    Alert.alert(
      '发生不可预知错误',
      `
        错误: ${isFatal ? 'Fatal Error - ' : ''} ${e.name} ${e.message}
        需要重启应用！
      `,
      [
        {
          text: '重启',
          onPress: () => {
            RNRestart.Restart();
          },
        },
      ],
    );
  }
} */
// 设置 js exception 处理
// setJSExceptionHandler(errorHandler);
// 设置原生 exception 处理
// 第二个参数必须为false，原生程序处理未拦截错误时会自动退出（闪退）
// 传入 false 保证将处理权交给自定义的 errorHandler
// setNativeExceptionHandler(errorHandler, false);

export default App;
