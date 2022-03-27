/**
 * Description :
 * Created on : 2022/1/1
 * Author : Victor Huang
 */

import React, { FC, useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import MarkDown from 'react-native-markdown-display';
import loadLocalResource from 'react-native-local-resource';
import moment from 'moment';

import Global from '../../Global';
import log from '../../utils/Logger';
import Icon from '../../components/EasyIcon';
import { StateType } from '../../store/reducers';
import { setLanguage } from '../../store/actions/base/baseAction';

export type Props = {};

const avatarSize = 90;
const avatarOffset = avatarSize * 0.618; // 50;

const Tutorial: FC<Props> = () => {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const bgWidth = useWindowDimensions().width;
  const bgHeight = bgWidth * 10 / 16;
  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  /**
   * 渲染背景图片，在 iOS 下，背景图片随着下拉到负值时，等比例放大
   * @returns 
   */
  function renderBg() {
    return <Animated.Image
      style={[styles.bg, {
        width: bgWidth,
        height: bgHeight,
        transform: [{
          translateY: scrollY.interpolate({
            inputRange: [-bgHeight, 0, bgHeight],
            outputRange: [bgHeight / 2, 0, -bgHeight]
          })
        }, {
          scale: scrollY.interpolate({
            inputRange: [-bgHeight, 0, bgHeight],
            outputRange: [2, 1, 1]
          })
        }]
      }]}
      source={require('../../assets/images/bg/001.png')}
    />;
  }

  /**
   * 渲染头像
   */
  function renderAvatar() {
    // TODO: 如果用户上传了头像，则使用用户自定义头像
    return <View style={[styles.avatarFrame, { top: -avatarOffset }]}>
      <View style={styles.avatarMask}>
        <View style={styles.avatarContainer}>
          <Icon iconLib='fa5' name='robot' size={avatarSize / 2.5} color={Global.colors.FONT_LIGHT_GRAY} style={{ paddingBottom: 8 }} solid />
        </View>
      </View>
    </View>;
  }

  return (
    <View style={[styles.root, { /* marginBottom: bottomTabBarHeight */ }]}>
      {renderBg()}
      <Animated.ScrollView style={[styles.rootSv, { paddingTop: bgHeight - 10 }]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
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
  },
  bg: {
    position: 'absolute',
    resizeMode: 'cover',
  },
  rootSv: {
  },
  container: {
    flex: 1,
    backgroundColor: Global.colors.BG,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
    backgroundColor: Global.colors.BG,
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
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 40,
  },
});

export default Tutorial;
