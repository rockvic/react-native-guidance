import i18next from 'i18next';
import localize from 'react-native-localize';
import { initReactI18next } from 'react-i18next';
// import moment from 'moment';

import resources from './';

const initI18next = (language: string | null) => {
  // console.log('language:', language);
  let lang = '';
  // 如果指定传入使用的语言
  if (language) {
    lang = language;
  } else {
    // 获取系统区域设置
    const locales = localize.getLocales();
    // console.log('locales:', locales);
    if (Array.isArray(locales)) {
      // I18n.locale = locales[0].languageTag;
      // 将语言设置为当前区域对应的语言
      // 因为当前只提供中(languageCode: zh)/英(languageCode: en)两种语言
      // 如果当前区域设置对应的 languageCode 为 'zh'，则设置为中文'en', 除此之外都使用英文'en'
      lang = locales[0].languageCode === 'zh' ? 'cn' : 'en';
    } else {
      lang = 'en';
    }
  }
  // console.log('lang:', lang);
  i18next
  .use(initReactI18next)
    .init({
      resources,
      lng: lang,
      interpolation: {
        escapeValue: false,
      },
      // debug 模式，此处设置开发模式下打开 debug 模式
      debug: __DEV__,
    }, (err, t) => {
      // initialized and ready to go!
      i18next?.services?.formatter?.add('lowercase', (value, lng, options) => {
        return value.toLowerCase();
      });
      i18next?.services?.formatter?.add('uppercase', (value, lng, options) => {
        return value.toUpperCase();
      });
      i18next?.services?.formatter?.add('underscore', (value, lng, options) => {
        return value.replace(/\s+/g, '_');
      });
    });

  return lang;
};

export default initI18next;
