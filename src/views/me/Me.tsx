/**
 * Description : 我的
 * Created on : 2022/3/22
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
  Image,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RectButton } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';

import type { HomeTabScreenProps } from '../../navigator/types';
import type { StateType } from '../../store/reducers';
import type { UserType } from '../../store/reducers/base/authReducer';

import Global from '../../Global';
import log from '../../utils/Logger';
import Icon from '../../components/EasyIcon';
import bgs from '../../assets/images/bg';
import { FocusAwareStatusBar } from '../../navigator/HomeTabNavigator';
import px from '../../utils/px';

const avatarSize = px(160);
const avatarOffset = avatarSize * (1 - 0.618);

function Me({ navigation }: HomeTabScreenProps<'MeTab'>) {
  const { bgType, bgIdx, bgPhoto } = useSelector((state: StateType) => state.base.config);
  const { isSignedIn, currUser } = useSelector((state: StateType) => state.auth);

  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const bottomTabBarHeight = useBottomTabBarHeight();

  const [scrollY] = useState(new Animated.Value(0));

  const bgWidth = useWindowDimensions().width;
  const bgHeight = bgWidth * 10 / 16;

  const animatedEvent = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  const transform = [
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
  ];

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
      style={[styles.bgPos, styles.bgImg, { width: bgWidth, height: bgHeight, transform}]}
      source={bgType === 1 ? bgs[bgIdx] : { uri: bgPhoto }}
    />;
  }

  /**
   * 渲染最顶端的半透明渐变遮罩
   * @returns 
   */
  function renderTopMask() {
    const locations = Platform.OS === 'ios' ? [0, .2, 1] : [0, .4, 1];
    const colors = [Global.colors.DARK, `${Global.colors.DARK}77`, `${Global.colors.DARK}00`];
    return <Animated.View style={[styles.bgPos, { width: bgWidth, height: bgHeight, transform }]}>
      <LinearGradient
        colors={colors}
        locations={locations}
        style={[{ width: '100%', height: '100%' }]}
      />
    </Animated.View>;
  }

  /**
   * 渲染头像
   */
  function renderAvatar() {
    // TODO: 如果用户上传了头像，则使用用户自定义头像
    return <View style={[styles.avatarFrame, { top: -avatarOffset }]}>
      <RectButton style={styles.avatarMask} 
        onPress={() => navigation.navigate(isSignedIn ? 'Profile' : 'SignIn')}
      >
        <View style={styles.avatarContainer}>
          {(currUser as UserType).avatar ?
            <Image source={{ uri: (currUser as UserType).avatar }} style={styles.avatar} /> :
            <Icon iconLib='fa5' name='robot' width={avatarSize} height={avatarSize} size={avatarSize / 2.5}
              color={Global.colors.SECONDARY_TEXT}
              style={{ paddingBottom: 8 }} solid
            />
          }
        </View>
      </RectButton>
      <TouchableOpacity
        style={[styles.accountContainer, { marginTop: avatarOffset }]}
        onPress={() => navigation.navigate(isSignedIn ? 'Profile' : 'SignIn')}
      >
        <Text style={styles.account} numberOfLines={1}>
          {isSignedIn ? (currUser as UserType)?.alias || (currUser as UserType)?.accountMask : t('me.dftAccountName')}
        </Text>
      </TouchableOpacity>
    </View>;
  }
  
  return (
    <View style={[styles.root, { /* marginBottom: bottomTabBarHeight */ }]}>
      <FocusAwareStatusBar barStyle='light-content' backgroundColor={Global.colors.DARK} />
      {renderBg()}
      {renderTopMask()}
      <Animated.ScrollView style={[styles.rootSv]} onScroll={animatedEvent} scrollEventThrottle={16}>
        <TouchableOpacity style={{ height: bgHeight - 10 }} onPress={changeBg} />
        <View style={[styles.container, { paddingTop: avatarSize - avatarOffset }]}>
          {renderAvatar()}
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
  bgPos: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bgImg: {
    resizeMode: 'cover',
    backgroundColor: Global.colors.BORDER_LIGHT,
  },
  rootSv: {
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
    flexDirection: 'row',
    paddingLeft: px(50),
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
    overflow: 'hidden',
  },
  avatar: {
    width: avatarSize - 10,
    height: avatarSize - 10,
    resizeMode: 'cover',
  },
  // 用户名
  accountContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  account: {
    maxWidth: '60%', // 最大宽度 60%，超过宽度自动显示省略号，结合 numberOfLines={1}
    fontSize: px(32),
    fontWeight: '700',
    color: Global.colors.PRIMARY_TEXT,
    lineHeight: px(40),
    marginLeft: px(40),
  },
});

export default Me;
