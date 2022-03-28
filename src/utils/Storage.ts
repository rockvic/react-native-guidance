import AsyncStorage from '@react-native-async-storage/async-storage';

import type { BaseStateType } from '../store/reducers/base/baseReducer';

const Storage = () => { };

Storage.KEY = {
  // APP配置项
  CONFIG: 'CONFIG',
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
 * 获取所有存储的 key
 * @returns keys
 */
 export async function getAllKeys() {
  let keys: string[] = [];
  try {
    keys = keys.concat(await AsyncStorage.getAllKeys());
  } catch (e) {
    console.log(`[Storage.getAllKeys()] 发生错误：`, e);
  }
  return keys;
}

/**
 * 获取多个存储对象的值
 * @param keys 多个存储对象的 key
 * @returns 对应对象的值
 */
export async function getMultiple(keys: string[]) {
  let values;
  try {
    values = await AsyncStorage.multiGet(keys);
  } catch(e) {
    console.log(`[Storage.getMultiple()] 发生错误：`, e);
  }
  return values;
}

/**
 * 向控制台打印所有存储的数据
 */
export async function logAllStorage() {
  const values = await getMultiple(await getAllKeys());
  console.log('All values in AsyncStorage:', values);
}

/**
 * 本地存取当前语言环境信息
 * @returns
 */
export async function getConfigLS() {
  return getJsonItem(Storage.KEY.CONFIG);
}
export async function setConfigLS(config: {}) {
  setItem(Storage.KEY.CONFIG, config);
}
export async function removeConfigLS() {
  removeItem(Storage.KEY.CONFIG);
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
