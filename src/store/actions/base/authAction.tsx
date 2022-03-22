import {AUTH} from '../../types';

// 登录
// login
export const login = () => {
  // TODO: login logic
  return {
    type: AUTH.LOGIN,
    payload: {},
  };
};

// 登出
// logout
export const logout = () => {
  // TODO: logout logic
  return {
    type: AUTH.LOGOUT,
    payload: {},
  };
};
