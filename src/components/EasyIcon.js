'use strict';
/**
 * 带背景的ICON
 */
import React, { Component } from 'react';

import { View } from 'react-native';

import PropTypes from 'prop-types';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome5Pro from "react-native-vector-icons/FontAwesome5Pro";
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
    FontAwesome5: FontAwesome5,
    FontAwesome5Pro: FontAwesome5Pro,
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
    fa5: FontAwesome5,
    fa5pro: FontAwesome5Pro,
    fts: Fontisto,
  };

  constructor(props) {
    super(props);
  }

  render() {
    let { iconLib, name, color, size, bgColor, borderColor, borderWidth, width, height, radius, style, ...other } = this.props;
    width = width || size;
    height = height || size;
    let bg = bgColor ? { backgroundColor: bgColor } : { backgroundColor: 'transparent' };
    borderWidth = borderWidth ? { borderWidth } : null;
    borderColor = borderColor ? { borderColor } : null;
    radius = radius ? { borderRadius: radius } : null;

    style = Array.isArray(style) ? style : [style];

    let _styles = [width, height, bg, borderWidth, borderColor, radius]
      .concat([{ alignItems: 'center', justifyContent: 'center' }])
      .concat(style);

    let Icon = this.iconLib[iconLib]
      ? this.iconLib[iconLib]
      : this.iconLibAlias[iconLib]
        ? this.iconLibAlias[iconLib]
        : null;

    if (Icon) {
      return (
        <View style={_styles}>
          <Icon
            name={this.props.name}
            color={this.props.color}
            size={this.props.size}
            style={{ textAlign: 'center' }}
            {...other}
          />
        </View>
      );
    } else {
      return <View style={_styles} />;
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
