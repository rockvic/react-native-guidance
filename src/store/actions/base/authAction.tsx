import { AUTH } from '../../types';
import { UserType } from '../../reducers/base/authReducer';
// import type { Dispatch } from 'redux';
// import log from '../../../utils/Logger';

/**
 * 注册新用户
 * @param user 
 * @returns 
 */
export const signUp = (user: UserType) => {
  return {
    type: AUTH.SIGN_UP,
    payload: user,
  };
};

// 登录
// signIn
export const signIn = (token: string, currUser: UserType) => {
  // TODO: signIn logic
  return {
    type: AUTH.SIGN_IN,
    payload: { token, currUser },
  };
};

// 登出
// signOut
export const signOut = () => {
  // TODO: signOut logic
  return {
    type: AUTH.SIGN_OUT,
    payload: {},
  };
};

/**
 * 设置注册用户列表
 * @param users 
 * @returns 
 */
export const setUsers = (users: UserType[]) => {
  return {
    type: AUTH.SET_USERS,
    payload: users,
  };
};
