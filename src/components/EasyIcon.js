'use strict';
/**
 * 带背景的ICON
 */
import React, {Component} from 'react';

import {View} from 'react-native';

import PropTypes from 'prop-types';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// FontAwesome 5 比较特殊，请直接使用，不要使用EasyIcon
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

class EasyIcon extends Component {
  static displayName = 'EasyIcon';
  static description = 'EasyIcon Component';

  iconLib = {
    Entypo: Entypo,
    EvilIcons: EvilIcons,
    Feather: Feather,
    FontAwesome: FontAwesome,
    Foundation: Foundation,
    Ionicons: Ionicons,
    MaterialIcons: MaterialIcons,
    MaterialCommunityIcons: MaterialCommunityIcons,
    Octicons: Octicons,
    Zocial: Zocial,
    SimpleLineIcons: SimpleLineIcons,
    AntDesign: AntDesign,
    // FontAwesome5: FontAwesome5,
    Fontisto: Fontisto,
  };

  iconLibAlias = {
    et: Entypo,
    ei: EvilIcons,
    ft: Feather,
    fa: FontAwesome,
    fd: Foundation,
    ii: Ionicons,
    mi: MaterialIcons,
    mc: MaterialCommunityIcons,
    oi: Octicons,
    zi: Zocial,
    sl: SimpleLineIcons,
    ad: AntDesign,
    // fa5: FontAwesome5,
    fts: Fontisto,
  };

  constructor(props) {
    super(props);
  }

  render() {
    let width = this.props.width ? {width: this.props.width} : this.props.size;
    let height = this.props.height
      ? {height: this.props.height}
      : this.props.size;
    let bg = this.props.bgColor
      ? {backgroundColor: this.props.bgColor}
      : {backgroundColor: 'transparent'};
    let borderWidth = this.props.borderWidth
      ? {borderWidth: this.props.borderWidth}
      : null;
    let borderColor = this.props.borderColor
      ? {borderColor: this.props.borderColor}
      : null;
    let radius = this.props.radius ? {borderRadius: this.props.radius} : null;

    let {style, ...other} = this.props;
    style = Array.isArray(style) ? style : [style];

    let _styles = [width, height, bg, borderWidth, borderColor, radius]
      .concat([{alignItems: 'center', justifyContent: 'center'}])
      .concat(style);

    let Icon = this.iconLib[this.props.iconLib]
      ? this.iconLib[this.props.iconLib]
      : this.iconLibAlias[this.props.iconLib]
      ? this.iconLibAlias[this.props.iconLib]
      : null;

    if (Icon) {
      return (
        <View style={_styles} {...other}>
          <Icon
            name={this.props.name}
            color={this.props.color}
            size={this.props.size}
            style={{textAlign: 'center'}}
          />
        </View>
      );
    } else {
      return <View style={_styles} {...other} />;
    }
  }
}

EasyIcon.propTypes = {
  /**
   * 使用的Icon库名称
   * 可空，空时默认使用Ionicons
   */
  iconLib: PropTypes.string,

  /**
   * Icon名称
   */
  name: PropTypes.string.isRequired,

  /**
   * Icon颜色
   */
  color: PropTypes.string,

  /**
   * Icon大小
   */
  size: PropTypes.number,

  /**
   * Icon背景色
   * 如果背景需要透明效果，请使用rgba
   */
  bgColor: PropTypes.string,

  /**
   * 边框颜色
   */
  borderColor: PropTypes.string,

  /**
   * 边框大小
   */
  borderWidth: PropTypes.number,

  /**
   * 背景宽度
   */
  width: PropTypes.number,

  /**
   * 背景高度
   */
  height: PropTypes.number,

  /**
   * 圆角大小
   */
  radius: PropTypes.number,
};

EasyIcon.defaultProps = {
  iconLib: 'Ionicons',
  color: 'black',
  size: 18,
};

export default EasyIcon;
