/**
 * Description : 选择相册
 * Created on : 2022/3/31
 * Author : Victor Huang
 */

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, FlatList, Image } from 'react-native';

import { useTranslation } from 'react-i18next';
import CameraRoll from '@react-native-community/cameraroll';
import { RectButton } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { StackNavigationOptions } from '@react-navigation/stack';
import type { HeaderBackButtonProps } from '@react-navigation/elements';
import type { RootStackScreenProps } from '../../navigator/types';

import Global from '../../Global';
import log from '../../utils/Logger';
import Icon from '../../components/EasyIcon';

// 默认相册 - All，显示所有照片
const defaultAlbum = "All";
// 默认查询的类型 - All，显示所有照片及视频
const defaultAssetType = "All";
// 每次读取的照片张数
const pageSize = 50;

function ChooseAlbum({ navigation, route }: RootStackScreenProps<'ChooseAlbum'>) {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  // route props:
  const { initAlbumName, onChoosed } = route.params;
  // states:
  const [assetType, setAssetType] = useState<CameraRoll.AssetType>(defaultAssetType);
  const [albums, setAlbums] = useState<CameraRoll.Album[]>([]);
  const [thumbnails, setThumbnails] = useState<Array<CameraRoll.PhotoIdentifier | undefined>>();
  const [selectedAlbum, setSelectedAlbum] = useState<string>(defaultAlbum);

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
    log.debug('ChooseAlbum > route : ', route);
    setAssetType('Photos');
    setSelectedAlbum(initAlbumName);
    getAlbums();
  }, []);

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
   * 获取相册
   */
  async function getAlbums() {
    try {
      let retrievedAlbums: CameraRoll.Album[] = await CameraRoll.getAlbums({
        assetType,
      });
      log.debug('ChooseAlbum.getAlbums > retrievedAlbums : ', retrievedAlbums);
      retrievedAlbums = [{ title: 'All', count: -1 }].concat(retrievedAlbums);
      setAlbums(retrievedAlbums);
      getThumbnails(retrievedAlbums);
    } catch (e) {
      log.error('ChooseAlbum.getAlbums() > 获取相册发生错误 : ', e);
    }
  }

  /**
   * 获取相册的第一张照片作为缩略图
   */
  async function getThumbnails(retrievedAlbums: CameraRoll.Album[]) {
    const tmpThumbnails: Array<CameraRoll.PhotoIdentifier | undefined> = [];
    let totalCount: number = 0;
    try {
      for (let { title, count } of retrievedAlbums) {
        // 照片数量为 0 的相册不会读取出来，所以不用做判断
        /* if (count === 0) {
          tmpThumbnails.push(undefined);
          continue;
        } */
        const groupTypes: 'All' | 'Album' = title === defaultAlbum ? defaultAlbum : 'Album';
        const photos: CameraRoll.PhotoIdentifiersPage = await CameraRoll.getPhotos({
          first: 1,
          groupTypes,
          groupName: title,
          assetType,
        });
        tmpThumbnails.push(photos.edges[0]);
        totalCount += count;
      }
      retrievedAlbums[0]['count'] = totalCount;
      setAlbums(retrievedAlbums);
      setThumbnails(tmpThumbnails);
    } catch (e) {
      log.error('ChooseAlbum.getThumbnails() > 获取相册缩略图发生错误 : ', e);
    }
  }

  /**
   * 渲染列表元素
   * @returns 
   */
  function renderItem({ item, index }: { item: CameraRoll.Album, index: number }) {
    const { title, count } = item;
    const selectedRowStyle = selectedAlbum === title ? {
      backgroundColor: '#3B3B3B',
    } : {};
    return <RectButton
      onPress={() => {
        onChoosed(title);
        navigation.goBack();
      }}
      style={[styles.row, selectedRowStyle]}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title === defaultAlbum ? t('cameraRoll.allPhotos') : title}</Text>
        <Text style={styles.count}>{count === -1 ? '' : count}</Text>
      </View>
      {thumbnails && thumbnails[index] ?
        <Image source={{ uri: thumbnails[index]?.node.image.uri }} style={[styles.thumbnail, styles.thumbnailImg]} /> :
        <View style={styles.thumbnail}></View>
      }
    </RectButton>;
  }

  /**
   * 渲染照片列表
   */
  function renderAlbums() {
    return <FlatList
      keyExtractor={(item, idx) => `_album_${idx}`}
      data={albums}
      renderItem={renderItem}
      ListFooterComponent={<View style={{ height: insets.bottom }} />}
      style={[styles.list]}
    />;
  }

  return renderAlbums();
};

const styles = StyleSheet.create({
  backBtn: {
    flex: 1,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#262626',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Global.colors.BORDER_EXTRALIGHT,
    marginBottom: 8,
  },
  count: {
    fontSize: 14,
    fontWeight: '600',
    color: Global.colors.BORDER_LIGHT,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 6,
    backgroundColor: '#1A1A1A',
  },
  thumbnailImg: {
    resizeMode: 'cover',
  },
});

export default ChooseAlbum;
