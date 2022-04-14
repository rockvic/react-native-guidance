/**
 * Description : 我的
 * Created on : 2022/3/22
 * Author : Victor Huang
 */

import React, { FC, useEffect, useState, useRef, useCallback, useLayoutEffect, BaseSyntheticEvent } from 'react';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RectButton } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';

import type { HomeTabScreenProps } from '../../navigator/types';
import type { StateType } from '../../store/reducers';
import type { UserType } from '../../store/reducers/base/authReducer';

import Global from '../../Global';
import log from '../../utils/Logger';
import Icon from '../../components/EasyIcon';
import Card from '../../components/Card';
import bgs from '../../assets/images/bg';
import { FocusAwareStatusBar } from '../../navigator/HomeTabNavigator';
import px from '../../utils/px';

import AndroidFonts from '../examples/AndroidFonts';
import IosFonts from '../examples/iOSFonts';

const avatarSize = Global.BAR_SIZES.HEADER_HEIGHT * .8;
const scaleRatio = Platform.OS === 'ios' ? 2.3 : 1.8;
const avatarOffset = (avatarSize * scaleRatio - Global.BAR_SIZES.HEADER_HEIGHT) / 2;

function Me({ navigation }: HomeTabScreenProps<'MeTab'>) {
  const { bgType, bgIdx, bgPhoto } = useSelector((state: StateType) => state.base.config);
  const { isSignedIn, currUser } = useSelector((state: StateType) => state.auth);

  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const bottomTabBarHeight = useBottomTabBarHeight();

  const winWidth = useWindowDimensions().width;
  const bgHeight = winWidth * 10 / 16;
  const scrollAnimateTriggerPoint = bgHeight - insets.top;

  const scrollY = useRef(new Animated.Value(0)).current;
  const [lightStatusBar, setLightStatusBar] = useState<boolean>(true);
  const handleScroll = (e: any) => {
    const positionY = e.nativeEvent.contentOffset.y;
    // log.debug('Me.handleScroll() > positionY : ', positionY);
    if (positionY >= bgHeight - insets.top && lightStatusBar)
      setLightStatusBar(false);
    else if (positionY < bgHeight - insets.top && !lightStatusBar)
      setLightStatusBar(true);
  }
  // ScrollView 的 onScroll 事件，动态获取 scrollY
  const animatedEvent = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { listener: handleScroll, useNativeDriver: false },
  );

  // 背景图下拉放大动画效果 - iOS 有效
  const bgTransform = {
    transform: [
      {
        translateY: scrollY.interpolate({
          inputRange: [-bgHeight, 0, bgHeight],
          outputRange: [bgHeight / 2, 0, -bgHeight],
        })
      },
      {
        scale: scrollY.interpolate({
          inputRange: [-bgHeight, 0, bgHeight],
          outputRange: [2, 1, 1],
        })
      }
    ],
  };

  // 头像放大动画控制
  const avatarTransform = {
    transform: [
      {
        scale: scrollY.interpolate({
          inputRange: [0, scrollAnimateTriggerPoint - avatarOffset, scrollAnimateTriggerPoint, 9999],
          outputRange: [scaleRatio, scaleRatio, 1, 1],
        })
      }
    ],
  };

  // Header 从全透明到完全显示动画控制
  const headerOpacity = {
    opacity: scrollY.interpolate({
      inputRange: [scrollAnimateTriggerPoint - 10, scrollAnimateTriggerPoint],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  };

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
      style={[styles.bgPos, styles.bgImg, { width: winWidth, height: bgHeight }, bgTransform]}
      source={bgType === 1 ? bgs[bgIdx] : { uri: bgPhoto }}
    />;
  }

  /**
   * 渲染最顶端的半透明渐变遮罩
   * @returns 
   */
  function renderTopMask() {
    const locations = Platform.OS === 'ios' ? [0, .2, 1] : [0, .4, 1];
    const colors = [Global.COLORS.DARK, `${Global.COLORS.DARK}77`, `${Global.COLORS.DARK}00`];
    return <Animated.View style={[styles.bgPos, { width: winWidth, height: bgHeight }, bgTransform]}>
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
    return <RectButton style={styles.avatarMask} onPress={() => navigation.navigate(isSignedIn ? 'Profile' : 'SignIn')}>
      <View style={styles.avatarContainer}>
        {(currUser as UserType).avatar ?
          <Image source={{ uri: (currUser as UserType).avatar }} style={styles.avatar} /> :
          <Icon iconLib='fa5' name='robot' width={avatarSize} height={avatarSize} size={avatarSize / 2.5}
            color={Global.COLORS.SECONDARY_TEXT}
            style={{ paddingBottom: 1 }} solid
          />
        }
      </View>
    </RectButton>;
  }

  /**
   * 渲染账户名
   * @returns 
   */
  function renderAccount() {
    return <TouchableOpacity
      style={[styles.accountContainer, { height: Global.BAR_SIZES.HEADER_HEIGHT }]}
      onPress={() => navigation.navigate(isSignedIn ? 'Profile' : 'SignIn')}
    >
      <Text style={styles.account} numberOfLines={1}>
        {isSignedIn ? (currUser as UserType)?.alias || (currUser as UserType)?.accountMask : t('me.dftAccountName')}
      </Text>
    </TouchableOpacity>;
  }

  /**
   * 渲染 Header
   * @returns 
   */
  function renderHeader() {
    return <Animated.View style={[
      styles.header,
      Global.STYLES.SHADOW,
      { width: winWidth, height: Global.BAR_SIZES.HEADER_HEIGHT + insets.top, paddingTop: insets.top },
      headerOpacity,
    ]}>
      <View style={styles.avatarHolder}>
        {renderAvatar()}
      </View>
      {renderAccount()}
    </Animated.View>;
  }

  /**
   * 渲染用户使用本 APP 时间统计
   */
  function renderTimeConsuming() {
    return <Card style={styles.tcCard}>
      <View style={styles.statContainer}>
        <Text style={styles.statTitle}>{t('me.stat.openedTitle')}</Text>
        <Text style={styles.statNum} numberOfLines={1}>
          {`168`}
          <Text style={styles.statUnit}>{` ${t('me.stat.openedUnit')}`}</Text>
        </Text>
      </View>
      <View style={styles.statContainer}>
        <Text style={styles.statTitle}>{t('me.stat.totalTCTitle')}</Text>
        <Text style={styles.statNum} numberOfLines={1}>
          {`20.2`}
          <Text style={styles.statUnit}>{` ${t('me.stat.hours')}`}</Text>
        </Text>
      </View>
      <View style={styles.statContainer}>
        <Text style={styles.statTitle}>{t('me.stat.currentTCTitle')}</Text>
        <Text style={styles.statNum} numberOfLines={1}>
          {`30`}
          <Text style={styles.statUnit}>{` ${t('me.stat.minutes')}`}</Text>
        </Text>
      </View>
    </Card>
  }

  /**
   * 渲染阅读记录
   */
  function renderReadedRecords() {
    return <>
      <Card style={styles.rrCard}>
        <Text style={styles.rrTitle}>{t('me.history')}</Text>
        <Text>2022/4/14</Text>
      </Card>
    </>;
  }

  return (
    <View style={[styles.root]}>
      <FocusAwareStatusBar
        barStyle={lightStatusBar ? 'light-content' : 'dark-content'}
        backgroundColor={lightStatusBar ? Global.COLORS.DARK : 'white'}
      />
      {renderBg()}
      {renderTopMask()}
      {renderHeader()}
      <Animated.ScrollView style={[styles.rootSv]} onScroll={animatedEvent} scrollEventThrottle={16}>
        <TouchableOpacity style={{ height: bgHeight }} onPress={changeBg} />
        <View style={styles.avatarNAccount}>
          <Animated.View style={[styles.avatarHolder, avatarTransform]}>
            {renderAvatar()}
          </Animated.View>
          {renderAccount()}
        </View>
        {renderTimeConsuming()}
        {renderReadedRecords()}
        {Platform.OS === 'android' ? (<><AndroidFonts /><AndroidFonts /></>) : <IosFonts />}
        <View style={{ height: bottomTabBarHeight + 20 }} />
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
  // header
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'white',
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
  },
  // bg
  bgPos: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bgImg: {
    resizeMode: 'cover',
    backgroundColor: Global.COLORS.BORDER_LIGHT,
  },
  rootSv: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Global.COLORS.BACKGROUND,
    borderTopLeftRadius: px(20),
    borderTopRightRadius: px(20),
  },
  avatarNAccount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // 头像
  avatarHolder: {
    paddingLeft: px(80),
    paddingRight: px(40),
  },
  avatarMask: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    backgroundColor: Global.COLORS.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    width: avatarSize - 5,
    height: avatarSize - 5,
    borderRadius: (avatarSize - 5) / 2,
    backgroundColor: Global.COLORS.BORDER_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatar: {
    width: avatarSize - 5,
    height: avatarSize - 5,
    resizeMode: 'cover',
  },
  // 用户名
  accountContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  account: {
    maxWidth: '60%', // 最大宽度 60%，超过宽度自动显示省略号，结合 numberOfLines={1}
    fontSize: Global.SIZES.FONT_SIZE_TITLE_HEAVY,
    fontWeight: Global.SIZES.BOLDER,
    color: Global.COLORS.PRIMARY_TEXT,
    marginLeft: px(40),
  },
  // 耗时统计
  tcCard: {
    marginTop: px(50),
    marginBottom: px(20),
    marginHorizontal: px(40),
    flexDirection: 'row',
  },
  statContainer: {
    flex: 1,
    padding: px(30),
  },
  statTitle: {
    fontSize: Global.SIZES.FONT_SIZE_BODY,
    fontWeight: Global.SIZES.BOLD,
    color: Global.COLORS.REGULAR_TEXT,
  },
  statNum: {
    fontFamily: 'DINPro-Bold',
    fontSize: Global.SIZES.FONT_SIZE_EMPHASIZE,
    color: Global.COLORS.PRIMARY_TEXT,
    marginTop: px(20),
    lineHeight: px(80),
  },
  statUnit: {
    fontSize: Global.SIZES.FONT_SIZE_SECONDARY,
    fontWeight: Global.SIZES.BOLD,
    color: Global.COLORS.SECONDARY_TEXT,
  },
  // readed records
  rrCard: {
    marginVertical: px(30),
    marginHorizontal: px(40),
  },
  rrTitle: {
    marginVertical: px(20),
    marginHorizontal: px(20),
    fontSize: Global.SIZES.FONT_SIZE_TITLE,
    color: Global.COLORS.PRIMARY_TEXT,
    fontWeight: Global.SIZES.BOLD,
  },
});

export default Me;
