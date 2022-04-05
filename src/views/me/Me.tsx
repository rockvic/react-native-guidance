/**
 * Description :
 * Created on : 2022/1/1
 * Author : Victor Huang
 */

import React, { FC, useEffect, useState, useRef, useCallback } from 'react';
import {
  Platform,
  View,
  Text,
  StyleSheet,
  Animated,
  useWindowDimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RectButton } from 'react-native-gesture-handler';

import type { HomeTabScreenProps } from '../../navigator/types';
import type { StateType } from '../../store/reducers';

import Global from '../../Global';
import log from '../../utils/Logger';
import Icon from '../../components/EasyIcon';
import bgs from '../../assets/images/bg';
import { FocusAwareStatusBar } from '../../navigator/HomeTabNavigator';
import px from '../../utils/px';

const avatarSize = px(160);
const avatarOffset = avatarSize * 0.618; // 50;

function Me({ navigation }: HomeTabScreenProps<'MeTab'>) {
  const { bgType, bgIdx, bgPhoto } = useSelector((state: StateType) => state.base.config);
  const insets = useSafeAreaInsets();
  const bottomTabBarHeight = useBottomTabBarHeight();
  const bgWidth = useWindowDimensions().width;
  const bgHeight = bgWidth * 10 / 16;
  const [scrollY] = useState(new Animated.Value(0));

  /**
   * 变更背景图
   */
  function changeBg() {
    requestAnimationFrame(() => {
      // 本例子中使用 props 中传递的 navigation 做导航跳转
      navigation.navigate('ChangeBg');
    });
  }

  /**
   * 渲染背景图片，在 iOS 下，背景图片随着下拉到负值时，等比例放大
   * @returns 
   */
  function renderBg() {
    return <Animated.Image
      style={[styles.bg, {
        width: bgWidth,
        height: bgHeight,
        transform: [
          {
            translateY: scrollY.interpolate({
              inputRange: [-bgHeight, 0, bgHeight],
              outputRange: [bgHeight / 2, 0, -bgHeight]
            })
          },
          {
            scale: scrollY.interpolate({
              inputRange: [-bgHeight, 0, bgHeight],
              outputRange: [2, 1, 1]
            })
          }
        ]
      }]}
      source={bgType === 1 ? bgs[bgIdx] : { uri: bgPhoto }}
    />;
  }

  /**
   * 渲染最顶端的半透明渐变遮罩
   * @returns 
   */
  function renderTopMask() {
    const maskHeight = Platform.OS === 'ios' ? insets.top + 30 : 50;
    // const locations = Platform.OS === 'ios' ? [0, 1] : [0, 1];
    const colors = Platform.OS === 'ios' ?
      [Global.colors.DARK, 'transparent'] :
      [Global.colors.DARK, `${Global.colors.DARK}00`];
    return <LinearGradient
      colors={colors}
      // locations={locations}
      style={[styles.topMask, { width: bgWidth, height: maskHeight }]}
    />
  }

  /**
   * 渲染头像
   */
  function renderAvatar() {
    // TODO: 如果用户上传了头像，则使用用户自定义头像
    return <View style={[styles.avatarFrame, { top: -avatarOffset }]}>
      <RectButton style={styles.avatarMask} onPress={() => navigation.navigate('SignIn')}>
        <View style={styles.avatarContainer}>
          <Icon iconLib='fa5' name='robot' width={avatarSize} height={avatarSize} size={avatarSize / 2.5}
            color={Global.colors.SECONDARY_TEXT}
            style={{ paddingBottom: 8 }} solid
          />
        </View>
      </RectButton>
    </View>;
  }
  
  return (
    <View style={[styles.root, { /* marginBottom: bottomTabBarHeight */ }]}>
      <FocusAwareStatusBar barStyle='light-content' backgroundColor={Global.colors.DARK} />
      {renderBg()}
      {renderTopMask()}
      <Animated.ScrollView style={[styles.rootSv]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <TouchableOpacity style={[styles.bgPressMask, { height: bgHeight - 10 }]} onPress={changeBg} />
        <View style={[styles.container, { paddingTop: avatarSize - avatarOffset }]}>
          {renderAvatar()}
          {/* TODO: 如果用户设置了用户名并登录后，显示用户名 */}
          <View style={styles.userNameContainer}>
            <Text style={styles.userName} numberOfLines={1}>Must Not Be Named</Text>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    // backgroundColor: 'black',
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover',
    backgroundColor: Global.colors.BORDER_LIGHT,
  },
  topMask: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bgPressMask: {
    backgroundColor: `${Global.colors.DARK}22`,
  },
  rootSv: {
    // backgroundColor: 'green',
  },
  container: {
    flex: 1,
    backgroundColor: Global.colors.BACKGROUND,
    borderTopLeftRadius: px(20),
    borderTopRightRadius: px(20),
  },
  // 头像
  avatarFrame: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarMask: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    backgroundColor: Global.colors.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    width: avatarSize - 10,
    height: avatarSize - 10,
    borderRadius: (avatarSize - 10) / 2,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // 用户名
  userNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    maxWidth: '60%', // 最大宽度 60%，超过宽度自动显示省略号，结合 numberOfLines={1}
    textAlign: 'center',
    fontSize: px(32),
    fontWeight: '800',
    lineHeight: px(40),
  },
});

export default Me;
