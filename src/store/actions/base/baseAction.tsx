import { BASE } from '../../types';
import { setLanguageLS } from '../../../utils/Storage';

export const setLanguage = (language: string) => {
  // 将当前所选语言持久化到本地存储
  setLanguageLS(language);
  return {
    type: BASE.SET_LANGUAGE,
    payload: language,
  };
};
