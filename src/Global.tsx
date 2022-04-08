import { Platform, Dimensions, StyleSheet } from 'react-native';
import px from './utils/px';

const { height, width } = Dimensions.get('window');

class Global extends Object {
  // 导航栏高度
  static navBarHeight: number = Platform.OS === 'ios' ? 64 : 44;

  static token: string = '';

  // 常用颜色
  static colors = {
    /** 规范配色 */
    // 主色
    PRIMARY: '#409EFF',
    PRIMARY_GRADIENT: '#68AAFA',
    // 辅助色
    SUCCESS: '#67C23A',
    SUCCESS_GRADIENT: '#DAF2CF',
    WARNING: '#E6A23C',
    WARNING_GRADIENT: '#F9E7CF',
    DANGER: '#F56C6C',
    DANGER_GRADIENT: '#FCDBDB',
    INFO: '#909399',
    INFO_GRADIENT: '#E4E3E6',
    // 中性色
    // 文字
    PRIMARY_TEXT: '#303133',
    REGULAR_TEXT: '#606266',
    SECONDARY_TEXT: '#909399',
    PLACEHOLDER_TEXT: '#C0C4CC',
    // 边框
    BORDER_BASE: '#DCDFE6',
    BORDER_LIGHT: '#E4E7ED',
    BORDER_LIGHTER: '#EBEEF5',
    BORDER_EXTRALIGHT: '#F2F6FC',
    // 背景
    BACKGROUND: 'rgba(242, 242, 242, 1)', // 背景色

    DARK: '#1A1A1A',
    DARK_BG: '#262626',
    DARK_LIGHT: '#3B3B3B',

    /* FONT: 'rgba(0,0,0,1)', // '#000000', 工作区主字体颜色：（黑）
    FONT_GRAY: 'rgba(93,93,93,1)', // '#5D5D5D', 工作区主字体颜色：（深）
    FONT_LIGHT_GRAY: 'rgba(130,130,130,1)', // '#828282', 工作区主字体颜色：（浅）
    FONT_LIGHT_GRAY1: 'rgba(187,187,187,1)', // '#BBBBBB', 工作区主字体颜色：（更浅）
    VIEW_BG: '#f8f7fd', // 'rgba(227,227,230,1)', //'#E3E3E6', 工作区背景色 */

    /* IOS_BLUE: 'rgba(0,122,255,1)', // '#007AFF', 苹果蓝色
    IOS_RED: 'rgba(255,59,48,1)', // '#FF3B30', 苹果红色
    IOS_GREEN: 'rgba(76,217,100,1)', // '#4CD964', 苹果浅绿
    IOS_YELLOW: 'rgba(255,225,0,1)', // '#FFE100', 苹果黄色
    IOS_DARK_GRAY: 'rgba(146,146,146,1)', // '#929292', 苹果深灰
    IOS_LIGHT_GRAY: 'rgba(200,199,204,1)', // '#C8C7CC', 苹果浅灰
    IOS_GRAY_BG: 'rgba(248,248,248,1)', // '#F8F8F8', 苹果浅灰底色

    IOS_NAV_BG: 'rgba(245,245,247,1)', // #f5f5f7 苹果导航栏底色
    IOS_NAV_LINE: 'rgba(167,167,170,1)', // #a7a7aa 苹果导航栏线条
    IOS_BG: 'rgba(239,239,244,1)', // #efeff4 苹果经典背景色
    IOS_SEP_LINE: '#dcdce1', // 'rgba(200,199,204,1)',  //#c8c7cc 苹果工作区分割线颜色
    IOS_ARROW: 'rgba(199,199,204,1)', // #c7c7cc 苹果箭头颜色
    IOS_GRAY_FONT: 'rgba(142,142,147,1)', // #8e8e93 苹果灰色字体颜色
    IOS_SEARCH_BG: 'rgba(202,201,207,1)', // #cac9cf 搜索框背景颜色 */
  };

  static sizes = {
    FONT_SIZE_BUTTON: px(32),
    FONT_SIZE_LINK: px(28),
  };

  static styles = StyleSheet.create({
    H_LINE: {
      height: px(1),
      backgroundColor: Global.colors.BORDER_BASE,
    },
    V_LINE: {
      width: px(1),
      backgroundColor: Global.colors.BORDER_BASE,
    },
  });
}

export default Global;
