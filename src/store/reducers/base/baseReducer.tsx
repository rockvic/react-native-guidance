import {BASE} from '../../types';
import { setConfigLS } from '../../../utils/Storage';

export type BaseStateType = {
  config: {
    language?: string | undefined;
    // 1 - 内置背景图
    // 2 - 相册
    bgType: 1 | 2;
    bgIdx: number;
    // 从相册里选择背景图时，选中图片的 uri
    bgPhoto?: string | undefined;
    // 相册中最近使用过的 9 张背景图
    bgPhotos?: string[] | undefined;
  },
  barHeights: {
    statusBarHeight: number | undefined;
    headerBarHeight: number | undefined;
    tabBarHeight: number | undefined;
  },
};

export const initialState = {
  config: {
    language: undefined,
    bgType: 1 as (1 | 2),
    bgIdx: 0,
    bgPhoto: undefined,
    bgPhotos: [],
  },
  barHeights: {
    statusBarHeight: undefined,
    headerBarHeight: undefined,
    tabBarHeight: undefined,
  },
};

type Action = {
  type: string;
  payload?: any;
};

export default (state: BaseStateType = initialState, action: Action) => {
  switch (action.type) {
    case BASE.SET_CONFIG:
      setConfigLS(action.payload);
      return {
        ...state,
        config: action.payload,
      }
    case BASE.SET_LANGUAGE:
      const config4Lang = { ...state.config, language: action.payload };
      setConfigLS(config4Lang);
      return {
        ...state,
        config: config4Lang,
      };
    case BASE.SET_USER_BG:
      const config4Bg = { ...state.config, ...action.payload };
      setConfigLS(config4Bg);
      return {
        ...state,
        config: config4Bg,
      };
    case BASE.SET_BAR_HEIGHTS:
      return {
        ...state,
        barHeights: action.payload,
      };
    default:
      return state;
  }
};
