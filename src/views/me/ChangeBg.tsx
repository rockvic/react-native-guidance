/**
 * Description : 变更用户界面背景图
 * Created on : 2022/3/27
 * Author : Victor Huang
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  useWindowDimensions,
  PixelRatio,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import type { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { RootStackParamList } from '../../navigator/RootStackParamList';
import Icon from '../../components/EasyIcon';
import log from '../../utils/Logger';
import bgs from '../../assets/images/bg';
import Global from '../../Global';
import { setUserBg } from '../../store/actions/base/baseAction';
import type { StateType } from '../../store/reducers';

type ChangeBgNavigationProp = StackNavigationProp<RootStackParamList, 'ChangeBg'>;
type Props = {
  navigation: ChangeBgNavigationProp,
};

// 图片列表显示时每张图片的间隔距离
const bgGap = 5;

const ChangeBg: React.FC<Props> = () => {
  // 本例中使用 useNavigation 获取 navigation 做导航跳转
  const navigation = useNavigation<ChangeBgNavigationProp>();
  const { width } = useWindowDimensions();
  const { bgType, bgIdx } = useSelector((state: StateType) => state.base.config);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  /**
   * 图片点击时的触发函数
   * @param idx 图片在内置图片列表中的序列值
   */
  function onBgImgPress(idx: number) {
    requestAnimationFrame(() => {
      dispatch(setUserBg({ bgType: 1, bgIdx: idx }));
    });
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
      return <TouchableOpacity
        key={`img_${idx}`}
        onPress={() => onBgImgPress(idx)}
      >
        <ImageBackground
          style={[styles.bg, { width: bgWidth, height: bgHeight }]}
          source={source}
          resizeMode='cover'
        >
          {idx === bgIdx ? <View style={styles.bgMask}>
            <View style={styles.checkCircle}>
              <Icon iconLib='fa5' name='check' size={10} color='#ffffff' />
            </View>
          </View> : null}
        </ImageBackground>
      </TouchableOpacity>
    });
  }
  log.debug('insets.bottom:', insets.bottom);
  return (
    <View style={styles.root}>
      <ScrollView style={styles.rootSv}>
        <View style={styles.bgsContainer}>
          {renderBgs()}
          {renderBgs()}
        </View>
      </ScrollView>
      <View style={[styles.bottomBtnsContainer, {height: 40 + insets.bottom}]}>
        <Text>{t('base.confirm')}</Text>
      </View>
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
    backgroundColor: Global.colors.IOS_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    marginBottom: 5,
  },
  bottomBtnsContainer: {
    // position: 'absolute',
    width: '100%',
    // left: 0,
    // bottom: 0,
    backgroundColor: 'rgba(255, 0, 0, .5)',
  },
});

export default ChangeBg;
