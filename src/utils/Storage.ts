import AsyncStorage from '@react-native-async-storage/async-storage';

const Storage = () => {};

Storage.KEY = {
  // 系统语言环境
  LOCALE: 'LOCALE',
  // 当前登录信息
  AUTH: 'AUTH',
};

/**
 * 从本地存储取数据
 */
export async function getItem(key: string) {
  return AsyncStorage.getItem(key);
}

/**
 * 从本地存储取数据并转换为Json
 * @param {*} key
 * @returns
 */
export async function getJsonItem(key: string) {
  const value = await AsyncStorage.getItem(key);
  if (!value) {
    return null;
  }
  try {
    return JSON.parse(value);
  } catch (e) {
    console.log('key & value in getJsonItem():', key, value);
    console.log(`[Storage.getJsonItem()] 不能将${value}转换为Json对象：`, e);
    return null;
  }
}

/**
 * 从本地存储取数据并转换为Int
 */
export async function getIntItem(key: string) {
  const value = await AsyncStorage.getItem(key);
  if (!value) {
    return null;
  }
  return isNaN(parseInt(value, 10)) ? null : value;
}

/**
 * 从本地存储取数据并转换为Float
 */
export async function getFloatItem(key: string) {
  const value = await AsyncStorage.getItem(key);
  if (!value) {
    return null;
  }
  try {
    return parseFloat(value);
  } catch (e) {
    console.log(`[Storage.getFloatItem()] 不能将${value}转换为Float对象：`, e);
    return null;
  }
}

/**
 * 从本地存储删除数据
 * @param {*} key
 */
export async function removeItem(key: string) {
  AsyncStorage.removeItem(key);
}

/**
 * 向本地存储存放数据
 * @param {*} key
 * @param {*} value
 * @returns
 */
export async function setItem(key: string, value: any) {
  return AsyncStorage.setItem(
    key,
    typeof value === 'object' ? JSON.stringify(value) : `${value}`,
  );
}

/**
 * 本地存取当前语言环境信息
 * @returns
 */
export async function getLocaleLS() {
  return getItem(Storage.KEY.LOCALE);
}
export async function setLocaleLS(locale: string) {
  setItem(Storage.KEY.LOCALE, locale);
}
export async function removeLocaleLS() {
  removeItem(Storage.KEY.LOCALE);
}

/**
 * 本地存取当前登录用户信息
 * @returns
 */
export async function getAuthLS() {
  return getJsonItem(Storage.KEY.AUTH);
}
export async function setAuthLS(user: object) {
  setItem(Storage.KEY.AUTH, user);
}
export async function removeAuthLS() {
  removeItem(Storage.KEY.AUTH);
}

export default Storage;
