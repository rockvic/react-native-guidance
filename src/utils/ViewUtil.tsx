import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import Images from '../assets/Images';
import Icon from '../components/EasyIcon';
import Global from '../Global';

type genericInfo = {
  title: string;
  desc: string;
}

const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

export default class ViewUtil {
  /**
   * 获取未授权提示信息
   * @param param0 
   * @returns 
   */
  static getRequestPermissionView({ title, desc }: genericInfo) {
    return <>
      <Image source={Images.permission} style={styles.genericInfoImg} />
      <Text style={styles.genericTitleText}>{title || '未获取相关权限'}</Text>
      <Text style={styles.genericText}>{desc}</Text>
    </>;
  }

  /**
   * 无数据提示信息
   * @param param0 
   * @returns 
   */
  static getEmptyView({ title, desc }: genericInfo) {
    return <>
      <Image source={Images.emptyData} style={styles.genericInfoImg} />
      <Text style={styles.genericTitleText}>{title || '暂无数据'}</Text>
      <Text style={styles.genericText}>{desc}</Text>
    </>;
  }
}

const styles = StyleSheet.create({
  genericInfoImg: {
    resizeMode: 'contain',
    width: (winWidth * 40 / 100),
    height: (winWidth * 40 / 100),
    tintColor: Global.COLORS.INFO,
    marginLeft: 20,
  },
  genericTitleText: {
    fontSize: 18,
    fontWeight: '600',
    color: Global.COLORS.SECONDARY_TEXT,
    marginTop: 20,
    width: '60%',
    textAlign: 'center',
    marginBottom: 10,
  },
  genericText: {
    fontSize: 14,
    color: Global.COLORS.SECONDARY_TEXT,
    width: '80%',
    textAlign: 'center',
    marginBottom: 20,
  },
});
