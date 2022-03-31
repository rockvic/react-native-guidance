/**
 * Description : 从相册选择照片或视频
 * Created on : 2022/3/29
 * Author : Victor Huang
 */

import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  PermissionsAndroid,
  PermissionStatus,
  FlatList,
  useWindowDimensions,
  ImageBackground,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { RectButton } from 'react-native-gesture-handler';
import CameraRoll from "@react-native-community/cameraroll";

import type { StackNavigationOptions } from '@react-navigation/stack';
import type { HeaderBackButtonProps } from '@react-navigation/elements';
import type { RootStackScreenProps } from '../../navigator/types';

import Global from '../../Global';
import log from '../../utils/Logger';
import Icon from '../../components/EasyIcon';
import ViewUtil from '../../utils/ViewUtil';
import BottomButtonBar from '../../components/BottomButtonBar';

// 默认相册 - All，显示所有照片
const defaultAlbum = "All";
// 默认查询的类型 - All，显示所有照片及视频
const defaultAssetType = "All";
// 每次读取的照片张数
const pageSize = 50;
// 图片列表显示时每张图片的间隔距离
const bgGap = 2;

function MyCameraRoll({ navigation, route }: RootStackScreenProps<'CameraRoll'>) {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  // Android: 是否已经获取访问相册的权限？
  // PermissionStatus: 'granted' | 'denied' | 'never_ask_again'
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [assetType, setAssetType] = useState<CameraRoll.AssetType>(defaultAssetType);
  const [albums, setAlbums] = useState<CameraRoll.Album[]>();
  const [selectedAlbum, setSelectedAlbum] = useState<string>(defaultAlbum);
  const [retrievedPhotos, setRetrievedPhotos] = useState<CameraRoll.PhotoIdentifiersPage>();
  const [photosData, setPhotosData] = useState<CameraRoll.PhotoIdentifier[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<string>();

  useLayoutEffect(() => {
    // 设置定制化的 Header
    const options: Partial<StackNavigationOptions> = {
      headerStyle: {
        backgroundColor: '#1A1A1A',
      },
      headerTitleStyle: {
        color: Global.colors.BORDER_EXTRALIGHT,
      },
      headerShadowVisible: false,
    };
    if (Platform.OS === 'ios') {
      options.headerLeft = getCloseBtnOnHeader;
    }
    navigation.setOptions(options);
  }, [navigation]);

  useEffect(() => {
    // 如果是Android，先检查权限
    if (Platform.OS === 'android') {
      hasAndroidPermission();
      return;
    } else { // 如果iOS，直接获取相册
      setAssetType('Photos');
      getAlbums();
    }
  }, []);

  useEffect(() => {
    // Android下监听权限变化，如果已授权，则开始获取相册信息
    if (permissionStatus === 'granted') getAlbums();
  }, [permissionStatus]);

  /**
   * Android：检查及请求权限
   */
  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      setPermissionStatus('granted');
    }
    const status = await PermissionsAndroid.request(permission);
    setPermissionStatus(status);
  }

  /**
   * 获取自定义的后退按钮
   * @param props 后退按钮获取的相关属性
   * @returns 
   */
  function getCloseBtnOnHeader(props: HeaderBackButtonProps): React.ReactNode {
    return <RectButton style={styles.backBtn} onPress={() => navigation.goBack()}>
      <Icon name='chevron-down-sharp' size={28} color={Global.colors.BORDER_EXTRALIGHT} />
    </RectButton>;
  }

  /**
   * Android 平台下，等待授权的替代渲染界面
   * @returns 
   */
  function renderPermissionReplace() {
    // TODO: 后续增加打开设置界面功能
    return <View style={[styles.root, styles.centeredContent]}>
      {ViewUtil.getRequestPermissionView({
        title: t('cameraRoll.permissionTitle'),
        desc: permissionStatus === 'denied' ?
          t('cameraRoll.permissionDeniedDesc') :
          t('cameraRoll.permissionNeverAskAgainDesc'),
      })}
      <RectButton style={styles.permissionBtn} onPress={hasAndroidPermission}>
        <Text style={styles.permissionBtnText}>
          {t('cameraRoll.requestPermission')}
        </Text>
      </RectButton>
    </View>;
  }

  /**
   * 获取相册
   */
  async function getAlbums() {
    try {
      const albums: CameraRoll.Album[] = await CameraRoll.getAlbums({
        assetType,
      });
      log.debug('albums:', albums);
      setAlbums(albums);
      getPhotos(defaultAlbum);
    } catch (e) {
      log.error('MyCameraRoll.getAlbums() > 获取相册发生错误 : ', e);
    }
  }

  /**
   * 根据相册获取照片列表
   * 如果相册名称不传，则显示所有照片
   * @param albumName 相册名称
   */
  async function getPhotos(albumName: string | undefined) {
    setLoading(true);
    try {
      const groupTypes: 'All' | 'Album' = albumName === defaultAlbum ? defaultAlbum : 'Album';
      const photos: CameraRoll.PhotoIdentifiersPage = await CameraRoll.getPhotos({
        first: pageSize,
        groupTypes,
        groupName: albumName,
        assetType,
      });
      log.debug('MyCameraRoll.getPhotos() > retrieved photos : ', photos);
      setRetrievedPhotos(photos);
      setPhotosData(photos.edges);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      log.error('MyCameraRoll.getPhotos() > 获取照片列表发生错误 : ', e);
    }
  }

  /**
   * 渲染预览区域
   */
  function renderPreviewView() {
    return <View style={styles.previewView}>

    </View>;
  }

  /**
   * 渲染工具栏
   * 相册选择……
   */
  function renderToolBar() {
    return <View style={styles.toolbar}>
      <RectButton
        style={styles.albumBtn}
        onPress={() => {
          navigation.navigate('ChooseAlbum', {
            onChoosed: album => setSelectedAlbum(album),
            initAlbumName: selectedAlbum,
          });
        }}
      >
        <Text style={styles.albumBtnText}>
          {selectedAlbum === defaultAlbum ? t('cameraRoll.allPhotos') : selectedAlbum}
        </Text>
        <Icon name='chevron-down-sharp' size={20} color={Global.colors.BORDER_EXTRALIGHT} />
      </RectButton>
    </View>; 
  }

  /**
   * 渲染列表元素
   * @returns 
   */
  function renderPhotosItem({ item }: { item: CameraRoll.PhotoIdentifier }) {
    const { node } = item;
    // 每行显示 3 张，计算每张图片的宽度
    const bgWidth = ((width - bgGap * 5) / 4);
    const bgHeight = bgWidth;
    return <ImageBackground
      style={[styles.photo, { width: bgWidth, height: bgHeight }]}
      source={{ uri: node.image.uri }}
      resizeMode='cover'
    >
      {/* {idx === index ? <View style={styles.bgMask}>
        <View style={styles.checkCircle}>
          <Icon iconLib='fa5' name='check' size={10} color='#ffffff' />
        </View>
      </View> : null} */}
    </ImageBackground>;
  }

  /**
   * 渲染照片列表
   */
  function renderPhotos() {
    return <FlatList
      keyExtractor={(item, idx) => `_photo_${idx}`}
      data={photosData}
      refreshing={loading}
      renderItem={renderPhotosItem}
      ListFooterComponent={<View style={{ height: bgGap }} />}
      horizontal={false}
      numColumns={4}
      style={[styles.photos]}
    />;
  }

  /**
   * 确定点击事件
   */
  function onConfirm() {
    navigation.goBack();
  }

  /**
   * 取消按钮点击事件
   */
  function onCancel() {
    navigation.goBack();
  }

  // 如果是 Android 系统，如果未授权，先等待获取授权
  if (Platform.OS === 'android' && permissionStatus !== 'granted') {
    return renderPermissionReplace();
  }

  return (
    <View style={styles.root}>
      {renderPreviewView()}
      {renderToolBar()}
      {renderPhotos()}
      <BottomButtonBar
        btns={[
          { title: t('base.confirm'), onPress: onConfirm },
          { title: t('base.cancel'), onPress: onCancel, btnTextStyle: { color: Global.colors.SECONDARY_TEXT } },
        ]}
        style={styles.bottomBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  centeredContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionBtn: {
    width: '80%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Global.colors.PRIMARY,
    borderRadius: 8,
    marginBottom: 40,
  },
  permissionBtnText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  backBtn: {
    flex: 1,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // 预览区域
  previewView: {
    height: '30%',
    backgroundColor: '#262626',
  },
  // 工具栏
  toolbar: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
  },
  albumBtn: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
  },
  albumBtnText: {
    fontSize: 16,
    color: Global.colors.BORDER_EXTRALIGHT,
    fontWeight: '600',
    marginRight: 5,
  },
  // 照片列表
  photos: {
    flex: 1,
    paddingLeft: bgGap,
    paddingTop: bgGap,
    backgroundColor: '#262626',
  },
  photo: {
    marginRight: bgGap,
    marginBottom: bgGap,
    backgroundColor: '#1A1A1A',
  },
  // 底端工具栏
  bottomBar: {
    backgroundColor: '#1A1A1A',
  },
});

export default MyCameraRoll;
