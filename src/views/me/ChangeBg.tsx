/**
 * Description : 变更用户界面背景图
 * Created on : 2022/3/27
 * Author : Victor Huang
 */

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  useWindowDimensions,
  PixelRatio,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

import type { RootStackScreenProps } from '../../navigator/types';
import type { StateType } from '../../store/reducers';

import Global from '../../Global';
import log from '../../utils/Logger';
import Icon from '../../components/EasyIcon';
import bgs from '../../assets/images/bg';
import BottomButtonBar from '../../components/BottomButtonBar';
import { setUserBg } from '../../store/actions/base/baseAction';

// 图片列表显示时每张图片的间隔距离
const bgGap = 5;

function ChangeBg() {
  // 本例中使用 useNavigation 获取 navigation 做导航跳转
  const navigation = useNavigation<RootStackScreenProps<'ChangeBg'>['navigation']>();
  const { width } = useWindowDimensions();
  const { bgType, bgIdx } = useSelector((state: StateType) => state.base.config);
  const [index, setIndex] = useState<number>();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    setIndex(bgIdx);
  }, []);

  /**
   * 图片点击时的触发函数
   * @param idx 图片在内置图片列表中的序列值
   */
  function onBgImgPress(idx: number) {
    requestAnimationFrame(() => {
      setIndex(idx);
    });
  }

  /**
   * 确定点击事件
   */
  function onConfirm() {
    dispatch(setUserBg({ bgType: 1, bgIdx: index }));
    navigation.goBack();
  }

  /**
   * 取消按钮点击事件
   */
  function onCancel() {
    navigation.goBack();
  }

  /**
   * 渲染背景图列表
   * @returns 
   */
  function renderBgs() {
    // 每行显示 3 张，计算每张图片的宽度
    const bgWidth = ((width - bgGap * 4) / 3);
    // 图片按照 16:10 的宽高比计算图片的高度
    const bgHeight = bgWidth * 10 / 16;
    return bgs.map((source, idx) => {
      return <TouchableNativeFeedback
        key={`img_${idx}`}
        onPress={() => onBgImgPress(idx)}
      >
        <ImageBackground
          style={[styles.bg, { width: bgWidth, height: bgHeight }]}
          source={source}
          resizeMode='cover'
        >
          {idx === index ? <View style={styles.bgMask}>
            <View style={styles.checkCircle}>
              <Icon iconLib='fa5' name='check' size={10} color='#ffffff' />
            </View>
          </View> : null}
        </ImageBackground>
      </TouchableNativeFeedback>
    });
  }

  return (
    <View style={styles.root}>
      <ScrollView style={styles.rootSv}>
        <View style={styles.bgsContainer}>
          {renderBgs()}
        </View>
      </ScrollView>
      <BottomButtonBar
        btns={[
          { title: t('base.confirm'), onPress: onConfirm },
          { 
            title: t('base.openCameraRoll'), 
            btnStyle: { flex: 1.5 },
            btnTextStyle: { color: Global.colors.PRIMARY_TEXT },
            onPress: () => { navigation.navigate('CameraRoll') }, 
          },
          { title: t('base.cancel'), onPress: onCancel, btnTextStyle: { color: Global.colors.PRIMARY_TEXT } },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  rootSv: {
    flex: 1,
  },
  bgsContainer: {
    flexDirection: 'row', // 横向平铺显示
    flexWrap: 'wrap', // 子组件超过父容器范围自动折行
    paddingLeft: bgGap - (1 / PixelRatio.get()),
    paddingTop: bgGap,
  },
  bg: {
    marginRight: bgGap,
    marginBottom: bgGap,
    backgroundColor: 'white',
  },
  bgMask: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, .2)',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff',
    backgroundColor: Global.colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    marginBottom: 5,
  },
});

export default ChangeBg;
