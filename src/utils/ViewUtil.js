import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
// import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from '../component/EasyIcon';
import Card from '../component/Card';
import Toast from 'react-native-root-toast';
import px from './px';
import Global from '../Global';

const styles = StyleSheet.create({
  setting_item_container: {
    backgroundColor: 'white',
    padding: 10,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  banner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  vline: {
    width: px(8),
    height: px(32),
    backgroundColor: Global.colors.DEFAULT,
    borderRadius: px(8),
    marginLeft: px(8),
  },
  levelFlag: {
    paddingLeft: px(15),
    paddingRight: px(15),
    paddingTop: px(5),
    paddingBottom: px(5),
    borderRadius: px(20),
  },
  rowText: {
    fontSize: px(22),
    paddingTop: px(2),
    paddingBottom: px(2),
    fontWeight: 'bold',
  },
  item: {
    marginLeft: px(20),
    marginRight: px(20),
    marginTop: px(20),
    borderRadius: px(20),
  },
  rowContainer: {
    marginTop: px(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const TOAST_CONFIG = {
  duration: 3000, // toast显示时长
  position: Toast.positions.BOTTOM, // toast位置
  shadow: true, // toast是否出现阴影
  animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
  hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
};

export default class ViewUtil {
  static toast(message) {
    Toast.show(message, TOAST_CONFIG);
  }

  /**
   * 获取分组标题banner
   * @param title
   * @return {XML}
   */
  static getBanner(title) {
    return (
      <View style={styles.banner}>
        <View style={styles.vline} />
        <Text
          style={{fontSize: px(30), marginLeft: px(12), fontWeight: 'bold'}}>
          {title}
        </Text>
      </View>
    );
  }

  /**
   * 获取设置页的Item
   * @param callBack 单击item的回调
   * @param text 显示的文本
   * @param color 图标着色
   * @param Icons react-native-vector-icons组件
   * @param icon 左侧图标
   * @param expandableIco 右侧图标
   * @return {XML}
   */
  static getSettingItem(callBack, text, color, Icons, icon, expandableIco) {
    return (
      <TouchableOpacity
        onPress={callBack}
        style={styles.setting_item_container}>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          {Icons && icon ? (
            <Icons
              name={icon}
              size={16}
              style={{color: color, marginRight: 10}}
            />
          ) : (
            <View
              style={{opacity: 1, width: 16, height: 16, marginRight: 10}}
            />
          )}
          <Text>{text}</Text>
        </View>
        <Icon
          name={expandableIco ? expandableIco : 'ios-arrow-forward'}
          size={16}
          style={{
            marginRight: 10,
            alignSelf: 'center',
            color: color || 'black',
          }}
        />
      </TouchableOpacity>
    );
  }

  /**
   * 获取设置页的Item
   * @param callBack 单击item的回调
   * @param menu @MORE_MENU
   * @param color 图标着色
   * @param expandableIco 右侧图标
   * @return {XML}
   */
  static getMenuItem(callBack, menu, color, expandableIco) {
    return ViewUtil.getSettingItem(
      callBack,
      menu.name,
      color,
      menu.Icons,
      menu.icon,
      expandableIco,
    );
  }

  /**
   * 获取左侧返回按钮
   * @param callBack
   * @returns {XML}
   */
  static getLeftBackButton(callBack, iconStyle) {
    iconStyle = iconStyle || {};
    return (
      <TouchableOpacity
        style={{
          width: px(100),
          paddingRight: px(20),
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
        onPress={callBack}>
        <Icon
          iconLib="et"
          name="chevron-thin-left"
          size={px(35)}
          style={[{color: Global.colors.ASSIST}, iconStyle]}
        />
      </TouchableOpacity>
    );
  }

  /**
   * 获取右侧文字按钮
   * @param title
   * @param callBack
   * @returns {XML}
   */
  static getRightButton(title, callBack) {
    return (
      <TouchableOpacity style={{alignItems: 'center'}} onPress={callBack}>
        <Text style={{fontSize: 20, color: '#FFFFFF', marginRight: 10}}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  /**
   * 获取分享按钮
   * @param callBack
   * @returns {XML}
   */
  static getShareButton(callBack) {
    return (
      <TouchableOpacity underlayColor={'transparent'} onPress={callBack}>
        <Icon
          name={'md-share'}
          size={20}
          style={{opacity: 0.9, marginRight: 10, color: 'white'}}
        />
      </TouchableOpacity>
    );
  }

  /**
   * 获取移动医生病人信息部分
   * @param title
   * @return {XML}
   */
  static getPatientView(item) {
    // 临床路径
    let clinicalPath = item.isClinicalPath ? (
      <Text style={[styles.levelFlag, {backgroundColor: '#46DC6C'}]}>
        临床路径
      </Text>
    ) : null;
    // 护理级别
    let nursingLevel =
      item.nursingLevel !== null ? (
        <View
          style={[
            styles.levelFlag,
            {backgroundColor: '#FF832B', marginLeft: px(20)},
          ]}>
          <Text style={{color: '#FFFFFF', fontSize: px(22)}}>
            {item.nursingLevel}
          </Text>
        </View>
      ) : null;
    return (
      <Card style={[styles.sectionContainer, styles.item]}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', margin: px(20)}}>
          <View style={{flexDirection: 'column', flex: 1}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    styles.rowText,
                    {color: '#2C3742', fontSize: px(28)},
                  ]}>
                  {item.patient.name}
                </Text>
                <Text
                  style={[
                    styles.rowText,
                    {marginLeft: px(10), color: '#999999', paddingTop: px(8)},
                  ]}>
                  ({item.patient.gender + '  ' + item.patient.age + '岁'})
                </Text>
              </View>
              <Text style={{fontSize: px(22), color: '#605D5A'}}>
                {item.bedNo + '床' + ' ' + item.id}
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={{fontSize: px(22), color: '#FF832B'}}>
                {item.inDiagnosis[0].diagnosisName}
              </Text>
              <View style={{flexDirection: 'row', color: '#605D5A'}}>
                {clinicalPath}
                {nursingLevel}
              </View>
            </View>
          </View>
        </View>
      </Card>
    );
  }
}
