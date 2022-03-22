import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
// import moment from 'moment';

import resources from './';
console.log('resources:', resources);
i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false,
      /* format: function (value, format, lng) {
        if (format === 'uppercase') {
          return value.toUpperCase();
        }
        if (format === 'lowercase') {
          return value.toLowerCase();
        }
        console.log(value instanceof Date, format);
        if (value instanceof Date) {
          return moment(value).format(format || 'YYYY/MM/DD hh:mm:ss');
        }
        return value;
      }, */
    },
    // debug 模式，此处设置开发模式下打开 debug 模式
    debug: __DEV__,
  });

export default i18next;
