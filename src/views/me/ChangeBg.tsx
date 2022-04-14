/**
 * Description : 变更用户界面背景图
 * Created on : 2022/3/27
 * Author : Victor Huang
 */

import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  useWindowDimensions,
  PixelRatio,
  StatusBar,
  Platform,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

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
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  // 每行显示 3 张，计算每张图片的宽度
  const bgWidth = ((width - bgGap * 4) / 3);
  // 图片按照 16:10 的宽高比计算图片的高度
  const bgHeight = bgWidth * 10 / 16;

  // bg props in config
  const { bgType, bgIdx, bgPhoto, bgPhotos } = useSelector((state: StateType) => state.base.config);
  // states
  const [type, setType] = useState<StateType['base']['config']['bgType']>(bgType);
  const [index, setIndex] = useState<StateType['base']['config']['bgIdx']>(bgIdx);
  const [uri, setUri] = useState<StateType['base']['config']['bgPhoto']>(bgPhoto);
  const [photos, setPhotos] = useState<StateType['base']['config']['bgPhotos']>(bgPhotos || []);

  /**
   * 取消或后退前检查是否有未保存项，如果有，则提示
   */
  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (!isChanged()) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }
        // Prevent default behavior of leaving the screen
        e.preventDefault();
        // Prompt the user before leaving the screen
        Alert.alert(
          t('base.discardChangesAlert.title'),
          t('base.discardChangesAlert.message'),
          [
            { text: t('base.discardChangesAlert.cancelBtnText'), style: 'cancel', onPress: () => {} },
            {
              text: t('base.discardChangesAlert.discardBtnText'), style: 'destructive',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ]
        );
      }),
    [navigation, isChanged]
  );

  /**
   * 图片点击时的触发函数
   * @param idx 图片在内置图片列表中的序列值
   */
  function onBgImgPress(idx: number) {
    requestAnimationFrame(() => {
      setType(1);
      setIndex(idx);
    });
  }

  /**
   * 来自相册的图片被点击
   * @param source 图片 uri
   */
  function onPhotoFromCameraRollPress(source: string) {
    setType(2);
    setUri(source);
  }

  /**
   * 处理相册选择图片的结果
   */
  function onChoosedFromCameraRoll(choosedPhotos: string[]) {
    let tmpPhotos = photos!.concat([]);
    if (tmpPhotos.indexOf(choosedPhotos[0]) === -1) {
      // 从相册选中的图片最多 9 项，超过 9 项时删除最早加入的图片
      if (tmpPhotos.length === 9) {
        // 删除最后一项
        tmpPhotos.splice(tmpPhotos.length - 1, 1);
      }
      // 新图片插入到第一项
      tmpPhotos.splice(0, 0, choosedPhotos[0]);
    }
    setPhotos(tmpPhotos);
    setType(2);
    setUri(choosedPhotos[0]);
    // 每次选择完相册图片都更新一下缓存的最近所选列表
    dispatch(setUserBg({
      bgPhotos: photos,
    }));
  }

  /**
   * 删除某张缓存的从相册选中的照片
   * @param idx 
   */
  function onDelPhoto(idx: number, source: string) {
    const tmpPhotos = photos!.concat([]);
    tmpPhotos!.splice(idx, 1);
    setPhotos(tmpPhotos);
    dispatch(setUserBg({
      bgPhotos: tmpPhotos,
    }));
  }

  /**
   * 确定点击事件
   */
  function onConfirm() {
    // 将背景图相关参数放入 redux
    dispatch(setUserBg({
      bgType: type,
      bgIdx: type === 1 ? index : -1,
      bgPhoto: type === 2 ? uri : undefined,
      bgPhotos: photos,
    }));
    navigation.removeListener('beforeRemove', () => {});
    navigation.goBack();
  }

  /**
   * 取消按钮点击事件
   */
  function onCancel() {
    navigation.goBack();
  }

  /**
   * 判定背景图设定是否与界面初始化时一致
   */
  function isChanged() {
    const b = bgType !== type || (type === 1 && bgIdx !== index) || (type === 2 && bgPhoto !== uri);
    return b;
  }

  /**
   * 渲染背景图列表
   * @returns 
   */
  function renderBgs() {
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
          {type === 1 && idx === index ? <View style={styles.bgMask}>
            <Icon iconLib='fa5' name='check' size={10} color='#ffffff' style={styles.chkIcon} />
          </View> : null}
        </ImageBackground>
      </TouchableOpacity>
    });
  }

  /**
   * 渲染选自相册的背景图
   * @returns React.React.ReactNode
   */
  function renderPhotoFromCameraRoll() {
    return <>
      {photos!.length > 0 ? <Text style={styles.fromCR}>{t('base.fromCameraRoll')}</Text> : null}
      {photos!.map((source, idx) => {
        return <TouchableOpacity key={`_pcr_${idx}`} onPress={() => onPhotoFromCameraRollPress(source)} >
          <ImageBackground
            source={{ uri: source }}
            style={[styles.bg, { width: bgWidth, height: bgHeight }]}
            onError={error => {console.log(error)}}
          >
            {type === 2 && uri === source ? <View style={styles.bgMask}>
              <Icon iconLib='fa5' name='check' size={10} color='#ffffff' style={styles.chkIcon} />
            </View> : null}
            {type === 1 || uri !== source ? <TouchableOpacity style={styles.delBtn} onPress={() => onDelPhoto(idx, source)} >
              <Icon iconLib='fa5' name='times' size={10} color={Global.COLORS.PLACEHOLDER_TEXT} style={styles.delIcon} />
            </TouchableOpacity> : null}
          </ImageBackground>
        </TouchableOpacity>
      })}
    </>;
  }
  
  return (
    <View style={styles.root}>
      <ScrollView style={styles.rootSv}>
        <View style={styles.bgsContainer}>
          {renderBgs()}
          {renderPhotoFromCameraRoll()}
        </View>
      </ScrollView>
      <BottomButtonBar
        btns={[
          {
            title: t('base.confirm'),
            onPress: onConfirm,
            disabled: !isChanged(),
          },
          {
            title: t('base.openCameraRoll'),
            btnStyle: { flex: 1.5 },
            btnTextStyle: { color: Global.COLORS.PRIMARY_TEXT },
            onPress: () => {
              navigation.navigate('CameraRoll', {
                multiple: false,
                initChoosedPhotos: [],
                onChoosed: onChoosedFromCameraRoll,
              });
            },
          },
          { title: t('base.cancel'), onPress: onCancel, btnTextStyle: { color: Global.COLORS.PRIMARY_TEXT } },
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
    justifyContent: 'flex-end',
  },
  bgMask: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, .5)',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  chkIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff',
    backgroundColor: Global.COLORS.PRIMARY,
    marginRight: 5,
    marginBottom: 5,
  },
  delBtn: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  delIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, .3)',
  },
  fromCR: {
    fontSize: 14,
    fontWeight: '600',
    color: Global.COLORS.REGULAR_TEXT,
    marginLeft: 5,
    marginVertical: 10,
    width: '100%',
  },
});

export default ChangeBg;
