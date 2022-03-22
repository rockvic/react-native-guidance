import { BASE } from '../../types';

export const setLocale = (locale: string) => {
  return {
    type: BASE.SET_LOCALE,
    payload: locale,
  };
};
