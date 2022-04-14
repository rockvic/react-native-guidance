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
  Image,
  StatusBar,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { RectButton } from 'react-native-gesture-handler';
import CameraRoll from '@react-native-community/cameraroll';

import type { StackNavigationOptions } from '@react-navigation/stack';
import type { HeaderBackButtonProps } from '@react-navigation/elements';
import type { RootStackScreenProps } from '../../navigator/types';

import Global from '../../Global';
import log from '../../utils/Logger';
import Icon from '../../components/EasyIcon';
import ViewUtil from '../../utils/ViewUtil';
import BottomButtonBar from '../../components/BottomButtonBar';
import PinchableImage from '../../components/PinchableImage';

// 默认相册 - All，显示所有照片
const defaultAlbum = 'All';
// 默认查询的类型 - All，显示所有照片及视频
const defaultAssetType = 'All';

// 每次读取的照片张数
const photosPerPage = 200;
// 每行显示的照片数量
const photosPerRow = 4;
// 图片列表显示时每张图片的间隔距离
const photoGap = 2;

function MyCameraRoll({ navigation, route }: RootStackScreenProps<'CameraRoll'>) {
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();
  // props passed by route.params
  const initChoosedPhotos = route?.params?.initChoosedPhotos || [];
  const multiple = route?.params?.multiple || false;
  const onChoosed = route?.params?.onChoosed;
  // Android: 是否已经获取访问相册的权限？
  // PermissionStatus: 'granted' | 'denied' | 'never_ask_again'
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus | undefined>();
  const [assetType, setAssetType] = useState<CameraRoll.AssetType>(defaultAssetType);
  const [selectedAlbum, setSelectedAlbum] = useState<string>(defaultAlbum);
  const [pageInfo, setPageInfo] = useState<CameraRoll.PhotoIdentifiersPage['page_info'] | undefined>();
  const [photosData, setPhotosData] = useState<CameraRoll.PhotoIdentifier[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>(initChoosedPhotos);
  const [previewPhoto, setPreviewPhoto] = useState<string>();
  // 控制下拉刷新
  const [pullToRefreshing, setPullToRefreshing] = useState<boolean>(false);
  // 控制无限加载
  const [infiniteLoading, setInfiniteLoading] = useState<boolean>(false);

  useLayoutEffect(() => {
    // 设置定制化的 Header
    const options: Partial<StackNavigationOptions> = {
      headerTintColor: Global.COLORS.BORDER_EXTRALIGHT,
      headerStyle: {
        backgroundColor: '#1A1A1A',
      },
      headerShadowVisible: false,
    };
    if (Platform.OS === 'ios') {
      options.headerLeft = getCloseBtnOnHeader;
    }
    navigation.setOptions(options);
  }, [navigation]);

  /**
   * 获取自定义的后退按钮
   * @param props 后退按钮获取的相关属性
   * @returns 
   */
  function getCloseBtnOnHeader(props: HeaderBackButtonProps): React.ReactNode {
    return <RectButton style={styles.backBtn} onPress={() => navigation.goBack()}>
      <Icon name='chevron-down-sharp' size={28} color={Global.COLORS.BORDER_EXTRALIGHT} />
    </RectButton>;
  }

  useEffect(() => {
    // 默认读取图片，后续支持可传入查询资产类型
    setAssetType('Photos');
    // 如果是Android，先检查权限
    if (Platform.OS === 'android') {
      hasAndroidPermission();
      return;
    } else { // 如果iOS，直接获取照片
      setPullToRefreshing(true);
    }
  }, []);

  useEffect(() => {
    // Android下监听权限变化，如果已授权，则开始获取相册信息
    if (permissionStatus === 'granted') {
      setPullToRefreshing(true);
    }
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

  useEffect(() => {
    if ((pullToRefreshing && infiniteLoading) || (!pullToRefreshing && !infiniteLoading))
      return;
    getPhotos();
  }, [pullToRefreshing, infiniteLoading]);

  /**
   * 根据相册获取照片列表
   */
  async function getPhotos() {
    // 无限加载时，如果 has_next_page === false，则终止查询
    if (infiniteLoading && pageInfo && typeof pageInfo.has_next_page === 'boolean' && pageInfo.has_next_page === false) {
      setPullToRefreshing(false);
      setInfiniteLoading(false);
      return;
    }
    try {
      const groupTypes: 'All' | 'Album' = selectedAlbum === defaultAlbum ? defaultAlbum : 'Album';
      let retrieveOptions: CameraRoll.GetPhotosParams = {
        first: photosPerPage,
        assetType,
      };
      // 无限加载时，如果 has_next_page === true，则增加查询属性 'after'。
      if (infiniteLoading && pageInfo?.has_next_page)
        retrieveOptions['after'] = pageInfo.end_cursor;
      if (selectedAlbum !== defaultAlbum)
        retrieveOptions = {...retrieveOptions, ...{
          groupTypes,
          groupName: selectedAlbum,
        }};

      // TODO: 翻页查询照片在 Android 下存在 bug.已提交官方
      log.debug('MyCameraRoll.getPhotos() > retrieveOptions : ', retrieveOptions);
      const retrievedPhotos: CameraRoll.PhotoIdentifiersPage = await CameraRoll.getPhotos(retrieveOptions);
      log.debug('MyCameraRoll.getPhotos() > retrieved photos : ', retrievedPhotos);

      setPreviewPhoto(retrievedPhotos.edges[0].node.image.uri);
      setPageInfo(retrievedPhotos.page_info);
      // 下拉刷新需清除现有数据，重新加载新数据
      // 无限加载在原数据基础上在尾部拼接新数据
      setPhotosData((pullToRefreshing ? [] : photosData).concat(retrievedPhotos.edges));

      setPullToRefreshing(false);
      setInfiniteLoading(false);
    } catch (e) {
      setPullToRefreshing(false);
      setInfiniteLoading(false);
      log.error('MyCameraRoll.getPhotos() > 获取照片列表发生错误 : ', e);
    }
  }

  /**
   * 渲染预览区域
   */
  function renderPreviewView() {
    const previewViewHeight = height * 0.3;
    return <View style={[styles.previewView, { height: previewViewHeight }]}>
      {previewPhoto ? <PinchableImage
        uri={previewPhoto}
        width={width}
        height={previewViewHeight}
        style={{ resizeMode: 'cover' }}
      /> : null}
    </View>;
  }

  useEffect(() => {
    setPullToRefreshing(true);
  }, [selectedAlbum]);

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
            onChoosed: async album => setSelectedAlbum(album),
            initAlbumName: selectedAlbum,
          });
        }}
      >
        <Text style={styles.albumBtnText}>
          {selectedAlbum === defaultAlbum ? t('cameraRoll.allPhotos') : selectedAlbum}
        </Text>
        <Icon name='chevron-down-sharp' size={20} color={Global.COLORS.BORDER_EXTRALIGHT} />
      </RectButton>
      <Text style={styles.selectedCount}>{t('base.choosedItems', { count: selectedPhotos.length })}</Text>
    </View>;
  }

  /**
   * 选中图片
   * @param uri 图片的资源路径
   */
  function onSelectPhoto(uri: string) {
    setPreviewPhoto(uri);
    if (!multiple) {
      if (selectedPhotos[0] === uri)
        setSelectedPhotos([]);
      else
        setSelectedPhotos([uri]);
    } else {
      let tmpPhotos = selectedPhotos.concat([]);
      if (tmpPhotos.indexOf(uri) !== -1)
        tmpPhotos.splice(tmpPhotos.indexOf(uri), 1);
      else
        tmpPhotos.push(uri);
      setSelectedPhotos(tmpPhotos);
    }
  }

  /**
   * 渲染列表元素
   * @returns 
   */
  function renderPhotosItem({ item }: { item: CameraRoll.PhotoIdentifier }) {
    const { node } = item;
    // 每行显示 3 张，计算每张图片的宽度
    const photoWidth = ((width - photoGap * (photosPerRow + 1)) / photosPerRow);
    const photoHeight = photoWidth;
    return <ImageBackground
      style={[styles.photo, { width: photoWidth, height: photoHeight }]}
      source={{ uri: node.image.uri }}
      resizeMode='cover'
    >
      <RectButton style={styles.photoBtn} onPress={() => onSelectPhoto(node.image.uri)}>
        {selectedPhotos.includes(node.image.uri) ? <View style={styles.bgMask}>
          <View style={styles.checkCircle}>
            <Icon iconLib='fa5' name='check' size={10} color='#ffffff' />
          </View>
        </View> : null}
      </RectButton>
    </ImageBackground>;
  }

  /**
   * 渲染照片列表
   */
  function renderPhotos() {
    return <FlatList
      keyExtractor={(item, idx) => `_photo_${idx}`}
      data={photosData}
      renderItem={renderPhotosItem}
      ListFooterComponent={<View style={{ height: photoGap }} />}
      horizontal={false}
      numColumns={photosPerRow}
      style={[styles.photos]}
      // 下拉刷新及无限加载
      refreshing={pullToRefreshing}
      onRefresh={() => setPullToRefreshing(true)}
      // 无限加载
      onEndReached={() => setInfiniteLoading(true)}
      onEndReachedThreshold={0.1}
    />;
  }

  /**
   * 确定点击事件
   */
  function onConfirm() {
    onChoosed(selectedPhotos);
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
      <StatusBar barStyle='light-content' backgroundColor='#1A1A1A' />
      {renderPreviewView()}
      {renderToolBar()}
      {renderPhotos()}
      <BottomButtonBar
        btns={[
          { title: t('base.confirm'), onPress: onConfirm, disabled: selectedPhotos.length === 0 },
          { title: t('base.cancel'), onPress: onCancel, btnTextStyle: { color: Global.COLORS.SECONDARY_TEXT } },
        ]}
        style={styles.bottomBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#262626',
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
    backgroundColor: Global.COLORS.PRIMARY,
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
    overflow: 'hidden',
    // backgroundColor: 'red',
  },
  previewImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
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
    color: Global.COLORS.BORDER_EXTRALIGHT,
    fontWeight: '600',
    marginRight: 5,
  },
  selectedCount: {
    flex: 1,
    color: Global.COLORS.BORDER_EXTRALIGHT,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
    paddingRight: 10,
  },
  // 照片列表
  photos: {
    flex: 1,
    paddingLeft: photoGap,
    paddingTop: photoGap,
  },
  photo: {
    marginRight: photoGap,
    marginBottom: photoGap,
    backgroundColor: '#1A1A1A',
  },
  photoBtn: {
    width: '100%',
    height: '100%',
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
    backgroundColor: Global.COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    marginBottom: 5,
  },
  // 底端工具栏
  bottomBar: {
    backgroundColor: '#1A1A1A',
  },
});

export default MyCameraRoll;
