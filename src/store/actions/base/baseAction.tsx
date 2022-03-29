import { BASE } from '../../types';

export const setConfig = (config: {}) => {
  return {
    type: BASE.SET_CONFIG,
    payload: config,
  };
}

export const setLanguage = (language: string) => {
  return {
    type: BASE.SET_LANGUAGE,
    payload: language,
  };
};

export const setUserBg = (config: {}) => {
  return {
    type: BASE.SET_USER_BG,
    payload: config,
  };
}

export const setBarHeights = (config: {}) => {
  return {
    type: BASE.SET_BAR_HEIGHTS,
    payload: config,
  };
}
