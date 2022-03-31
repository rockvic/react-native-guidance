/**
 * Description :
 * Created on : 2022/1/1
 * Author : Victor Huang
 */

import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import Global from '../Global';
import { StateType } from '../store/reducers';

// 按钮对象类型
export type btn = {
  // 按钮文字
  title: string;
  // 按钮点击回调方法
  onPress?: () => void;
  // 按钮样式
  btnStyle?: ViewStyle | ViewStyle[];
  // 按钮文字样式
  btnTextStyle?: TextStyle | TextStyle[];
};

export type Props = {
  // 按钮数组
  btns: btn[];
  // 底端按钮容器样式
  style?: ViewStyle | ViewStyle[];
  // 子元素
  children?: React.ReactNode | undefined;
  // 是否使用绝对位置，如果为 true，则使用绝对定位固定在底部
  absolutely?: boolean | undefined;
};

const BottomButtonBar: React.FC<Props> = ({btns, style, children, absolutely}) => {
  const insets = useSafeAreaInsets();
  const { tabBarHeight } = useSelector((state: StateType) => state.base.barHeights);

  return <View
    style={[
      styles.bottomBtnsContainer,
      { height: tabBarHeight },
      absolutely ? styles.absolutely : null,
      style && style,
    ] as ViewStyle}
  >
    {btns.map(({title, onPress, btnStyle, btnTextStyle}, idx) => {
      // 按钮样式
      let btnStyles = [styles.bottomBtn, btnStyle && btnStyle] as ViewStyle;

      // 按钮文字样式
      let btnTextStyles = [
        styles.bottomBtnText, 
        { color: Global.colors.PRIMARY },
        { marginBottom: insets.bottom },
        btnTextStyle && btnTextStyle,
      ] as TextStyle;
      
      return <BorderlessButton key={`b_btn_${idx}`} style={btnStyles} onPress={onPress}>
        <Text style={btnTextStyles}>
          {title}
        </Text>
      </BorderlessButton>
    })}
    {children}
  </View>;
};

const styles = StyleSheet.create({
  bottomBtnsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, .5)',
  },
  absolutely: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  bottomBtn: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'brown',
  },
  bottomBtnText: {
    fontSize: 16,
    fontWeight: '600',
  },
 });
 
 export default BottomButtonBar;
 